(ns advent-of-code.year2022.day01
  (:require
    [clojure.java.io :as io]
    [clojure.math :as math]
    [clojure.string :as str]
    [clojure.set :as set]
    ))

;; clj -M ./day-01/day01.clj

(def input
  (slurp (io/file "../../inputs/2020/day01.txt")))

(defn part1 [inp]
  (def nums (->> (str/split inp #"\n")
              (map parse-long)
              ))

;;   (def m (vec (repeat 2020 false)))
;;   (println m)

  (->> (map < (drop-last 1 nums) (drop 1 nums))
    (filter true?)
    (count)
    )
  )

(println "part1" (part1 input) [1020036])

;; (defn part1 [inp]
;;   (let [m (vec (repeat 2020 false))]
;;     (loop [lines (-> input (clojure.string/split-lines))
;;            m m]
;;       (if (empty? lines)
;;         (throw (Exception. "No solution found"))
;;         (let [num (-> (first lines) (Integer/parseInt) int)]
;;           (if (m (- 2020 num))
;;             (* num (- 2020 num))
;;             (recur (rest lines) (assoc m num true))))))))
