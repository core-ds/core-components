import { EOL } from 'node:os';
import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

async function main() {
    const transform = new Transform({
        decodeStrings: false,
        construct(callback) {
            this.store = new Map();
            callback();
        },
        transform(chunk, _, callback) {
            chunk
                .split(EOL)
                .filter((line) => line.length > 0)
                .forEach((line) => {
                    const [, name, dataChunk] = line.match(/(@[^/\s]+\/[^:]+|[^/\s]+):\s(.*)/);
                    const data = this.store.get(name)?.concat(dataChunk) ?? dataChunk;

                    this.store.set(name, data);
                });

            callback();
        },
        flush(callback) {
            try {
                const report = Object.fromEntries(
                    Array.from(this.store)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([name, data]) => [name, JSON.parse(data)]),
                );

                this.push(`${JSON.stringify(report, null, 4)}${EOL}`);
                callback();
            } catch (err) {
                callback(err);
            }
        },
    });

    await pipeline(stdin.setEncoding('utf8'), transform, stdout);
}

await main();
