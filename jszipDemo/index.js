var zip = new JSZip();
var file;

$("#file").on('change', function(){
	file = $(this)[0].files[0]
	zip.file(file.name, file);
});

//使用blob进行文件下载
// $("#blob").on("click", function () {
//           zip.generateAsync({ type: 'blob' })
//             .then(function (blob) {
//               var url = URL.createObjectURL(blob)
//               var a = document.createElement('a')
//               a.download = file.name+'.zip'
//               a.href = url
//               a.click()
//               setTimeout(function () {
//                 URL.revokeObjectURL(url)
//               }, 30 * 1000)
//             })

// });

      





// 下面是使用streamsaver的方法，但是这个方法似乎也不太好，需要service work https支持
$("#blob").on("click", function () {
	let fileStream = streamSaver.createWriteStream(file.name+'.zip', file.size)
	let writer = fileStream.getWriter()
    zip.generateInternalStream({type: 'uint8array', streamFiles: true})
		.on('data', function (data, metadata) {
			writer.write(data)
			console.log(data)
			console.log(metadata)
		}).on('end', function () {
			writer.close()
		}).resume();
});


//参考
//https://github.com/Stuk/jszip/issues/492
//https://github.com/jimmywarting/StreamSaver.js