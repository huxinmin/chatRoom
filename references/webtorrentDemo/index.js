$(document).ready(function() {
    //制作种子
    var client = new WebTorrent();
    var seeds = $("#seeds");
    var magnet = $("#magnet");
    var download = $("#download");
    var messageEl = $(".message");
    var speedEl = $(".speed");
    var DISALLOWED = ['6feb54706f41f459f819c0ae5b560a21ebfead8f']

    client.on('error', function(err) { logErr(err.message) });

    seeds.on('change', function(e) {
        var files = $(this)[0].files;
        client.seed(files, onTorrent)
    });

    function onTorrent(torrent) {
        torrent.on('error', function(err) { logErr(err.message) });

        torrent.files.forEach(function(file) {
            log('&nbsp;&nbsp;- ' + file.name + ' (' + prettierBytes(file.length) + ')')
            downloadZip(file);
        })

        log(
            'Torrent info hash: ' + torrent.infoHash + ' ' +
            '<a href="/#' + torrent.infoHash + '" onclick="prompt(\'分享链接:\', this.href);return false;">[Share link]</a> ' +
            '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> '
        )

        function updateSpeed() {
            var progress = (100 * torrent.progress).toFixed(1)
            speedEl.html(
                '<b>种子数:</b> ' + torrent.numPeers + ' ' +
                '<b>进度:</b> ' + progress + '% ' +
                '<b>下载速度:</b> ' + prettierBytes(client.downloadSpeed) + '/s ' +
                '<b>上传进度:</b> ' + prettierBytes(client.uploadSpeed) + '/s '
            )
        }

        torrent.on('download', updateSpeed)
        torrent.on('upload', updateSpeed)
        setInterval(updateSpeed, 1000)
    }
    //开始下载
    download.on('click', function(e) {
        e.preventDefault();
        var magnetURI = magnet.val();
        var disallowed = DISALLOWED.some(function(infoHash) {
            return magnetURI.indexOf(infoHash) >= 0
        })

        if (disallowed) {
            log('未找到文件：' + magnetURI)
        } else {
            log('正则从该地址下载： ' + magnetURI)
            client.add(magnetURI, onTorrent)
        }
    });

    //使用jszip和fileSaver进行下载文件
    function downloadZip(file){
        download.on('click', function(e) {
            file.getBlob(function (err, blob) {
                var zip = new JSZip()
                zip.file(file.path, blob)
                zip.generateAsync({ type: 'blob' })
                .then(function (blob) {
                    var url = URL.createObjectURL(blob)
                    var a = document.createElement('a')
                    a.download = file.name+'.zip'
                    a.href = url
                    a.click()
                    setTimeout(function () {
                      URL.revokeObjectURL(url)
                    }, 30 * 1000)
                })
            })
        });
    }
    // 打印信息
    function log(str) {
        messageEl.append(str);
    }

    function logErr(str){
    	messageEl.append("<p style='color:red;'>"+str+"</p>");
    }

    //比特转换
    function prettierBytes(num) {
        if (typeof num !== 'number' || isNaN(num)) {
            throw new TypeError('Expected a number, got ' + typeof num)
        }

        var neg = num < 0
        var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        if (neg) {
            num = -num
        }

        if (num < 1) {
            return (neg ? '-' : '') + num + ' B'
        }

        var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
        num = Number(num / Math.pow(1000, exponent))
        var unit = units[exponent]

        if (num >= 10 || num % 1 === 0) {
            // Do not show decimals when the number is two-digit, or if the number has no
            // decimal component.
            return (neg ? '-' : '') + num.toFixed(0) + ' ' + unit
        } else {
            return (neg ? '-' : '') + num.toFixed(1) + ' ' + unit
        }
    }
});
