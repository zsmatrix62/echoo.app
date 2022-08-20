pub(crate) mod dir;
pub(crate) mod pio;

use bytes::{
    BufMut,
    Bytes,
    BytesMut,
};

const GRPC_HEADER_SIZE: usize = 5;

#[cfg(debug_assertions)]
pub(crate) fn encode_body<T>(msg: T) -> Bytes
where
    T: prost::Message,
{
    let mut buf = BytesMut::with_capacity(1024);

    // first skip past the header
    // cannot write it yet since we don't know the size of the
    // encoded message
    buf.reserve(GRPC_HEADER_SIZE);
    unsafe {
        buf.advance_mut(GRPC_HEADER_SIZE);
    }

    // write the message
    msg.encode(&mut buf).unwrap();

    // now we know the size of encoded message and can write the
    // header
    let len = buf.len() - GRPC_HEADER_SIZE;
    {
        let mut buf = &mut buf[..GRPC_HEADER_SIZE];

        // compression flag, 0 means "no compression"
        buf.put_u8(0);

        buf.put_u32(len as u32);
    }

    buf.split_to(len + GRPC_HEADER_SIZE).freeze()
}

#[cfg(test)]
pub(crate) async fn decode_body<T>(body: hyper::Body) -> T
where
    T: Default + prost::Message,
{
    use bytes::Buf;

    let mut body = hyper::body::to_bytes(body).await.unwrap();

    // ignore the compression flag
    body.advance(1);

    let len = body.get_u32();
    #[allow(clippy::let_and_return)]
    let msg = T::decode(&mut body.split_to(len as usize)).unwrap();

    msg
}

#[cfg(test)]
pub(crate) async fn call_service<T: prost::Message, R: Default + prost::Message>(
    service: &str,
    method: &str,
    port: u16,
    in_msg: T,
) -> R {
    use http::header::{
        ACCEPT,
        CONTENT_TYPE,
    };

    let addr = format!("http://localhost:{}/{}/{}", port, service, method);

    // a good old http/1.1 request
    let request = http::Request::builder()
        .version(http::Version::HTTP_11)
        .method(http::Method::POST)
        .uri(addr)
        .header(CONTENT_TYPE, "application/grpc-web")
        .header(ACCEPT, "application/grpc-web")
        .body(hyper::Body::from(encode_body(in_msg)))
        .unwrap();

    let client = hyper::Client::new();

    let response = client.request(request).await.unwrap();

    let body = response.into_body();
    decode_body::<R>(body).await
}
