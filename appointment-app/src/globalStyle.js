import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
font-family: Montserrat;

th{
    font-size:16px;
    font-weight:bold ;
}
.ant-table-title{
    border-radius:16px;
}
.ant-table-footer{
    border-radius:0 0 16px 16px;
}
.ant-table{
    border-radius:16px 16px 16px 16px;
}


`;
export default GlobalStyle;
