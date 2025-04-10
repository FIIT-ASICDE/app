`timescale 1ns/1ps

module transpilation_tb;
    logic clk;
    logic rst;
    logic [3:0] count;

    counter uut (
        .clk(clk),
        .rst(rst),
        .count(count)
    );

    always begin
        clk = 0;
        #1;
        clk = 1;
        #1;
    end

    initial begin
        $dumpfile("waveform.vcd");
        $dumpvars(0, transpilation_tb);

        rst = 1;
        repeat(2) @(posedge clk);

        rst = 0;
        repeat(50) @(posedge clk);

        $finish;
    end

    always @(posedge clk) begin
        $display("Time: %0t | count = %d", $time, count);
    end
endmodule
