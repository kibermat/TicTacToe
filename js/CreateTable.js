define('CreateTable', [], function(){
    return {
        renderTable: renderTable
    };
    function renderTable(row) {

        var css_class_table = 'tictactoe-table',
            css_class_td = 'tictactoe-table-td',
            css_class_tr = 'tictactoe-table-tr',
            table = '<table class="%css-class">%columns</table>',
            columns = [],
            rows = [],
            i, j;

        if (typeof row === 'number' && row >= 3) {

            for (i = 1; i <= row; i++) {
                for (j = 1; j <= row; j++) {
//                    rows[j] = $('<td></td>')
//                        .addClass('tictactoe-table-td')
//                        .attr({'row': i, 'col': j});
                    rows[j] = '<td class="%css-class" row="%row" col="%col"></td>'
                        .replace('%css-class', css_class_td)
                        .replace('%row', i)
                        .replace('%col', j);
                }
//                  columns[i] = $('<tr></tr>')
//                      .addClass('tictactoe-table-tr')
//                      .attr({'row': i})
//                      .append(rows);

                columns[i] = '<tr class="%css-class" row="%row">%rows</tr>'
                    .replace('%css-class', css_class_tr)
                    .replace('%row', i)
                    .replace('%rows', rows.join(''));

                rows.length = 0;
            }

            return table.replace('%css-class', css_class_table)
                        .replace('%columns', columns.join(''));
        }
    }
});