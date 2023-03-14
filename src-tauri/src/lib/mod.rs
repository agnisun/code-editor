use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Response {
    status: bool,
    data: String,
}

pub fn format_response(data: &str, status: bool) -> String {
    let response = Response {
        status,
        data: String::from(data),
    };

    serde_json::to_string(&response).unwrap()
}