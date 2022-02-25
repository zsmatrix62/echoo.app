use echoo_app_api::start_services;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    start_services().await?;
    Ok(())
}
