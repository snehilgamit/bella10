const newRef = () => {
    const str = "1234567890abcdefghijklmnopqrstuvwxyz"
    let i = 0;
    let referralCode = "";
    while(i<8){
        referralCode+=str[Math.floor(Math.random()*(str.length-1))];
        i++;
    }
    return referralCode;
};
export default newRef