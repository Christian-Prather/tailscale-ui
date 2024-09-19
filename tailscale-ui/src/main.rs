slint::include_modules!();

use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let ui = AppWindow::new()?;

    println!("Initializing");

    {
        let ui_handle = ui.as_weak();
        move || {
            let ui = ui_handle.unwrap();
            ui.set_connection_status(true);
        }
    }

    ui.on_request_increase_value({
        let ui_handle = ui.as_weak();
        move || {
            let ui = ui_handle.unwrap();
            ui.set_counter(ui.get_counter() + 1);
        }
    });

    ui.run()?;

    Ok(())
}
