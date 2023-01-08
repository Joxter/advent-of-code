(ns advent-of-code.year2022.day01
  (:require
    [clojure.java.io :as io]
    [clojure.math :as math]
    [clojure.string :as str]
    [clojure.set :as set]
    ))

;; clj -M ./day-01/day01.clj

(def testInp
  (slurp (io/file "day-01/test.txt")))

(def input
  (slurp (io/file "day-01/input.txt")))

(defn part1 [inp]
  (def nums (->> (str/split inp #"\n") 
              (map parse-long)
              ))

  (->> (map < (drop-last 1 nums) (drop 1 nums))
    (filter true?)
    (count)
    )
  )

(println (part1 testInp))
(println (part1 input))
