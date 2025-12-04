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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FQO7N6T%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T022911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIHWsbxG8%2F%2FX6IgbLjTv1NUOCfev512VA0qFJAvp0jw2xAiAXqNk7pmU8J84k3VCDQ8edHKdJtF3N6jxo2GIK8%2BxVICr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMbNTgk6Dd13LtxqEgKtwDCI%2Fdf3lkuJHHVcf5F%2Fbjlj6iNlWnHb3G5cEbjRmhZBdEkzeghfzaY0HtQ%2FLkbJA42r75deObA%2BzDUOvsH7TLQPQ4uGz%2BhTJLB%2B7WpriDNUn2ib5t0YYUyTcnOL61MjNk%2Bnw45ZkWuJZ%2BSiKLhBbH9ZSHDVFC3rKouCcvzeu%2B4fU04aYXPaQ%2B9CiINuEo23psrxjK4gP9DOYbPPsLRNPsv3iFQk3c6fJ9esOk%2FgaEVsQkv5D8I4ag03n1LWaUI0c9uHHqGoOaaLuwThFRWqMg9iXUxhfL%2F1z3dFQfDparEpoQxFFeLDZS5OVly7SeXuiAP2JnEXXPNvmlT0e%2BBAYpiY1J6OM%2FqjPcCOk9L4EkVlcxVzmGQ6PDh7Y0h9hKfkEvkRNe%2FgNIpIKt2HS9J%2B%2Fnv9gWyby2COUeLgkoMH6xRaug2PiHdxiU4Cn%2Ba7i%2F%2Be%2Fi8u2qyp7J9iqWiaC1c9r%2BSqvjpXm2ePVNjfAhBf0sQnWOQr6OXxA2dV%2BixBHr8tV6n7Sv0hg%2Fj%2Bg8AHDb%2FR6gYtlN%2BtxhS96vWZJ9Lvs19TQywzGSNpSck9oPnnfsz6MQV5%2B0r58UTNJc9l42S2UKVyJldIHe6vcSLR%2Fe%2BdFVZn1TfVpMVqX4%2Br5x1mYw7N7DyQY6pgHCSU0q72wn34qdUZrnDZjkqRmFvbOZONmh4SdjaA82gn7Po7qAkciqvEWDTp5v1s5t24eKeMFwjUQz2TCVdm7LijRkJI4DQ32gxA8qKlQLvc3EkRWu6keESL99TYHAE93qC1WbD6JNWJQMJAScLeBO8XxTI7K1jWA5F0LWBFwaaD7Br%2BBkqAPBPVDImE1S%2FtEpOSyfj29adhOJOiiBP9HmmuA4OTuQ&X-Amz-Signature=a0a528702ae59c84a045db3a18c2ca977bdc91ba1740174caf8b4bb1b24091dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FQO7N6T%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T022911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIHWsbxG8%2F%2FX6IgbLjTv1NUOCfev512VA0qFJAvp0jw2xAiAXqNk7pmU8J84k3VCDQ8edHKdJtF3N6jxo2GIK8%2BxVICr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMbNTgk6Dd13LtxqEgKtwDCI%2Fdf3lkuJHHVcf5F%2Fbjlj6iNlWnHb3G5cEbjRmhZBdEkzeghfzaY0HtQ%2FLkbJA42r75deObA%2BzDUOvsH7TLQPQ4uGz%2BhTJLB%2B7WpriDNUn2ib5t0YYUyTcnOL61MjNk%2Bnw45ZkWuJZ%2BSiKLhBbH9ZSHDVFC3rKouCcvzeu%2B4fU04aYXPaQ%2B9CiINuEo23psrxjK4gP9DOYbPPsLRNPsv3iFQk3c6fJ9esOk%2FgaEVsQkv5D8I4ag03n1LWaUI0c9uHHqGoOaaLuwThFRWqMg9iXUxhfL%2F1z3dFQfDparEpoQxFFeLDZS5OVly7SeXuiAP2JnEXXPNvmlT0e%2BBAYpiY1J6OM%2FqjPcCOk9L4EkVlcxVzmGQ6PDh7Y0h9hKfkEvkRNe%2FgNIpIKt2HS9J%2B%2Fnv9gWyby2COUeLgkoMH6xRaug2PiHdxiU4Cn%2Ba7i%2F%2Be%2Fi8u2qyp7J9iqWiaC1c9r%2BSqvjpXm2ePVNjfAhBf0sQnWOQr6OXxA2dV%2BixBHr8tV6n7Sv0hg%2Fj%2Bg8AHDb%2FR6gYtlN%2BtxhS96vWZJ9Lvs19TQywzGSNpSck9oPnnfsz6MQV5%2B0r58UTNJc9l42S2UKVyJldIHe6vcSLR%2Fe%2BdFVZn1TfVpMVqX4%2Br5x1mYw7N7DyQY6pgHCSU0q72wn34qdUZrnDZjkqRmFvbOZONmh4SdjaA82gn7Po7qAkciqvEWDTp5v1s5t24eKeMFwjUQz2TCVdm7LijRkJI4DQ32gxA8qKlQLvc3EkRWu6keESL99TYHAE93qC1WbD6JNWJQMJAScLeBO8XxTI7K1jWA5F0LWBFwaaD7Br%2BBkqAPBPVDImE1S%2FtEpOSyfj29adhOJOiiBP9HmmuA4OTuQ&X-Amz-Signature=a0a528702ae59c84a045db3a18c2ca977bdc91ba1740174caf8b4bb1b24091dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2FPL7LR%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T022914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCz6TXCqxIC%2BLZR4iOIj5BtTjrvZ0fk19ZXHQXmmtxv%2FwIgfNtRquJuWEcSCJf1ksG9X02j5M9Zx4hgZt4uv1fRD0oq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDLOAVpsvOcFRFEuBQircA0q5tw%2Bkj7bjzX3mAEl5aOutHNJDF90%2Bukl7c5cWE9gOEptVVymEVKB2Zr2qoNBq6ib7UsCIIq5tDlI%2B6BP397wTkwsfGY1JNgo7MHGvJtxjBTNcmPyacCMl6zlO0PZ9uzCZ7LPfQIymt6mSW9Z2LJ0bEGP3Tgf1SA6ZoU3GElPUCVm0M2CN8DjPQI6yl2rAxCjgvMq059qpn2q%2FS1N3V4xiybeleDDQNb4wdWTnzaf%2F6bN%2FRIeXeje6wmUZoG66zMVrXY4m7kOWWZV5EEVPuIVVOLqWGCsnZmv2dBhTk%2BQBLqwZLXnNTJIEKwflIzHQPQznRLblD9y%2FvhhEOZwpGIqdTPOoyYrHhluTMQl%2BWbTo0daScpctf0Bd%2BxR3EEZkCc%2FGBn0lKiZGvuDCQDWr9MdaUTtTUsFajfqqgyFO3M8bM28QMpr3eV5zTNHH6yTRKS5GlMjHNXgZLbYY60izaaanl3tvyAS9U7dGZWQzC434gs8JGVJZ3TVezW19JVDfZgwTqQ4GMjH8OsVxOyxhYNMJeSnHR9PsJvqbZv1FRoNdXHvYnvRFnv102Tzt6t%2Fz%2BVMNRfCGD7%2BJB%2Fqa6q%2FKgZD84F%2Bwu7votCOthzHQPMXdNYcvLjIybwzCHcMiMNXfw8kGOqUB1wu20EzCgXTJNnF1vOf8ocoj4pHM5ymYl%2Fo6JuZWRgOgFmD7llOeqDCSORL4eSB%2F7RrUFf6CVT2nvx7cUU9opIoSCrir9IKAeGnHX5PL9%2BKXn23TIxpoxsKH4TQmTiKcFfL9eysb2fsagqUp%2Fh2jvRGkaoIlFwwkYbJgF8J4ZoinZ01uaryBg0F9l4UwwL3eknlH0AX2aOlc8Ng3A7j1h08%2FhmJs&X-Amz-Signature=2b5bb4ba01d8f2c25f07d68c9ad4d244d6c8ef76311702c5eb62e98848ba892f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2FPL7LR%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T022914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCz6TXCqxIC%2BLZR4iOIj5BtTjrvZ0fk19ZXHQXmmtxv%2FwIgfNtRquJuWEcSCJf1ksG9X02j5M9Zx4hgZt4uv1fRD0oq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDLOAVpsvOcFRFEuBQircA0q5tw%2Bkj7bjzX3mAEl5aOutHNJDF90%2Bukl7c5cWE9gOEptVVymEVKB2Zr2qoNBq6ib7UsCIIq5tDlI%2B6BP397wTkwsfGY1JNgo7MHGvJtxjBTNcmPyacCMl6zlO0PZ9uzCZ7LPfQIymt6mSW9Z2LJ0bEGP3Tgf1SA6ZoU3GElPUCVm0M2CN8DjPQI6yl2rAxCjgvMq059qpn2q%2FS1N3V4xiybeleDDQNb4wdWTnzaf%2F6bN%2FRIeXeje6wmUZoG66zMVrXY4m7kOWWZV5EEVPuIVVOLqWGCsnZmv2dBhTk%2BQBLqwZLXnNTJIEKwflIzHQPQznRLblD9y%2FvhhEOZwpGIqdTPOoyYrHhluTMQl%2BWbTo0daScpctf0Bd%2BxR3EEZkCc%2FGBn0lKiZGvuDCQDWr9MdaUTtTUsFajfqqgyFO3M8bM28QMpr3eV5zTNHH6yTRKS5GlMjHNXgZLbYY60izaaanl3tvyAS9U7dGZWQzC434gs8JGVJZ3TVezW19JVDfZgwTqQ4GMjH8OsVxOyxhYNMJeSnHR9PsJvqbZv1FRoNdXHvYnvRFnv102Tzt6t%2Fz%2BVMNRfCGD7%2BJB%2Fqa6q%2FKgZD84F%2Bwu7votCOthzHQPMXdNYcvLjIybwzCHcMiMNXfw8kGOqUB1wu20EzCgXTJNnF1vOf8ocoj4pHM5ymYl%2Fo6JuZWRgOgFmD7llOeqDCSORL4eSB%2F7RrUFf6CVT2nvx7cUU9opIoSCrir9IKAeGnHX5PL9%2BKXn23TIxpoxsKH4TQmTiKcFfL9eysb2fsagqUp%2Fh2jvRGkaoIlFwwkYbJgF8J4ZoinZ01uaryBg0F9l4UwwL3eknlH0AX2aOlc8Ng3A7j1h08%2FhmJs&X-Amz-Signature=2b5bb4ba01d8f2c25f07d68c9ad4d244d6c8ef76311702c5eb62e98848ba892f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFBRHJ7U%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T022911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIEMGRtRu0RRTsd7B8YHl96%2FWPhXyqr4w5GBtYb53Ex42AiEAxgc%2FwRhhWeH3H3EG7UrNVUvIm4YqXzMlxywv3cW6rf4q%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDLP0MPMqukwooMDSBSrcA9Hylnqi6v1eRC%2FoGvNWaOYlK0FvQEmeRYz7QJ2de81gdNGiVr2PNlwMsKyb98ocahliKoV%2FEl3pFPixM5ZyLMHGSyJXOr6wn5K9dkWg8V56WFg6%2B1NWOdFRFk1QKnBNU%2FLgbyTu%2FV96FufR8Hzm8CNlJTXKTw55RzJYzpTw9Q0ENM0qc2PPdQ%2FNzS2LtAAsS11veGUW34JlREk0y6U%2F%2FOwxlsRDLwi%2BcYapATegxGD2gDdbtem%2BjBt9IGQPt6OrHvgc1lvU6iv5rB7mJ2Gl3jgw5W%2B7wIu6bZGBBMlKxdF%2FrTI8BA3i7OmHAjQHsJguk5j8PRd%2FrNyrm7m352yv0jt4QKVAzuznA%2BBfNp%2FP9Xu6usSTgKxneagKqrXpwCi221czWiD80jHFHifbsY9iH9gYyT7K2rzA5pgD%2F84rxMMhrf3188jlWo7Y5N%2FuOWI6ON0tP6s%2F%2B3gIzE7QKR78pc8XOiq4urnJ4NoshDLXh2%2F9xW0MZ4b9%2BLuAkDLOlGtUXHUPDDPl4pNcU1z5LQFnqu00vTO1QGQ%2BjzTHgI4ixkdMl0JDFoRdf61FslJT7H9j218UbgSNSN09hyyQLQHHrRRsVLEArtlg6RNUXlCEjYKGeIPBtI7GN%2FDLHhaGMOTiw8kGOqUBj8nRuXu7BYDCFox3uZ9KUpZTsIdwXlea%2Bifm8gWhRU3p8dFlK4wKCg6u%2BBFIis13UjBF1lX2bys9RAehXNn4afxdE%2Bka1SXt0MxAbmElWV5w0izOf7ipzALgGY02FBSLLQ7BkeayLQXASQe%2FKFkV%2FxbbyYozytmwNJNw1VjNhXcSvxhGkpG%2BQKmN0MDjImwicvLjnkuaKTVSkEwXTcGloE0vvesB&X-Amz-Signature=2be84429c61e22f1b9448ad4d57cdea4dba85ebd8c86c5f1e248b2765327ba46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQHQSM6A%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T022916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCt2A48swsdf75F%2Bfbg3k3Tl7Rksocgrzyd6katOZdjuwIhAKCZtf1U5hzl2P3dZfMpBXzwLeRNZYbjDHuXc5%2FtjplMKv8DCDsQABoMNjM3NDIzMTgzODA1Igy342LHEBmU6tkvuVAq3AOIZQfPzBxdCO9VN294UTkiFosPun7Rt23Yrxj5XK61CG5cBVcJkERLPq9vTirx9o5cdhc%2FZLlF0DoxChaO429eMpLztijH%2F2tWhCyLpghvIw3JuqA0iVWvrz%2F5wRcX1oXyO6%2BqgwBXazQiTPyommqqtgRcq8J7ftnDvDA%2BnOCXiD9VImhYJeQUnjt8md972cSmrdtWBfgNzi0UqOb51hEXhFIHSKZzHbZ7p8%2BHi4cRgxo00Mgmz%2BR%2FKAclzxuZLXrwVOgXrJL0mJCaXr9%2FySNN6jPuTj5KKxQcAPXLba8TqrudjJemPldeCVGI3fRZOJOJhvYG5UWLILfwrdkhduhPTboCI1GqgnHAKXarc8j3WhGp%2FVyz%2Bz2jbjTt11%2Bo80XEeAICvIWWxQHX2u0v2FN71wf2JASywXFWiR9%2FBXwxsZ918jOLA2JPRd1cIJBWtf0oWi%2FSi3nCVHrxFlcCc42hvjI1KzKJeiWDUQDcJ9sswgI8A0i7ELiKEvI2KeWuIjewhTosczeFuGXeP2qZnxOfoz3wR3Y%2Bk4HKuN0XBCa1sq3KUwlzQhSYaOzQ4T9RUtpf2ogpuKpXyNJv6AwGiVKkQPaGZ4Swom8hKJsk79q3yFxWe8X8OLiLfX74djDI4MPJBjqkAe9BpeSYpEB0D0FoQHTbJTDtg0SL9iFN%2F%2BidLQ0QmbwdL4b1NI67jkJxO5qkGLL2U76bXCl1YpxmQvYy660Uxg1domm3dFqOPIgkDCogmGYskWfnoK3lZcllfQ3Kb4FhJr4J1N5RRoabxlLkTrERyzoeVGsiXvX74yp8bQUm2DEz%2Fu8ThoLeXqT7LYJG8bCVQP%2BXZx%2FfccCpWXidICHLsaxMawVK&X-Amz-Signature=90761c18fc393fb50529a4fe85e347a0fab940e008b341f812c2221dace55836&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQHQSM6A%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T022916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCt2A48swsdf75F%2Bfbg3k3Tl7Rksocgrzyd6katOZdjuwIhAKCZtf1U5hzl2P3dZfMpBXzwLeRNZYbjDHuXc5%2FtjplMKv8DCDsQABoMNjM3NDIzMTgzODA1Igy342LHEBmU6tkvuVAq3AOIZQfPzBxdCO9VN294UTkiFosPun7Rt23Yrxj5XK61CG5cBVcJkERLPq9vTirx9o5cdhc%2FZLlF0DoxChaO429eMpLztijH%2F2tWhCyLpghvIw3JuqA0iVWvrz%2F5wRcX1oXyO6%2BqgwBXazQiTPyommqqtgRcq8J7ftnDvDA%2BnOCXiD9VImhYJeQUnjt8md972cSmrdtWBfgNzi0UqOb51hEXhFIHSKZzHbZ7p8%2BHi4cRgxo00Mgmz%2BR%2FKAclzxuZLXrwVOgXrJL0mJCaXr9%2FySNN6jPuTj5KKxQcAPXLba8TqrudjJemPldeCVGI3fRZOJOJhvYG5UWLILfwrdkhduhPTboCI1GqgnHAKXarc8j3WhGp%2FVyz%2Bz2jbjTt11%2Bo80XEeAICvIWWxQHX2u0v2FN71wf2JASywXFWiR9%2FBXwxsZ918jOLA2JPRd1cIJBWtf0oWi%2FSi3nCVHrxFlcCc42hvjI1KzKJeiWDUQDcJ9sswgI8A0i7ELiKEvI2KeWuIjewhTosczeFuGXeP2qZnxOfoz3wR3Y%2Bk4HKuN0XBCa1sq3KUwlzQhSYaOzQ4T9RUtpf2ogpuKpXyNJv6AwGiVKkQPaGZ4Swom8hKJsk79q3yFxWe8X8OLiLfX74djDI4MPJBjqkAe9BpeSYpEB0D0FoQHTbJTDtg0SL9iFN%2F%2BidLQ0QmbwdL4b1NI67jkJxO5qkGLL2U76bXCl1YpxmQvYy660Uxg1domm3dFqOPIgkDCogmGYskWfnoK3lZcllfQ3Kb4FhJr4J1N5RRoabxlLkTrERyzoeVGsiXvX74yp8bQUm2DEz%2Fu8ThoLeXqT7LYJG8bCVQP%2BXZx%2FfccCpWXidICHLsaxMawVK&X-Amz-Signature=90761c18fc393fb50529a4fe85e347a0fab940e008b341f812c2221dace55836&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

