const pagination = document.querySelector(".pagination");
// const bntPrevious = document.querySelector("#btn-prev");
// const btnNext = document.querySelector("#btn-next");
// const pageList = document.querySelector(".pagination-list");
// const pageLink = document.querySelector(".pagination-link");

function generatePagList(array, currentPage) {
    const prevLink = document.createElement("a");
    prevLink.classList.add("pagination-button");
    prevLink.id = "btn-prev";
    prevLink.href = "#";
    prevLink.title = "Previous page";
    const svgPrev = document.createElement("svg");
    svgPrev.classList.add("pag-icon");
    svgPrev.classList.add("arrow-left");
    svgPrev.height = "16";
    const usePrev = document.createElement("use");
    usePrev.href = "./images/icons/arrows.svg#icon-arrow-left";

    const nextLink = document.createElement("a");
    nextLink.classList.add("pagination-button");
    nextLink.id = "btn-next";
    nextLink.href = "#";
    nextLink.title = "Next page";
    const svgNext = document.createElement("svg");
    svgNext.classList.add("pag-icon");
    svgNext.classList.add("arrow-right");
    svgNext.height = "16";
    const useNext = document.createElement("use");
    useNext.href = "./images/icons/arrows.svg#icon-arrow-right";

    svgPrev.append(usePrev);
    prevLink.append(svgPrev);

    svgNext.append(useNext);
    nextLink.append(svgNext);

    const list = document.createElement("ul");
    list.classList.add("pagination-list");

    for (let i = 0; i < array.length; i += 1) {
        const item = document.createElement("li");
        item.classList.add("pagination-item");
        const link = document.createElement("a");
        link.classList.add("pagination-link");
        link.innerText = array[i];

        // link.innerText.array[i] = currentPage;
        if (array[i] === currentPage) {
            item.classList.add("current");
        }

        item.append(link);
        list.append(item);
        pagination.append(prevLink, list, nextLink);
    }

    return pagination;

    // const mark = array.map(i => {
    //     const item = document.createElement("li");
    //     item.classList.add("pagination-item");
    //     const link = document.createElement("a");
    //     link.classList.add("pagination-link");

    //     link.innerText.i = currentPage.innerText;

    //     item.append(link);
    //     list.append(item);
    //     return list;
    // });

    // // pagination.append(list);
    // pagination.append(prevLink, ...mark, nextLink);
    // // return pagination;
    // // pagination.append(...mark)
}

export function showPagination(totalPages, currentPage) {
    const lastPages = totalPages - 5;
    let markup;
    if (totalPages === 1) {
        // make buttons invisible or make the class = "invisible" for 
        // div.pagination
    } else if (totalPages <= 9) { 
        const curArray = [];
        for (let i = 1; i <= totalPages; i += 1) {
            curArray.push(i);
        
            // markup = generatePagList([1, 2, 3, 4, 5, 6, 7, 8, 9], currentPage);
            // markup = `<li class="pagination-item">
            //     <a class="pagination-link" href="">${i}</a>
            //     </li>`;
            // markup = pages.map(({ currentPage }) => {
            //     return `<li class="pagination-item">
            //     <a class="pagination-link" href="">${i}</a>
            //     </li>`;
            // });
        }
        markup = generatePagList(curArray, currentPage);
        
    } else if (totalPages > 9) {
        if (currentPage <= 5) {
            markup = generatePagList([1, 2, 3, 4, 5, 6, 7, '...', `${totalPages}`], currentPage);
            
            // return;
        } else if (currentPage >= lastPages) {
            markup = generatePagList([1, '...', totalPages - 6,
                totalPages - 5, totalPages - 4, totalPages - 3,
                totalPages - 2, totalPages - 1, totalPages]);
            // return;
        }

        // console.log(typeof markup)
        // pagination.appendChild(markup);
        // pagination.insertAdjacentElement("beforeend", markup);

    } else {
        markup = generatePagList([1, '...', currentPage - 2, currentPage - 1,
            currentPage, currentPage + 1, currentPage + 2,
            '...', totalPages], currentPage);
        

    }
    pagination.append(markup);
    // return;
}
showPagination(5, 1);
console.log(typeof currentPage)
// generatePagList([1, '...', 12, 13, 14, 15, 16, '...', 20], 14);