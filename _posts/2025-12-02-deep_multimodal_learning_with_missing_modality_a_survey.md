---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAAW2WOQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T160108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCICP4HOdjOZBQ%2B4FWK7rEEkND30zr8YsP3602FHO4eYusAiEAsPTTh1Xsrta5GTLGVN%2BADD2rQxbNZcBAPuB0KmAwUfQq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDJsr2gK1k139wUXjnircA6mS2%2B4quvUflPPqkcxWYgbSpCN%2FIL0CGprOpKq%2F%2FhYDtob%2B3RRqsS702b0E3HcOsCFkk%2FPfDLkO4sM9iZ2mbeHAfa340upZ1ZFLzBlAqoHIjMhRv314%2BSDYoP40NxxqWgkZHAZS7Q9MfhCh%2BoEWTDcxBF1L9offp1xmva1GBWmyWxzFaBJR2aHrFyEUNsNYSahKq5jlYJ3iICjgOzTO2aOIrNqx%2B7x8fOyhslBe6bKJul9pRbBmXo8L%2Bmpu4XL%2BX0DoTu1Z1kLIfW8UoxxJDbOnZQyLTbbIL1bHWah8UwxVyKl3Kimi8ayuMSZa%2F1cFQwaYu8CVp%2BpShhRpIfE%2BIDkNXqr0optHT3Ac8FUMmcvxgURGsU%2F%2FwEVUo3NffkTq0%2Fu0X59wQD20LwfFzgzDum8%2FT0moNOvvdTAFOR4ZgwoRXnbRpnALOAf052DBwX%2B0%2Fhod%2B1HceL9xnWfX6boNGNxMjJSKcc364AY2J04W7QuF%2BXu6w172PgqMHxosItQ0mWzy7xFo11JU7V6Y4TjzL1gfUwT%2FmwDaTfcbEVZEyR7y4t%2BGPjNbgXviLa%2F6WvV6nL7wUqJ%2FJohWat5d4CUfI02UZY6QfSq6jc4K4kwtKwfkGvFZlc8z4c%2BZvPRIMOWBvMkGOqUBIVJyuGz7eMA4bQRmbYnCFic3GoG5xPJ8DGLJWhhRXI2LQ6hCKo0t2LWCTI%2Bi2x7PfyziXYNbB%2FDJQZe4wbnz249xrgrg%2FDDUsSapzWtA%2BQpp1rehW0kNjDFnaYWhvJ5bybDYD%2FxetHSe2S%2F0fG6GjrfV%2B%2Bf5TtKvF%2FCayOLcNmVjilXwJyRPkTlIGa3knnvKgJ1vsXsFWjWy4HnUb7Ed0bOICEAO&X-Amz-Signature=8b77ab5545f8a6840352cac1ce68ebc43cbb6f6311f1404a0f48b0641175c542&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAAW2WOQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T160108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCICP4HOdjOZBQ%2B4FWK7rEEkND30zr8YsP3602FHO4eYusAiEAsPTTh1Xsrta5GTLGVN%2BADD2rQxbNZcBAPuB0KmAwUfQq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDJsr2gK1k139wUXjnircA6mS2%2B4quvUflPPqkcxWYgbSpCN%2FIL0CGprOpKq%2F%2FhYDtob%2B3RRqsS702b0E3HcOsCFkk%2FPfDLkO4sM9iZ2mbeHAfa340upZ1ZFLzBlAqoHIjMhRv314%2BSDYoP40NxxqWgkZHAZS7Q9MfhCh%2BoEWTDcxBF1L9offp1xmva1GBWmyWxzFaBJR2aHrFyEUNsNYSahKq5jlYJ3iICjgOzTO2aOIrNqx%2B7x8fOyhslBe6bKJul9pRbBmXo8L%2Bmpu4XL%2BX0DoTu1Z1kLIfW8UoxxJDbOnZQyLTbbIL1bHWah8UwxVyKl3Kimi8ayuMSZa%2F1cFQwaYu8CVp%2BpShhRpIfE%2BIDkNXqr0optHT3Ac8FUMmcvxgURGsU%2F%2FwEVUo3NffkTq0%2Fu0X59wQD20LwfFzgzDum8%2FT0moNOvvdTAFOR4ZgwoRXnbRpnALOAf052DBwX%2B0%2Fhod%2B1HceL9xnWfX6boNGNxMjJSKcc364AY2J04W7QuF%2BXu6w172PgqMHxosItQ0mWzy7xFo11JU7V6Y4TjzL1gfUwT%2FmwDaTfcbEVZEyR7y4t%2BGPjNbgXviLa%2F6WvV6nL7wUqJ%2FJohWat5d4CUfI02UZY6QfSq6jc4K4kwtKwfkGvFZlc8z4c%2BZvPRIMOWBvMkGOqUBIVJyuGz7eMA4bQRmbYnCFic3GoG5xPJ8DGLJWhhRXI2LQ6hCKo0t2LWCTI%2Bi2x7PfyziXYNbB%2FDJQZe4wbnz249xrgrg%2FDDUsSapzWtA%2BQpp1rehW0kNjDFnaYWhvJ5bybDYD%2FxetHSe2S%2F0fG6GjrfV%2B%2Bf5TtKvF%2FCayOLcNmVjilXwJyRPkTlIGa3knnvKgJ1vsXsFWjWy4HnUb7Ed0bOICEAO&X-Amz-Signature=8b77ab5545f8a6840352cac1ce68ebc43cbb6f6311f1404a0f48b0641175c542&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656AFXNS2%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T160110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIHKJImhqXEwUyM5Zw6sj8GocGAK3LtMadge0WH1RtiPHAiEA1l9ogRL77JMKc6N501EUWs2EkEaw7OUPbHbIs%2BIHQfUq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDHR%2BJ1yT2pznPn7CjCrcA72Ak4YrqvdCZgBaikXVMZWk2MlMpFDKCeZq4jwLEdGfGcZqSELy%2FWFtjswmHqkGj0NaDGNusJihnB5T2NchuuDI6WOAu1QhXDV%2BnvHnxZ%2FfXTZSQ7P7mh8ZfJSTt9jjNRFGu4tPg90PcrYZ5s3p%2B8x2UXq4TdOH8IhjgkbpEy%2FpEBSC97vZMyxM3dimHyHxAe1GflhEGEnjwByR5tTAi8cKlCvPGsIqdvDAMY5e1g035l6df8lvrhz%2FI5QX9zHNGprl%2FdVyuP3OSshIMtDQdeOPKFUK%2FzeXDxgYXtqxdDNvGFvL8txbDzK3atG%2Fb3so%2Byl%2B4fMjfaJNXs8xuv4Wr7R7x9Ve9GFGEgbz6xjxKCUK50IBr2CvoLKeQif9hCFgeajTrgG2%2FwnoyDHTS%2FR2PaoVePe4RS5T4miuCOrkkgkPj45WQNTgPfVx%2BvJ4%2BE9Y59YwtdE98DgGyct5xMTSMM0oL6iKL5gObyNH6KbDwc1YnVpMJn6d1WGX%2FYp%2F2wieqhs8l2SMhgrwiPS%2F6X3LwBY%2FwTgRQyRPQ3pTMBsexeLNhXKsRFaLoW9eTK2zCgqIB1qdBzVjhBextRVLdlcaDN6FByDnQxRnUPKMONVvE2G8Y3BhtUUy9FE2kxsCMOGBvMkGOqUBtPiQq867WXzM0wr%2F1IHXOAx2Z8V9oIowunY416aBUzuIf15wp%2FvuhiidzATHOihyNjTlXX1gc2FUBuwMMoFDNWU7T%2BoMRbLY%2BrcN%2F0mQl86aWDo5dd072hKpMDqWaTdl2dU4jIOTGWT1NjnNx2wBKt94Q%2BJ93%2BnH3spoDxSFuvNjp8AU373m2HVA9qWqb98myMnR8GoRVDc%2FmCtwIlQ3IfJCvpZK&X-Amz-Signature=71fdb48659897e9ab5c9c4c3f7bb493e46e1628faa6938445fcb3a1a56cfdc0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656AFXNS2%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T160110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIHKJImhqXEwUyM5Zw6sj8GocGAK3LtMadge0WH1RtiPHAiEA1l9ogRL77JMKc6N501EUWs2EkEaw7OUPbHbIs%2BIHQfUq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDHR%2BJ1yT2pznPn7CjCrcA72Ak4YrqvdCZgBaikXVMZWk2MlMpFDKCeZq4jwLEdGfGcZqSELy%2FWFtjswmHqkGj0NaDGNusJihnB5T2NchuuDI6WOAu1QhXDV%2BnvHnxZ%2FfXTZSQ7P7mh8ZfJSTt9jjNRFGu4tPg90PcrYZ5s3p%2B8x2UXq4TdOH8IhjgkbpEy%2FpEBSC97vZMyxM3dimHyHxAe1GflhEGEnjwByR5tTAi8cKlCvPGsIqdvDAMY5e1g035l6df8lvrhz%2FI5QX9zHNGprl%2FdVyuP3OSshIMtDQdeOPKFUK%2FzeXDxgYXtqxdDNvGFvL8txbDzK3atG%2Fb3so%2Byl%2B4fMjfaJNXs8xuv4Wr7R7x9Ve9GFGEgbz6xjxKCUK50IBr2CvoLKeQif9hCFgeajTrgG2%2FwnoyDHTS%2FR2PaoVePe4RS5T4miuCOrkkgkPj45WQNTgPfVx%2BvJ4%2BE9Y59YwtdE98DgGyct5xMTSMM0oL6iKL5gObyNH6KbDwc1YnVpMJn6d1WGX%2FYp%2F2wieqhs8l2SMhgrwiPS%2F6X3LwBY%2FwTgRQyRPQ3pTMBsexeLNhXKsRFaLoW9eTK2zCgqIB1qdBzVjhBextRVLdlcaDN6FByDnQxRnUPKMONVvE2G8Y3BhtUUy9FE2kxsCMOGBvMkGOqUBtPiQq867WXzM0wr%2F1IHXOAx2Z8V9oIowunY416aBUzuIf15wp%2FvuhiidzATHOihyNjTlXX1gc2FUBuwMMoFDNWU7T%2BoMRbLY%2BrcN%2F0mQl86aWDo5dd072hKpMDqWaTdl2dU4jIOTGWT1NjnNx2wBKt94Q%2BJ93%2BnH3spoDxSFuvNjp8AU373m2HVA9qWqb98myMnR8GoRVDc%2FmCtwIlQ3IfJCvpZK&X-Amz-Signature=71fdb48659897e9ab5c9c4c3f7bb493e46e1628faa6938445fcb3a1a56cfdc0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665POLEFUC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T160108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCQMPJxIdMw8wBezAee7nMWZFBtt5Su25oZ32J1GIaeqAIgVw7sxdOPgIr8vc77YfD8d7dERtObMB4ShSSJn%2FlKPcwq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDOiJPPB7T1WYeLPv7ircA3IwxzJ2cX%2Brk2m6CrpwYYe%2B0qvyW7LfCIxenXdDD%2FUhie0fQ6YvRYeMTTY9%2Frc92X3WUeGKy7h6B67s8PguOiGS4a%2FC8GgKxacVxC2ERgoHjQybrHDAuZdORAJs6z9IJ910YUO80hwzApR%2BcpGYQ1hBkk0ZNsiXGgDe5pzneagguH7yqqgQilGhgK4g%2BYe7%2FR9%2BFAo8a0Au%2FsazsNrA4plwHPEXLzkVHT%2Fg8ePpGWRa3kdvyLdMs1XEZ4%2FRWZmINyfBr6F5dvM2ODX8uoN4v4K7vEnaD2at7pzWTohkyk1Shq7ePAmyo9qJrY0Susgej6p7aewCiZTbfGFcsWCMba5U8KjShg2mdQzRqAq7RgpjOj%2Fg39xNcifQmnl49OVK%2Fm3X7TsWc9%2BYP3LAG8NVsC9ICyY0P8vHOp3Nqjx8jBAGjv4CiBYDad9hTjY4Kdp471Gw57OKpG37%2BUTR3DzHLJewkIRkTYc7LhvOVr%2FLJMTgg8ZUd9rmII1zb3uRTCUM4kXYK5mh9UJZ3YuZuW20Z%2BHIQIHRaZYg69f9RlCAa0B5HLi5zYYXRqtrh9n3vNp%2BDn%2BZ1zPQXi%2FRiXbYmxdjRrpNw9m9sUr0JJH4CHlWFFVLmLlxd%2FB%2F1qwuXLSlMNiBvMkGOqUBKS%2BCbqbDgIWx4gAbN7XDnKuQt2WLAP%2BGiELXEsEQH0BWyxD%2BhHr9WHFNXYu7yDpPfpaKHhXf5SRwB8cO1BeVNbWIWYIWMks9zx5ajbBcE4yqAbM%2FQlabVMF%2Fh3PBEGegIaodO2Ux%2BcPJ7xGeQBs9amy1keW%2BiZ5xPYTtmK1kRB1xLq1%2FQzw0q%2BH26zwKYRLZa1fCu5Ost5d7Y9nvZubcSlyMYwc3&X-Amz-Signature=310e7d8f73ebb8c6ecc9a1863da76f08531f17c43a49e529a6fb2b0e1dcdd6d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VJ2F2UI%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T160118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIHczLE0XJZ4qnMTQWKVzrXGstHH%2FjbD3oEdm6d6W7V%2BtAiEA9rJ5RadgZLC7uZytW0eV9XfrlgcI6hr9M0iokme36Iwq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDCEHyJ%2FTc%2FzPUNrFuSrcA0Df4MdGssINLlmmq3E58igQPjNohmfH12ZYjJlOju096FOl0XzdNWUFR2xuTtKAxXKVDbfEPeEVr9tAd8hyyEF%2FWc1ZbiDFw18tEAwQDaO4ChZnA8c%2FpEUZFMpIEtJ%2FK1WMknG0GCASqVdgbMWc3VW1iiGj%2F2h8lIo5qOLBNZM0%2B6r9l8fbBoRo6XhKOBQp08gdMB0ZAHr8tk2k0dgQEsUVpF7r0ravIUyGhFCN6xDaZQmuzK6aDSJ7k%2F1hOTx9QQan41gvBMpJgFteVvl88FdDdvw%2F70MXC5%2BF8PPRYiAFlSO4h7lFPCPBMmhjt%2F0hvOL2bkuMHqcgO39aByBckEDsEpIcZ4J0%2BhQfx8ga0gPlxV%2FTxIFuITrkDPeDOSwewcgNImbX3QPRY3wTFxp3DFrWSrL220iEGLfaUds%2F4M3A5Buq4RI4Qi3s0ZwlRLKEyiS8DsZXeFyfETCdz5nwlg9gTq9OeAEPUOUw2owOP%2B1eEnPs2RcfBCMs5xsxNtkyrmgAQQcmMncqHQ6VvH%2BhpT%2FmL3nM%2BRniKmICyBxuCas9A30%2FbFP69m1D5tf3GKGwy%2BT9bYKeX92YGf22503ER364kIuJQU8oCKpPnok2ryAY3kMJ3EP02mFEWVP2MKKBvMkGOqUBi8El%2ByBlD7pNjtAS1xLNSqGNosm6TzoBXZoPQ2BPvySZKcJcLOBslPcKuiS0zOXHgjsl0VsZQ%2BeOXD5CvXsTiyanNzHjEQHOJbFmLghvtp68Jcwko8rU7f4Lh%2BKRVN78P64Fqc4Slax9TpOYk18Cf0qlG8vD9SNBvDB%2BbuMAZYBPl5oZtOPjePTxoOtWBXIh%2FSxVfRlxus%2FixqZrTUsIiEROkd%2Fs&X-Amz-Signature=fadc651bbd9ed8ea4cb272052346b15a360c67596f8d3f864c0d3514a99d5011&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VJ2F2UI%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T160118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIHczLE0XJZ4qnMTQWKVzrXGstHH%2FjbD3oEdm6d6W7V%2BtAiEA9rJ5RadgZLC7uZytW0eV9XfrlgcI6hr9M0iokme36Iwq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDCEHyJ%2FTc%2FzPUNrFuSrcA0Df4MdGssINLlmmq3E58igQPjNohmfH12ZYjJlOju096FOl0XzdNWUFR2xuTtKAxXKVDbfEPeEVr9tAd8hyyEF%2FWc1ZbiDFw18tEAwQDaO4ChZnA8c%2FpEUZFMpIEtJ%2FK1WMknG0GCASqVdgbMWc3VW1iiGj%2F2h8lIo5qOLBNZM0%2B6r9l8fbBoRo6XhKOBQp08gdMB0ZAHr8tk2k0dgQEsUVpF7r0ravIUyGhFCN6xDaZQmuzK6aDSJ7k%2F1hOTx9QQan41gvBMpJgFteVvl88FdDdvw%2F70MXC5%2BF8PPRYiAFlSO4h7lFPCPBMmhjt%2F0hvOL2bkuMHqcgO39aByBckEDsEpIcZ4J0%2BhQfx8ga0gPlxV%2FTxIFuITrkDPeDOSwewcgNImbX3QPRY3wTFxp3DFrWSrL220iEGLfaUds%2F4M3A5Buq4RI4Qi3s0ZwlRLKEyiS8DsZXeFyfETCdz5nwlg9gTq9OeAEPUOUw2owOP%2B1eEnPs2RcfBCMs5xsxNtkyrmgAQQcmMncqHQ6VvH%2BhpT%2FmL3nM%2BRniKmICyBxuCas9A30%2FbFP69m1D5tf3GKGwy%2BT9bYKeX92YGf22503ER364kIuJQU8oCKpPnok2ryAY3kMJ3EP02mFEWVP2MKKBvMkGOqUBi8El%2ByBlD7pNjtAS1xLNSqGNosm6TzoBXZoPQ2BPvySZKcJcLOBslPcKuiS0zOXHgjsl0VsZQ%2BeOXD5CvXsTiyanNzHjEQHOJbFmLghvtp68Jcwko8rU7f4Lh%2BKRVN78P64Fqc4Slax9TpOYk18Cf0qlG8vD9SNBvDB%2BbuMAZYBPl5oZtOPjePTxoOtWBXIh%2FSxVfRlxus%2FixqZrTUsIiEROkd%2Fs&X-Amz-Signature=fadc651bbd9ed8ea4cb272052346b15a360c67596f8d3f864c0d3514a99d5011&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

