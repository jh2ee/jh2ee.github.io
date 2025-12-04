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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667J74CJCJ%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T050105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCICKmq9OVz7KfK%2FL6ZD1AZI8YZUo21X73bjmyAyzrmEQMAiEAvODisD1bmi0Hiw3ZQcJflZxuBs87UXeJGOh1Fh%2Byaqsq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDMsJD%2BGOCgtuqyl0aSrcA8cN75%2BWHbmH2fXYI0ZUf3ngZb7wvi4fildIeyWyXfSOnvHKHxqnGyClOnufIKz2RNpSih8omn9E9%2FU1B2iQv9Ho67Ysn2RHewjDMGxwCXp0I9r4Ln1eUlYfUMp%2B0rds275PPj%2BE49PHejs3ClaVFvmLPceQlOWWmUMyIyrucZVLYi7CHF3Uj%2Bo2DRj%2BaJZKJSyZnTbT1ig48wQYX2Uaw%2FH6498%2FAAZdNrAJoScXNRKixTZc%2BHzDmPTwl2hql4YxjsjALeK6sFWu9b%2BmxIsIvNW1eZgCtiK3jhcB%2BewzsJ9coVwYdP8Tl6T2IRubgVCryvP0JKX%2FyNMsE%2B%2Fuaw2452SBJFYc4BJIToPtdo3LoiLRrZqQcfUwi8LNU9cZS5TyEYb%2FJxviTusGVd9kJ6Jokof82rDmG7OmL6HAUgCZCAHJqtsjmEqA1A0yo4mGheqGkJsmMEtDoxdGS7Eyhw9G7mXA9aJDEkdourY16oRbggY1OWKsMhOEFDWOtAZmFNZdfe4YY7B5UFhsD5U2H2xvBdrbfPYwwLqtepOx6cWvsNAEoFg8iszIDWo9wLJiHGynx1bJWu04DtxfHAFjOhN84aP870PqE9L9cUsJKr6QcrB03cXgBUstpjZ5SyHaMJKbxMkGOqUBoZIowJpiQcHdxQDofB7o4aXPNH99Qi0ic%2BJu1FrOHDeLU1KNsbqkTGayw7%2B%2F7r6fWZDfsn07Pm7NL6SaQ1wi73zzDabVeOTJsH6ZUohkT1S4J6LDZrsv8gjnlkMwtR%2Bdt%2FyKit5gVhN4DgggQAreyOYc%2BiX7ITgUwuCgI4YGP9JEqvUDscg8bCY%2BxglbeZbgA2fOr9ChuyIfj2YMoL8hrgDTIZQQ&X-Amz-Signature=1802f73298a32d1b65c94bbca477154cdf059b6740c166a5b3f1292aa7da4263&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667J74CJCJ%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T050105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCICKmq9OVz7KfK%2FL6ZD1AZI8YZUo21X73bjmyAyzrmEQMAiEAvODisD1bmi0Hiw3ZQcJflZxuBs87UXeJGOh1Fh%2Byaqsq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDMsJD%2BGOCgtuqyl0aSrcA8cN75%2BWHbmH2fXYI0ZUf3ngZb7wvi4fildIeyWyXfSOnvHKHxqnGyClOnufIKz2RNpSih8omn9E9%2FU1B2iQv9Ho67Ysn2RHewjDMGxwCXp0I9r4Ln1eUlYfUMp%2B0rds275PPj%2BE49PHejs3ClaVFvmLPceQlOWWmUMyIyrucZVLYi7CHF3Uj%2Bo2DRj%2BaJZKJSyZnTbT1ig48wQYX2Uaw%2FH6498%2FAAZdNrAJoScXNRKixTZc%2BHzDmPTwl2hql4YxjsjALeK6sFWu9b%2BmxIsIvNW1eZgCtiK3jhcB%2BewzsJ9coVwYdP8Tl6T2IRubgVCryvP0JKX%2FyNMsE%2B%2Fuaw2452SBJFYc4BJIToPtdo3LoiLRrZqQcfUwi8LNU9cZS5TyEYb%2FJxviTusGVd9kJ6Jokof82rDmG7OmL6HAUgCZCAHJqtsjmEqA1A0yo4mGheqGkJsmMEtDoxdGS7Eyhw9G7mXA9aJDEkdourY16oRbggY1OWKsMhOEFDWOtAZmFNZdfe4YY7B5UFhsD5U2H2xvBdrbfPYwwLqtepOx6cWvsNAEoFg8iszIDWo9wLJiHGynx1bJWu04DtxfHAFjOhN84aP870PqE9L9cUsJKr6QcrB03cXgBUstpjZ5SyHaMJKbxMkGOqUBoZIowJpiQcHdxQDofB7o4aXPNH99Qi0ic%2BJu1FrOHDeLU1KNsbqkTGayw7%2B%2F7r6fWZDfsn07Pm7NL6SaQ1wi73zzDabVeOTJsH6ZUohkT1S4J6LDZrsv8gjnlkMwtR%2Bdt%2FyKit5gVhN4DgggQAreyOYc%2BiX7ITgUwuCgI4YGP9JEqvUDscg8bCY%2BxglbeZbgA2fOr9ChuyIfj2YMoL8hrgDTIZQQ&X-Amz-Signature=1802f73298a32d1b65c94bbca477154cdf059b6740c166a5b3f1292aa7da4263&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AIADHQ7%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T050106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQCg7HKgvHFWFBjZkvQbr0uAH5Z9kPLhZaBKQH5i9a1cYgIhANNXCEsfixvNImG0wyJgK5SQHIs2ZdFiYmtexGgFgUBbKv8DCD4QABoMNjM3NDIzMTgzODA1IgyU7C3Va9bpuInfoFkq3APMjtD3RStzzRuVXe97Ta53z95f%2F7CQ3rD4cu88ItQBu%2Fl4d%2Fyb2P%2FTfAAVv7Mhl84ffYRZVqoISdZSw8bOTXnFox4dK3LDEZknCLBSx4aFIv1xHDX4pNalMXRWTF0s88bbG0tfT0o4NZTfreVTp%2BltMjb%2Blf9mA5bOmsG6b3yxvWm49%2FkxUiK8vnCP1Xe%2Bpi3oB0b4ViOS5%2FHEe7pUV7X5O92vAT%2BWbe1n5xqyl0QlcN6hODlONMU7nmWRG9Uq14ug5TcMJY8RZmIg9BYocyxY%2F%2BaTtoqjkqG%2FLVhTz564wSUADCy6Nu3JrcOeZTf%2B%2F2lFzJ6tY2OleQwOHvjvKtp8SnKHkrj37n%2BOdDsm%2F%2FCToJD4rJxVh3u63JyV1UfCyA0lu83SaB%2BIT%2Fm5BBe7NCCLlEfrBNgRObgSsRfQ9Wi9WvTCxjkMrc1OEzOLB6ODn%2FqRzW11OkiTO0j2TsAuNtC8p2aolYlJ4vmmpCcWCIiaFHZAPD0iS%2BQC1t7wMJYd9YSf%2B7qA7n1iVl4x5Qax3Njm0zpybZCy38Cf9VI%2Bw11E9RoEwkn2PMfAH7KgA%2BSNothrnq5vO3BnlccxsqrfCB2D4%2BvxYMgJnTLKDDNJKGGPiSaCatBofkpwPVnemTDum8TJBjqkAZkMr52mQlmjnumjtE2kpGG3RR%2BQw2DB7sm0AA%2FPqXqR7MxO5pIZytfu7KDPvMN%2BXUBhKo3vb5krlleoqY8aOxoklvmVIYbEfHJJBiMRGSO5xisrRpCSmtNaf%2Fv7BgCqadjJ6558FW%2FLWVjDQI0wrLbx6vBkLha01B%2FqsWzNP4SZY4%2FjB%2BD9bDh4cPAMiM2LrPAhm%2Bge07KiZ%2BbpNNctsRKRNhT%2F&X-Amz-Signature=f455002eb71eee691b1773478ec2181b420f6569445a7e75b3ec5e779ef819bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AIADHQ7%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T050106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQCg7HKgvHFWFBjZkvQbr0uAH5Z9kPLhZaBKQH5i9a1cYgIhANNXCEsfixvNImG0wyJgK5SQHIs2ZdFiYmtexGgFgUBbKv8DCD4QABoMNjM3NDIzMTgzODA1IgyU7C3Va9bpuInfoFkq3APMjtD3RStzzRuVXe97Ta53z95f%2F7CQ3rD4cu88ItQBu%2Fl4d%2Fyb2P%2FTfAAVv7Mhl84ffYRZVqoISdZSw8bOTXnFox4dK3LDEZknCLBSx4aFIv1xHDX4pNalMXRWTF0s88bbG0tfT0o4NZTfreVTp%2BltMjb%2Blf9mA5bOmsG6b3yxvWm49%2FkxUiK8vnCP1Xe%2Bpi3oB0b4ViOS5%2FHEe7pUV7X5O92vAT%2BWbe1n5xqyl0QlcN6hODlONMU7nmWRG9Uq14ug5TcMJY8RZmIg9BYocyxY%2F%2BaTtoqjkqG%2FLVhTz564wSUADCy6Nu3JrcOeZTf%2B%2F2lFzJ6tY2OleQwOHvjvKtp8SnKHkrj37n%2BOdDsm%2F%2FCToJD4rJxVh3u63JyV1UfCyA0lu83SaB%2BIT%2Fm5BBe7NCCLlEfrBNgRObgSsRfQ9Wi9WvTCxjkMrc1OEzOLB6ODn%2FqRzW11OkiTO0j2TsAuNtC8p2aolYlJ4vmmpCcWCIiaFHZAPD0iS%2BQC1t7wMJYd9YSf%2B7qA7n1iVl4x5Qax3Njm0zpybZCy38Cf9VI%2Bw11E9RoEwkn2PMfAH7KgA%2BSNothrnq5vO3BnlccxsqrfCB2D4%2BvxYMgJnTLKDDNJKGGPiSaCatBofkpwPVnemTDum8TJBjqkAZkMr52mQlmjnumjtE2kpGG3RR%2BQw2DB7sm0AA%2FPqXqR7MxO5pIZytfu7KDPvMN%2BXUBhKo3vb5krlleoqY8aOxoklvmVIYbEfHJJBiMRGSO5xisrRpCSmtNaf%2Fv7BgCqadjJ6558FW%2FLWVjDQI0wrLbx6vBkLha01B%2FqsWzNP4SZY4%2FjB%2BD9bDh4cPAMiM2LrPAhm%2Bge07KiZ%2BbpNNctsRKRNhT%2F&X-Amz-Signature=f455002eb71eee691b1773478ec2181b420f6569445a7e75b3ec5e779ef819bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDRITQFI%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T050102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQDHKjFE%2F%2BhgP7Tck7UcTTwqUkK8vs%2FIfni%2F1mwLfr2i9QIhAIRU6dAjzf%2BSK%2FQb0oLK2Gqcq3wFu%2BVCV629goLKp2SaKv8DCD4QABoMNjM3NDIzMTgzODA1Igy4LKR%2FxhsfX1bIkfwq3AN6Te0pC11Q%2FhYmOrLK%2FRWqV13Q2HVpYmjLmYzDpT%2BZbwxxVCeupF3B6ujiS8VDBVjov5cDGNFd1WSCasl1aBUiUZyQmFtVE6FNt1LYW11Ol3FmRTBUxBMIgLpTlWiC7YLyHllGgwuppmZeqCwEUsSMVn0R%2BNhh7unUpBnkhFd1xYmKFvfgnZertB6t37ZfiQBaiXjJ9jDncs%2F8ZXmpXBaXMna9lXfsHR7%2FXyaib6uIjPKb%2BbAKUUvrEiDYEBmook1racg9rBH7mDUEz%2F5JmbzfHPkgjRaj7o7dReL1F7cWCerrJraXVrJmfo3TSOqsZ1WqV0lhwZFCGXdj2uuDuv%2FWRe%2BDc0uPbFyjwfm1DtLtO6sF8Ulb8sHGqu2qWN4OduTNpZefWX%2F4Urw8kx45QIICO%2B1KQziWnwxMr6lVrS99EHdEajm%2FrLDkn1uWSTMQHfGlcqOl0l9HUpyWFIso7W6sbyr9SQWu01ixW8k3a9tG11wpqsE2pPXNKKCW%2FXx7xf2lkCF43KfOu%2FzrLQ0moUx%2F2dZQhM4AM9fs9KOIxZ8e1Ju%2FU4Jm5kGgKxLmfYkkEt9rJYrqWiBMOl%2F0Q3q5Zdbu182UfIE6pQKljbBzXu1rXP4BsMBZCq%2FP73YoZTDBm8TJBjqkAVIawxhu6QYLD%2B7JhZNZw5i5V9E9%2BlGwxOq2x4dm5axAy7zdmRUCAR6KwajDTOLJjK5MzDQbgUHgg3Ybjz5a92U8Ejp6JUMKHHsRf3vulgQ8mvgwc%2BvaY3mqsf4X7yzuI9uLdjSg8GzWf2YePxkzNGsH02BIXe%2FpBnOMj%2FOKWaDJIi%2BIGvy5V0TX7Fes1LTx%2Bew6muBxBzAA11tj6VywhoRnC4RV&X-Amz-Signature=6b0ed63eaa54d1bedb0a87825e2dd1438356afa0de297f15b18e020672448db7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RL6U7BY%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T050110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIEBp5BhgdhnZa1k%2FgH3rkoeLldu8Z0Q2RUXL41kUczAoAiEA%2BAymEQ7Ff7hhHgCL0Rr5xTRBnCaA9RF8RguQkXZkW6sq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDJEbwtYkf3ENVewKSSrcA51zUEexlc%2BpIl%2BXZn4prpo5%2FqVaCZLYVWj%2Fz2njNjc7aMzURv3cr%2BRscINwxKYWuIjGwwSZk0AJnP60V7IkXq4yVLweL1BQkNzthEwvAtNjZranB8zKJBpaZHJqDWUlnO%2FDjX1EIOo7%2FeKOwH47AjtVuTCNdUijI11iEHKVkk0v6eoC%2B87LWbJqQ1FiRzj7wpn%2BDkCYGosOwA6Koj1yyKo9Qmh4b8w5THqS2RWgkYfCHYWh8JBmohWH%2B0aOxLBJpy6PhU%2F4byNvTwTOKb4qjOXicuuqAmIYtzkVRIMpL4EZGc94tijyzX9kz4VlogbV%2BBpdO1uoFg4RicMpqP%2BFlCO4Tg2y8Xk7qxXv85G%2FYYPLGRhQdjdY6M50lBA4S4ajmSGrVwxNKGfqU0HMntYCSZzKJM4wKFVDnfEQduZfIvl5u7uHEsuqSwZqlcauQ1qyzSf40hJceS1%2BZTvtNqEbwg8zmlDUqA1jRs9m73XKWjnXx3VLLBld1PhjTCvhb2IAZc8IzxfO5gAN0b5SWHB%2BSbuY6p3pTOcUlLhEqJjvwZ5lBm9v%2BWV9VuzIOVtFzPY16965nVJ9vVd6kSBdpPrmPOf%2FdW9kMq9bfZfZhI%2BM656sJkSFspYG1aZFL8UoMIGbxMkGOqUBz8bjn8by9nbudVAAtuzB3t1tyHytIgFALrzIhxHeK33TN48w4T%2FLTbpD6pN95lf%2Fswyb%2BaJej7FiuFoV50%2FgLf4Efa%2Fkf66k03DhLfeH6erRaHTgq%2B87UHmtpp8rnYtY51ryfPvofYh%2FQNTX68t8xzdRFch0ZeQZUhqzIBcdwPIpYXWsHGbWM%2B2LcqAQZqT4lul6yKb6vepPfmYhn2w4E%2B5HIlTi&X-Amz-Signature=6a7d7f7c21cb83d87f4ad6e09f9ed044d0035338c99921e891cbea008b3cdcdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RL6U7BY%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T050110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIEBp5BhgdhnZa1k%2FgH3rkoeLldu8Z0Q2RUXL41kUczAoAiEA%2BAymEQ7Ff7hhHgCL0Rr5xTRBnCaA9RF8RguQkXZkW6sq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDJEbwtYkf3ENVewKSSrcA51zUEexlc%2BpIl%2BXZn4prpo5%2FqVaCZLYVWj%2Fz2njNjc7aMzURv3cr%2BRscINwxKYWuIjGwwSZk0AJnP60V7IkXq4yVLweL1BQkNzthEwvAtNjZranB8zKJBpaZHJqDWUlnO%2FDjX1EIOo7%2FeKOwH47AjtVuTCNdUijI11iEHKVkk0v6eoC%2B87LWbJqQ1FiRzj7wpn%2BDkCYGosOwA6Koj1yyKo9Qmh4b8w5THqS2RWgkYfCHYWh8JBmohWH%2B0aOxLBJpy6PhU%2F4byNvTwTOKb4qjOXicuuqAmIYtzkVRIMpL4EZGc94tijyzX9kz4VlogbV%2BBpdO1uoFg4RicMpqP%2BFlCO4Tg2y8Xk7qxXv85G%2FYYPLGRhQdjdY6M50lBA4S4ajmSGrVwxNKGfqU0HMntYCSZzKJM4wKFVDnfEQduZfIvl5u7uHEsuqSwZqlcauQ1qyzSf40hJceS1%2BZTvtNqEbwg8zmlDUqA1jRs9m73XKWjnXx3VLLBld1PhjTCvhb2IAZc8IzxfO5gAN0b5SWHB%2BSbuY6p3pTOcUlLhEqJjvwZ5lBm9v%2BWV9VuzIOVtFzPY16965nVJ9vVd6kSBdpPrmPOf%2FdW9kMq9bfZfZhI%2BM656sJkSFspYG1aZFL8UoMIGbxMkGOqUBz8bjn8by9nbudVAAtuzB3t1tyHytIgFALrzIhxHeK33TN48w4T%2FLTbpD6pN95lf%2Fswyb%2BaJej7FiuFoV50%2FgLf4Efa%2Fkf66k03DhLfeH6erRaHTgq%2B87UHmtpp8rnYtY51ryfPvofYh%2FQNTX68t8xzdRFch0ZeQZUhqzIBcdwPIpYXWsHGbWM%2B2LcqAQZqT4lul6yKb6vepPfmYhn2w4E%2B5HIlTi&X-Amz-Signature=6a7d7f7c21cb83d87f4ad6e09f9ed044d0035338c99921e891cbea008b3cdcdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

