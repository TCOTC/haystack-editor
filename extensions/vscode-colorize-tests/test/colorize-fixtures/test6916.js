for (var i = 0; i < 9; i++) {
  for (var j; j < i; j++) {
    if (j + i < 3) return i < j
  }
}
