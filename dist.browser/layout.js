import * as BufferLayout from '@solana/buffer-layout';
/**
 * Layout for a public key
 */
export var publicKey = function (property) {
    if (property === void 0) { property = 'publicKey'; }
    return BufferLayout.blob(32, property);
};
/**
 * Layout for a 64bit unsigned value
 */
export var uint64 = function (property) {
    if (property === void 0) { property = 'uint64'; }
    return BufferLayout.blob(8, property);
};
/**
 * Layout for a Rust String type
 */
export var rustString = function (property) {
    if (property === void 0) { property = 'string'; }
    var rsl = BufferLayout.struct([
        BufferLayout.u32('length'),
        BufferLayout.u32('lengthPadding'),
        BufferLayout.blob(BufferLayout.offset(BufferLayout.u32(), -8), 'chars'),
    ], property);
    var _decode = rsl.decode.bind(rsl);
    var _encode = rsl.encode.bind(rsl);
    rsl.decode = function (buffer, offset) {
        var data = _decode(buffer, offset);
        return data.chars.toString('utf8');
    };
    rsl.encode = function (str, buffer, offset) {
        var data = {
            chars: Buffer.from(str, 'utf8'),
        };
        return _encode(data, buffer, offset);
    };
    return rsl;
};
