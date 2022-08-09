use crontab::Crontab;
use crontab::ScheduleComponents;

use wasm_bindgen::prelude::*;

#[wasm_bindgen(getter_with_clone)]
#[derive(Default)]
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
}

impl From<Crontab> for CrontabRes {
    fn from(f: Crontab) -> Self {
        CrontabRes {
            minutes: f.schedule.minutes,
            hours: f.schedule.hours,
            days: f.schedule.days,
            months: f.schedule.months,
            weekdays: f.schedule.weekdays,
        }
    }
}

#[wasm_bindgen]
pub fn parse_crontab_string(input: String) -> Result<CrontabRes, String> {
    let mut input = input;
    input = input.to_uppercase();
    input = input.replace("SUN", "0");
    input = input.replace("MON", "1");
    input = input.replace("TUE", "2");
    input = input.replace("WED", "3");
    input = input.replace("THU", "4");
    input = input.replace("FRI", "5");
    input = input.replace("SAT", "6");
    let res = Crontab::parse(input.as_str());
    match res {
        Ok(sche) => {
            let mut res = sche.into();
            Ok(res)
        }
        Err(e) => Err(|| -> String {
            let re = regex::Regex::new(r#".+"(.+)""#).unwrap();
            let er_str = e.to_string();
            let caps = re.captures(er_str.as_str()).unwrap();
            caps.get(1).unwrap().as_str().to_string()
        }()),
    }
}
