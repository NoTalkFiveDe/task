import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class FileIo extends Thread {
    private static PrintWriter output;
    private String msg;

    public static void main(String[] args) throws IOException {
        File file = new File("test.txt");
        output = new PrintWriter(file);
        FileIo fileIo1 = new FileIo("thread 1"), fileIo2 = new FileIo("thread 2");
        fileIo1.start();
        fileIo2.start();
        // output.close();
        output.println("Hello");
        output.close();
    }

    public FileIo(String msg) {
        this.msg = msg;
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; ++i) {
            System.out.println("no." + i + ": " + msg);
            output.println("no." + i + ": " + msg);
        }
    }
}