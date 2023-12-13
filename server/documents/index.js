// import Quiz from '../config/quizClass';

export default function (
    {
        date,
        id,
        notes,
        company,
        result,
    }) {
    const Quiz =[
        [1, 4, 10, 11],
        [6, 9, 10, 11],
        [1, 4, 10, 11],
        [2, 3, 10, 11],
        [9, 8, 10, 11],
        [1, 7, 10, 11],
        [6, 1, 10, 11],
        [1, 2, 10, 11],
        [5, 1, 10, 11],
        [1, 8, 10, 11],
        [6, 9, 10, 11],
        [1, 8, 10, 11],
        [6, 3, 10, 11],
        [1, 5, 10, 11],
        [6, 4, 10, 11],
        [4, 6, 10, 11],
        [9, 4, 10, 11],
        [4, 9, 10, 11],
        [9, 1, 10, 11],
        [4, 2, 10, 11],
        [4, 7, 10, 11],
        [3, 1, 10, 11],
        [2, 5, 10, 11],
        [4, 5, 10, 11],
        [5, 4, 10, 11],
        [3, 1, 10, 11],
        [4, 2, 10, 11],
        [3, 4, 10, 11],
        [5, 8, 10, 11],
        [1, 6, 10, 11],
        [8, 4, 10, 11],
        [4, 8, 10, 11],
        [7, 2, 10, 11],
        [3, 4, 10, 11],
        [9, 1, 10, 11],
        [7, 2, 10, 11],
        [7, 5, 10, 11],
        [3, 5, 10, 11],
        [4, 7, 10, 11],
        [5, 7, 10, 11],
        [5, 9, 10, 11],
        [7, 8, 10, 11],
        [2, 8, 10, 11],
        [9, 3, 10, 11],
        [2, 8, 10, 11],
        [8, 5, 10, 11],
        [2, 6, 10, 11],
        [1, 7, 10, 11],
        [2, 6, 10, 11],
        [2, 9, 10, 11],
        [7, 8, 10, 11],
        [2, 9, 10, 11],
        [2, 3, 10, 11],
        [3, 6, 10, 11],
        [3, 5, 10, 11],
        [5, 7, 10, 11],
        [1, 2, 10, 11],
        [5, 6, 10, 11],
        [9, 5, 10, 11],
        [3, 8, 10, 11],
        [8, 6, 10, 11],
        [9, 7, 10, 11],
        [7, 9, 10, 11],
        [5, 2, 10, 11],
        [8, 3, 10, 11],
        [8, 9, 10, 11],
        [6, 8, 10, 11],
        [7, 6, 10, 11],
        [3, 9, 10, 11],
        [7, 3, 10, 11],
        [3, 7, 10, 11],
        [6, 7, 10, 11]   
    ];
    //console.log('>>>>>>> result >>>>>>>', result);
    const today = new Date();
    const MAX_LEN = 9;
    let hi_count = 0;
    let lo_count = 0;
    let initArray = Array.from({ length: MAX_LEN }, () => 0);
    //console.log('>>>>>> init array >>>>>>>>>>>>>>', initArray);
    for (let i = 0; i < result.length; i++) {
        if(result[i] === 3){
            initArray[Quiz[i][0] - 1] += 1;
            initArray[Quiz[i][1] - 1] += 1;
            hi_count += 1;   
        }else if(result[i] === 4){
            lo_count += 1;
        }else{
            initArray[Quiz[i][result[i]-1] - 1] += 1;    
        }
        //initArray[Quiz[i][result[i]-1] - 1] += 1;
    }
    //console.log('>>>>>> new init array   >>>>', initArray);
    const my_styles = `<style>
    .body {
        margin: 20px;
        padding-top: 5px;
        font-family: 'Times New Roman', sans-serif;
    }
    
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 5px;
    }

    
    img {
        width: 100px;
    }
    
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        text-align: center;
    }
      
    .h-0 {
        width: 240px;
        height: 20px;
        font-size: 10px;
    }
      
    .h-1 {
        background: #FF2222;
        width: 240px; 
        height: 20px;
        font-size: 10px;

    }
    
    .h-2 {
        background: #FFFFFF;
        width: 240px;
        height: 20px;
        font-size: 10px;

    }
    
    .h-3 {
        background: #00CC00;
        width: 240px;
        height: 20px;
        font-size: 10px;

    }
      
    .c-0 {
        background: #FFFFFF;
        width: 80px;
        height: 20px;
        font-size: 10px;

    }
      
    .c-1 {
        background: #CCCCEE;
        width: 80px;
        height: 20px;
        font-size: 10px;

    }
    
    .c-2 {
        background: #FFCC00;
        width: 8px;
        height: 20px;
        font-size: 10px;

    }
      
    .c-3 {
        background: #33FF33;
        width: 80px;
        height: 20px;
        font-size: 10px;

    }
    
    .c-max{
        background: #00CC00;
        width: 80px;
        height: 20px;
        font-size: 10px;

    }
    
    .c-min{
        background: #FF2222;
        width: 80px;
        height: 20px;
        font-size: 10px;

    }
    
    .c-normal{
        background: #FFFFFF;
        width: 80px;
        height: 20px;
        font-size: 10px;

    }

    </style>`;

    let htmlHeader = `<!DOCTYPE html> <html><head></head><body><div class="invoice-container"><br><br><hr><h5><center> TEST RESULT | VISUAL </center></h5><hr><br>`;
    let htmlFooter = `<br><hr><center><h6>${date} | ${company.email}  |Hi:${hi_count} | Lo:${lo_count}</h6></center><hr><div>${notes}</div></div></body></html>`
    let colorArray = initArray;
    let indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const Max_length = 16;

    let caption = [
        `SP health`,
        `SP res`,
        `SP home`,
        `SX magn`,
        `SX exp`,
        `SX merg`,
        `SO read`,
        `SO bond`,
        `SO part`
    ];

    let MAX = 0;
    let MIN = 100;

    let cellmax_start = `<td class = "c-max">`
    let cellmax_end = `</td>`;
    let cellmin_start = `<td class = "c-min">`
    let cellmin_end = `</td>`;
    let cellnormal_start = `<td class="c-normal">`;
    let cellnormal_end = `</td>`;

    let cell1 = `<td class = "c-1"></td>`;
    let cell2 = `<td class = "c-2"></td>`;
    let cell3 = `<td class = "c-3"></td>`;
    let cell0 = `<td class = "c-0"></td>`;

    let table1_header = `<center><table><tr>
    	<th colspan="3" class="h-1">SELF-PRESERVATION</th>
    	<th colspan="3" class="h-2">SEXUAL</th>
    	<th colspan="3" class="h-3">ADAPTATION/SOCIAL</th>
 		</tr>`;

    let table1_footer = `</table></center>`;

    let firstRow1 = `<tr>`;


    for (let i = 0; i < colorArray.length; i++) {
        if (MAX < colorArray[i]) {
            MAX = colorArray[i];
        }
        if (MIN > colorArray[i]) {
            MIN = colorArray[i];
        }
    }

    console.log('>>> MAX: ', MAX, '>>> MIN: ', MIN);

    for (let i = 0; i < 9; i++) {
        let cell = ``;
        if (colorArray[i] === MAX) {
            cell = cellmax_start + caption[i] + cellmax_end;
        } else if (colorArray[i] === MIN) {
            cell = cellmin_start + caption[i] + cellmin_end;
        } else {
            cell = cellnormal_start + caption[i] + cellnormal_end;
        }
        firstRow1 += cell;
    }
    firstRow1 += `</tr>`;

    let table1_body = ``;
    for (let i = 0; i < Max_length; i++) {
        let row = `<tr>`;
        for (let j = 0; j < 9; j++) {
            let t = Math.floor(j / 3) + 1;
            if (i > Max_length - colorArray[j] - 1) {
                if (t === 1) {
                    row += cell1;
                } else if (t === 2) {
                    row += cell2;
                } else {
                    row += cell3
                }
            } else {
                row += cell0;
            }

        }
        row += `</tr>`;
        table1_body += row;
    }

    let divider = `<div><br><br><br></div>`;

    let table2_header = `<center><table><tr>
    	<th colspan="9" class="h-0">The zones in order of preference</th>
    	</tr>`;
    let table2_footer = `</table></center>`;

    for (let i = 0; i < colorArray.length - 1; i++) {
        for (let j = i + 1; j < colorArray.length; j++) {
            if (colorArray[i] < colorArray[j]) {
                let tempVal = colorArray[i];
                colorArray[i] = colorArray[j];
                colorArray[j] = tempVal;

                let tempCaption = caption[i];
                caption[i] = caption[j];
                caption[j] = tempCaption;

                let tempIdx = indexArray[i];
                indexArray[i] = indexArray[j];
                indexArray[j] = tempIdx;
            }
        }
    }
    let firstRow2 = `<tr>`;
    for (let i = 0; i < 9; i++) {
        let cell = ``;
        if (colorArray[i] === MAX) {
            cell = cellmax_start + caption[i] + cellmax_end;
        } else if (colorArray[i] === MIN) {
            cell = cellmin_start + caption[i] + cellmin_end;
        } else {
            cell = cellnormal_start + caption[i] + cellnormal_end;
        }
        firstRow2 += cell;
    }
    firstRow2 += `</tr>`;

    // 
    // let firstRow2 = `<tr>` + cellmax_start + caption[0] + cellmax_end;
    // for (let i = 1; i < 8; i++) {
    //     let cell = ``;
    //     cell = cellnormal_start + caption[i] + cellnormal_end;
    //     firstRow2 += cell;
    // }
    // firstRow2 = firstRow2 + cellmin_start + caption[8] + cellmin_end + `</tr>`;

    let table2_body = ``;
    for (let i = 0; i < Max_length; i++) {
        let row = `<tr>`;
        for (let j = 0; j < 9; j++) {
            let t = Math.floor(indexArray[j] / 3) + 1;
            if (i > Max_length - colorArray[j] - 1) {
                if (t === 1) {
                    row += cell1;
                } else if (t === 2) {
                    row += cell2;
                } else {
                    row += cell3
                }
            } else {
                row += cell0;
            }

        }
        row += `</tr>`;
        table2_body += row;
    }



    let table1_Text = table1_header + firstRow1 + table1_body + table1_footer;
    let table2_Text = table2_header + firstRow2 + table2_body + table2_footer;
    let htmlText = table1_Text + divider + table2_Text;
    let html_total = htmlHeader + my_styles  + htmlText + htmlFooter;
    //console.log(html_total);
    return html_total;
};