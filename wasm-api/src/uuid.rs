#[wasm_bindgen]
pub fn parse_crontab_string(input: String) -> Result<CrontabRes, String> {
    let mut input = input;
    if !input.starts_with('@') {
        input.push_str(" *");
        input.insert_str(0, "0 ");
    }
    let res = Schedule::from_str(&input);
    match res {
        Ok(sche) => Ok(sche.into()),
        Err(e) => Err(|| -> String { e.to_string() }()),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

}
