#![allow(clippy::unused_unit)]
#![allow(dead_code)]

mod crontab_parser;
mod json_formatter;
mod utils;
pub mod uuid;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
