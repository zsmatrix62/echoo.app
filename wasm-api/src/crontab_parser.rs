use chrono::Local;
use chrono::Utc;
use cron_clock::Schedule;
use cron_clock::TimeUnitSpec;
use std::str::FromStr;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(getter_with_clone)]
#[derive(Default, Debug)]
pub struct CrontabRes {
    /// Minutes in the schedule.
    /// Range [0,59] inclusive.
    pub minutes: Vec<u32>,

    /// Hours in the schedule.
    /// Range [0,23] inclusive.
    pub hours: Vec<u32>,

    /// Days of the month in the schedule.
    /// Range [1,31] inclusive.
    pub days: Vec<u32>,

    /// Months in the schedule.
    /// Range [1,12] inclusive.
    pub months: Vec<u32>,

    /// Days of the week in the schedule.
    /// Range [0,6] inclusive.
    pub weekdays: Vec<u32>,
    pub next_executions: String,
}

impl From<Schedule> for CrontabRes {
    fn from(f: Schedule) -> Self {
        let mut next_executions: Vec<String> = vec![];
        let mut next_executions_local: Vec<String> = vec![];
        for dt in f.upcoming(Utc).take(10) {
            next_executions.push(dt.to_string());
        }
        for dt in f.upcoming(Local).take(10) {
            next_executions_local.push(dt.to_string());
        }

        let next_executions_all: Vec<String> = next_executions_local
            .iter()
            .zip(next_executions)
            .map(|(l, u)| -> String { format!("{}, {}", l, u) })
            .collect();
        let next_executions = next_executions_all.join("#");

        CrontabRes {
            minutes: f.minutes().iter().collect(),
            hours: f.hours().iter().collect(),
            days: f.days_of_month().iter().collect(),
            months: f.months().iter().collect(),
            weekdays: f.days_of_week().iter().collect(),
            next_executions,
        }
    }
}

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
    #[test]
    fn exploration() {
        let a = parse_crontab_string("0 */21 * * WED-THU".to_string());
        println!(">>>> next_executions:{:?}", a)
    }
}
