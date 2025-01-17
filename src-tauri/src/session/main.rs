use portable_pty::{native_pty_system, CommandBuilder, PtyPair, PtySize};
use std::io::{BufReader, Read, Write};

struct Terminal {
    pid: i32,
    pty_pair: PtyPair,
    writer: Box<dyn Write + Send>,
    reader: BufReader<Box<dyn Read + Send>>,
}

impl Default for Terminal {
    fn default() -> Self {
        let pty_system = native_pty_system();

        let pty_pair = pty_system
            .openpty(PtySize {
                rows: 30,
                cols: 200,
                pixel_width: 0,
                pixel_height: 0,
            })
            .unwrap();

        let reader = pty_pair.master.try_clone_reader().unwrap();
        let writer = pty_pair.master.take_writer().unwrap();

        let reader = BufReader::new(reader);

        let pid = pty_pair
            .master
            .process_group_leader()
            .expect("Fail to get pid.");

        Self {
            pid,
            pty_pair,
            writer,
            reader,
        }
    }
}

pub fn construct_cmd() -> CommandBuilder {
    #[cfg(target_os = "macos")]
    let mut cmd = CommandBuilder::new("zsh");
    #[cfg(target_os = "linux")]
    let mut cmd = CommandBuilder::new("/usr/bin/zsh");

    cmd.env("TERM", "kitty-256color");
    cmd.env("COLORTERM", "truecolor");
    cmd.env("TERM_PROGRAM", "eDEX-UI");
    cmd.env("TERM_PROGRAM_VERSION", "1.0.0");

    return cmd;
}
