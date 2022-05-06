package main

import "fmt"

func main() {
  a := Make2D[uint8](100000, 100000)
  fmt.Println(len(a) * len(a) )
}

func Make2D[T any](n, m int) [][]T {
  matrix := make([][]T, n)
  rows := make([]T, n*m)
  for i, startRow := 0, 0; i < n; i, startRow = i+1, startRow+m {
      endRow := startRow + m
      matrix[i] = rows[startRow:endRow:endRow]
  }
  return matrix
}
