#![allow(clippy::unused_unit)]
#![allow(dead_code)]
#![allow(non_upper_case_globals)]

mod crontab_parser;
pub mod hash;
mod json_formatter;
mod utils;
pub mod uuid;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
