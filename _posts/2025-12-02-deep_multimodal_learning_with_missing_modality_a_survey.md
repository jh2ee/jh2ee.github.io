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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZKYOE62%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T071205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCoY5XBM2KYsjlqRUYxz9FzW6qIAxhfX2SGc7MhsQh%2BPAIhAOgQiE%2Fxko2X5FcnaQZ%2B7eYcJVU0Dx1rDFBghs2rcplUKv8DCAwQABoMNjM3NDIzMTgzODA1IgyrspdbHqqL5pVV3VQq3APWskrp381wIh3emr0JujYa0jZGS0FOEkQ5m4ICtf2kLVoOM6IxJxzVpuBOt5Z%2B5I6EzQIfq%2BwwRmTCkigYbM5EI8fo2IgcDe4irye%2FRqjBLYPDN5rHzOfw1oce0yQA4xKHlqDdR3QJ6vXvdD9SrF308AWvSlxm47pKTQ6QJPlajRpcPnZZQqUSp9Svt1DYu4M4pBLgBjFumFOjH5TfgwuL27mfjXGbhfE5WWswYy5Bgih7zGJDp4GtY8cBKTpj2x7YhAiEqDqfKAgsZHujXCun4L9NU7THp5AsCwh3cr%2FoKu2ehRUcahuj1EFiY7MtSbojFgWP0JpsgRfIjcMpElMjogKNtGwA4wRkpU4xIVkKTsW3TXUuzBRmqfuS78hhtfLLKF0u7GdgS3R5uJAM7mxiSwNBe17CQP6DoQDVA1nO%2FJGQb4AS%2FPK4OW7corK9VR%2B7X%2FeS57Gw7kLQlWJeJmRkUzwS32KFZ2uMebfJ6vMKLf9dS9CuB6PQqqFBBZl9JEczKUF2YwD%2F1X9YEG0aIbv36F%2FoswE66M135KA56oUwr02a6qghzI3O%2BF%2Fwtd6BNxpVvWtxsvvSOHM8AxWipC84yF6azdU3kuVGHEJ0BPiJ3GzaLkMw2lZ2SKySdjDVornJBjqkAez0AJ9YD3D%2FpoBHhgNjzV42u5hXI5wA6CsAaro24UDNt3%2FRLSY70OMxERbWk0jsjhR%2FgOt4MPunkQ51W9vPtIYvctl4TeU2cg4CR6zbZH2kUh1wID4XmVoYbuvMtI6rxima3G8xCMjwj8ePkt%2BGDZ5WP%2B%2Fln2M6DBG57LwtYUUKIezJh%2BIuwqtKVTtzTaF4EFa1Y8zmjlmQ9qz3CXPPvKKLkp8y&X-Amz-Signature=19d763aa16ab0234d070394198e08ad0617f946e236f49b4f7448a038e65f694&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZKYOE62%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T071205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCoY5XBM2KYsjlqRUYxz9FzW6qIAxhfX2SGc7MhsQh%2BPAIhAOgQiE%2Fxko2X5FcnaQZ%2B7eYcJVU0Dx1rDFBghs2rcplUKv8DCAwQABoMNjM3NDIzMTgzODA1IgyrspdbHqqL5pVV3VQq3APWskrp381wIh3emr0JujYa0jZGS0FOEkQ5m4ICtf2kLVoOM6IxJxzVpuBOt5Z%2B5I6EzQIfq%2BwwRmTCkigYbM5EI8fo2IgcDe4irye%2FRqjBLYPDN5rHzOfw1oce0yQA4xKHlqDdR3QJ6vXvdD9SrF308AWvSlxm47pKTQ6QJPlajRpcPnZZQqUSp9Svt1DYu4M4pBLgBjFumFOjH5TfgwuL27mfjXGbhfE5WWswYy5Bgih7zGJDp4GtY8cBKTpj2x7YhAiEqDqfKAgsZHujXCun4L9NU7THp5AsCwh3cr%2FoKu2ehRUcahuj1EFiY7MtSbojFgWP0JpsgRfIjcMpElMjogKNtGwA4wRkpU4xIVkKTsW3TXUuzBRmqfuS78hhtfLLKF0u7GdgS3R5uJAM7mxiSwNBe17CQP6DoQDVA1nO%2FJGQb4AS%2FPK4OW7corK9VR%2B7X%2FeS57Gw7kLQlWJeJmRkUzwS32KFZ2uMebfJ6vMKLf9dS9CuB6PQqqFBBZl9JEczKUF2YwD%2F1X9YEG0aIbv36F%2FoswE66M135KA56oUwr02a6qghzI3O%2BF%2Fwtd6BNxpVvWtxsvvSOHM8AxWipC84yF6azdU3kuVGHEJ0BPiJ3GzaLkMw2lZ2SKySdjDVornJBjqkAez0AJ9YD3D%2FpoBHhgNjzV42u5hXI5wA6CsAaro24UDNt3%2FRLSY70OMxERbWk0jsjhR%2FgOt4MPunkQ51W9vPtIYvctl4TeU2cg4CR6zbZH2kUh1wID4XmVoYbuvMtI6rxima3G8xCMjwj8ePkt%2BGDZ5WP%2B%2Fln2M6DBG57LwtYUUKIezJh%2BIuwqtKVTtzTaF4EFa1Y8zmjlmQ9qz3CXPPvKKLkp8y&X-Amz-Signature=19d763aa16ab0234d070394198e08ad0617f946e236f49b4f7448a038e65f694&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X6QINAU%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T071206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIDNDtk3FirlR01IDe9U2fNG1jJhS%2FMl7HMQHX6Tat0xJAiEAmKe76oQSGd3ogK4jrsxvlcjBZu0LH7Mn8FZ03ZUwwawq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDMtLyDJmTWmkLIvwSyrcAx%2FPJJyMMNZN%2B1Wz2YGTV5lvPCBygtq%2B70n5d31U5Th4JtXF143r4WnAHLUyP3uITdFMq8PuEJoYyvWM9D%2BjPVCM4FW4%2FDifFAGB6rOJRfSv9BOApq%2BKCFKOFkJMB0OUNulX05ZiCs9w2vfcYddcOWQAyoBELvXW4NsxbGObpuVsI9RTMfER1f0Rxl3DlDdhxnDCwB6jTw3uj3rfWhqe7sgCCJoDloLjoUQ2ZztU5yqPQwiDMs9dy2PEgZjQM258cgGHh%2BKX4MG3pae9mwnnaoS%2FN8AUSgjvFMNL%2Bn2En2NbXQOa8Z16jtbIIS37sAYap8oa05wF%2BUatV2LsrtSuDSSazEfshd7hx7nw6hYqL%2FFNf2OXap3hw%2FY8uz87BtgZYihk771pHzYHv17V7sJObcGjLyoXpIl7G9a2XE1Jr26pGxyS566719c579aKukex2IWxiIWB6SF%2BWaj7QUwArek%2BeAD0%2BJ7lV86x4srhWPZZH1L7oNOWQt%2BSnxF%2BJW%2FS0GtRhY5iJl1GLgnzmQOhabngKKs9c7w2yaMFkz7YjyC1ss7heqPXnHVLvpCwGxIzVbkR8u0qRC8qJwnbBgkFuO7DGqaow0C%2F3rxCu6HxeEK1l40TDJZbdHza7UFsMLmjuckGOqUBpnGORp7Cl87UDrasyl2Ljoh66KTOgrKKGaqr9fWXuBq55uBwUCop3P225MREjdWWiUwkFIj5iCJbAtOM96aBxHqopAkTwhIivNj1fEZJ4LI1SjU%2BLguSnpqX%2BlX4ssPU7rFtd5AHKQ%2BzxAppVTnvaD%2BF%2FeLsoEzE9%2FmBl0UMgRrzZH33qrPvsVSia0%2B4ZRsnLGrhnnKrACy1VqaM83EmMlvuAdKo&X-Amz-Signature=f68cbf1d5619b732d9c88cabdcd2f27903efa23a5a12fec89d174d4b2ccf0207&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X6QINAU%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T071206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIDNDtk3FirlR01IDe9U2fNG1jJhS%2FMl7HMQHX6Tat0xJAiEAmKe76oQSGd3ogK4jrsxvlcjBZu0LH7Mn8FZ03ZUwwawq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDMtLyDJmTWmkLIvwSyrcAx%2FPJJyMMNZN%2B1Wz2YGTV5lvPCBygtq%2B70n5d31U5Th4JtXF143r4WnAHLUyP3uITdFMq8PuEJoYyvWM9D%2BjPVCM4FW4%2FDifFAGB6rOJRfSv9BOApq%2BKCFKOFkJMB0OUNulX05ZiCs9w2vfcYddcOWQAyoBELvXW4NsxbGObpuVsI9RTMfER1f0Rxl3DlDdhxnDCwB6jTw3uj3rfWhqe7sgCCJoDloLjoUQ2ZztU5yqPQwiDMs9dy2PEgZjQM258cgGHh%2BKX4MG3pae9mwnnaoS%2FN8AUSgjvFMNL%2Bn2En2NbXQOa8Z16jtbIIS37sAYap8oa05wF%2BUatV2LsrtSuDSSazEfshd7hx7nw6hYqL%2FFNf2OXap3hw%2FY8uz87BtgZYihk771pHzYHv17V7sJObcGjLyoXpIl7G9a2XE1Jr26pGxyS566719c579aKukex2IWxiIWB6SF%2BWaj7QUwArek%2BeAD0%2BJ7lV86x4srhWPZZH1L7oNOWQt%2BSnxF%2BJW%2FS0GtRhY5iJl1GLgnzmQOhabngKKs9c7w2yaMFkz7YjyC1ss7heqPXnHVLvpCwGxIzVbkR8u0qRC8qJwnbBgkFuO7DGqaow0C%2F3rxCu6HxeEK1l40TDJZbdHza7UFsMLmjuckGOqUBpnGORp7Cl87UDrasyl2Ljoh66KTOgrKKGaqr9fWXuBq55uBwUCop3P225MREjdWWiUwkFIj5iCJbAtOM96aBxHqopAkTwhIivNj1fEZJ4LI1SjU%2BLguSnpqX%2BlX4ssPU7rFtd5AHKQ%2BzxAppVTnvaD%2BF%2FeLsoEzE9%2FmBl0UMgRrzZH33qrPvsVSia0%2B4ZRsnLGrhnnKrACy1VqaM83EmMlvuAdKo&X-Amz-Signature=f68cbf1d5619b732d9c88cabdcd2f27903efa23a5a12fec89d174d4b2ccf0207&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKVU2ETC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T071205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIHkE3W7cgvz0CbnQbgpq6i47nykFb8PRJiptEou4us4MAiANmOgtR2UGyYowuECW43czciuIFuHUNp%2F7tP6Dv5NHIir%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMkbJkTjD6qPO8vximKtwDO2Xbc8NbfrrP8cKiJSPfVl1j4B4E%2BT6pBcNb6KsPCB4%2F5%2BZdll4XBVmWR8LuOA69PVtZOznMGPZQEkcsu0AjcJR6To5bthTjBjmf82uprkxEtuaNKRs8BRdb0PCMHvfAJB529XqnYvd%2BKVdJV5l6tJgr5h60DT9p7HIOZs5T%2B79LKia1zRq8LdLwoW60WpgMt5acCnf8dy2BogwCOormqRI8XqGfxIbf%2BSY114EFcAUPVwgUvMSpTKo2WFNulwLtOHfDl9I%2B56G5lo5UyIERAP5q6HAesnO66WTaYXSSgLwLCy3rVy68BUJwNpAdblnywJPrFThALNe2M7l3BRAK5KMLlcO8Ye0kaS4lxufMLsA%2BahUXzABkoxUFq8ivhDw5auvNdP2LTsA7ZB4%2BAY3w9vmGHS8o8zOu4kNWJ3UGR3Unw765DbP2TnVPLbTXtJa50o4dz2laL4CkaLsTDlQQGMNqhDxewEzgXGYZd1595UMooVwZGq7AyP7AdXE2iI09sVWoJ7JShgZ041N4XTbnhwJa%2Bc%2Br3eZLAHigB1sAf4crKCuZ%2FMY2x9HFSD4hUjLmddLpZxXEYnkrre0VMch3u7mxGJvxDUp8LuCZLoxLQxJajToCnY%2FPYyEqhgQwgKO5yQY6pgGe0AGUKYzVjpRuDOZvpX75ZN3H%2BJVO46vHdh47uQJzI6nfizM5QqPALfVuvtDZ7OiW5ZGeR0y%2Bfw4fMcKW2NUuVVdYgQtkOmM064efIlYwbUvVJy979NPADJWcMQknuCK9REV%2BjAEBYd56h5Lt9FljvyS0fgJpRYg5ljjnvKMqPf7YgXjzz6KwSkKWbgsD0uR%2F9IQRN1f12G3qiGBE6zaWbkJGybnc&X-Amz-Signature=98c43b43644f87d143ca89db268819963ec80ca4e17825fae628119c2389ebd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7OJD4BQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T071212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCICWkVvakoFKklP080CvNSagsGCECa7LSKOM1lbU6nfmgAiAOOJgEqXFQcZYoXBm2eRzEBRB1Ot7KlqOe%2FdDUT4Hg0ir%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIM280339PLkUd9x4ILKtwDS08hdwIVquTW%2BLFGW%2Bj%2FSVKklUKGyuyMbBj9ckkyaq3QWmc52DdMSb3UdJxR38yYl7dElZN15mj6%2B7u%2F8uQDbWtwDFCsk%2B%2BB4Nbp3puUgP07MZ2taRvdx61cRoTvGTRS7e3QUhDNftsfmLKxMabIg3V0Q77tDsaqC2%2B7E9zlxR9OA9HwDcMjZqyBW4T3heZhKM7%2B2DzPCFN940lT241NchL0buEeqvDxiDQ%2BWVqHHpvRA6%2BlJW92mLEAWGqMwTtwQpKHQJMbf0j61LL%2FfHlgEmHZ0CiDJbRu1k6WM%2BZ5iHrqCL5uXRUu7YBgRLNFCgitmIKYrg4m9szrnVnQelLHUNnxoBEwwCCV%2BdD9u%2BPkT2FMNNAt52J0lqsPQyu0FG0Qh6cn8RrYQI5sQW0I4Yx2Ah9q6QxNdm0cThAjmGhWj3p4dOITSGiUwr%2BsKS8QznwK%2B88WOjnYov19dHHhns%2F68a8pfhi%2BO2OAR8ozhfuWBOqyKNkrdh0kx%2BR2id7iJwXu1zMMSIzkPfzaGabvQ98dNcY1Mo7dRKSdgxRPJSq6oRuMQr1YexyVN3lV8Ic80wL8c1cAfZu3iZ%2Bats32FuOx3nY8YnqCYeWLg1vvDDVnmAkxMTZ75Kus5TSd9nMwwKO5yQY6pgG1tM%2Fb%2FnpJIPZpdJBgBRoEYDbLLkkV%2FwvVXAC0fpobtMq6aIJtpujJQpzgoCw4eWma0q1LkWHsmXcEV79Cl4UYgbI%2BC%2FJG7s4WawN5jO3tJqCGvg6WEHLCfAfcfg1ggkAD69No9iLY8wL3ik8wNZ1q5ak2NBBw0Jn0ZtsHsx%2B140AwXLH4dBC9owZUxqpSeB7D1fh7FOpnQYqGhSRsxPXnvVWbJOjP&X-Amz-Signature=c40b0f30f87d8fbb6c62addb9e5a6f72974fcf88b586d9c5fe64a3488fbc0a6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7OJD4BQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T071212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCICWkVvakoFKklP080CvNSagsGCECa7LSKOM1lbU6nfmgAiAOOJgEqXFQcZYoXBm2eRzEBRB1Ot7KlqOe%2FdDUT4Hg0ir%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIM280339PLkUd9x4ILKtwDS08hdwIVquTW%2BLFGW%2Bj%2FSVKklUKGyuyMbBj9ckkyaq3QWmc52DdMSb3UdJxR38yYl7dElZN15mj6%2B7u%2F8uQDbWtwDFCsk%2B%2BB4Nbp3puUgP07MZ2taRvdx61cRoTvGTRS7e3QUhDNftsfmLKxMabIg3V0Q77tDsaqC2%2B7E9zlxR9OA9HwDcMjZqyBW4T3heZhKM7%2B2DzPCFN940lT241NchL0buEeqvDxiDQ%2BWVqHHpvRA6%2BlJW92mLEAWGqMwTtwQpKHQJMbf0j61LL%2FfHlgEmHZ0CiDJbRu1k6WM%2BZ5iHrqCL5uXRUu7YBgRLNFCgitmIKYrg4m9szrnVnQelLHUNnxoBEwwCCV%2BdD9u%2BPkT2FMNNAt52J0lqsPQyu0FG0Qh6cn8RrYQI5sQW0I4Yx2Ah9q6QxNdm0cThAjmGhWj3p4dOITSGiUwr%2BsKS8QznwK%2B88WOjnYov19dHHhns%2F68a8pfhi%2BO2OAR8ozhfuWBOqyKNkrdh0kx%2BR2id7iJwXu1zMMSIzkPfzaGabvQ98dNcY1Mo7dRKSdgxRPJSq6oRuMQr1YexyVN3lV8Ic80wL8c1cAfZu3iZ%2Bats32FuOx3nY8YnqCYeWLg1vvDDVnmAkxMTZ75Kus5TSd9nMwwKO5yQY6pgG1tM%2Fb%2FnpJIPZpdJBgBRoEYDbLLkkV%2FwvVXAC0fpobtMq6aIJtpujJQpzgoCw4eWma0q1LkWHsmXcEV79Cl4UYgbI%2BC%2FJG7s4WawN5jO3tJqCGvg6WEHLCfAfcfg1ggkAD69No9iLY8wL3ik8wNZ1q5ak2NBBw0Jn0ZtsHsx%2B140AwXLH4dBC9owZUxqpSeB7D1fh7FOpnQYqGhSRsxPXnvVWbJOjP&X-Amz-Signature=c40b0f30f87d8fbb6c62addb9e5a6f72974fcf88b586d9c5fe64a3488fbc0a6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

