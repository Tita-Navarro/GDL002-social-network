const templateEngine = function(html, options) {
    const re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    let code = 'var r=[];\n', cursor = 0, match;
<<<<<<< HEAD

=======
    
>>>>>>> c41ad8d97884723a112d6182bb964035d7908336
    const add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function('with (this) {' + code.replace(/[\r\t\n]/g, '') + '}').apply(options);
}