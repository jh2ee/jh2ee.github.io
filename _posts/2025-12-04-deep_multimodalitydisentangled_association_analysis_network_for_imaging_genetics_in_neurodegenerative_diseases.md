---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634CTJJWN%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQC6AJYK2hi1Utf8JPLly3OByi2NMQSiJfXRQWolTzgbowIhALLnW8pqp02vDKQMOqwjk%2FrWJ8ZTNGD8lLr4xNmBLs32KogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz9SNEgKlKKmMAEL8gq3AM%2Bhx%2BNbT53n23VDL705rulYpVFlcAqDN1JMPzDheUVm1OygimW82T96eO8F%2FbOPm07Y8NEydcuYD%2FVI3bH3r%2FpcHoqn340s4RVWABSohiJsf8wz8ZJRpngnibs58VvRSPy5OxkZJ3SLPw3w6ZkSRTnlUKsemWQyrIBnp6A6lF2i9ZNcfC3tS%2Byn5Kmy5%2BNn4wjLLxxDfStbb0JM0q3IhY7HV6nS4tYYM5wKnbvHdFl1NOyltucRQsy6v%2FjxIqfKGfjd2ucP4SOc4mUNoFTI1ceb4UkPPV0%2BnaeNhs%2B3L55LyoYhuPTnKl4QGTJI07kRWZUlkdZnVk2Y72LU3vSp3TvzeNg0%2FBB9ZWbX7RhOa%2FoVnoLuvaQKYVlw3mq2mGqCOiEkB8ygi2hL2IcyK6E0WnPE770RVnrpPqaGvFwvYhvmlQ8OMA8A9ehjALn0SokwmimRA7WgdxyN4DDQPeNz3%2Bf1kXIHO3j68bgKO5KFusi%2F1Qk1V7VwwBWWS%2BSfBx5jef%2FwEH%2BgRdNXA9N%2FB4Jp4FD74bm2El3gMB9WPvwaL9SnPy0tLeOll7W5A68sLnD%2BeDWVBl%2BFEFkOZy8o9f6FOUOFz58ApR3tSx61RktFP5O8VGZlqeHxnd7RkoRhDCuzZjOBjqkAWq8ks%2FzVDdNWTH8ijrT4M%2FmsAC1uiTvVzjuPCqh83lXNb%2BWvqcJuvVQB9LQBaxx1G7YcYw8kcjDfzjeYNSDqC45DaNsV6IiOCBcbkw6SP4ItM6OpMkB5Ybmq50dQaZ9M0P5dhBQVm%2B4vfyTWQbT2yutWzkc4nBaBQe0sKvCOPQrNHAq28APDSH1k0Cl1WyBvGQRUTZeWRZZt6eQrHg4HAxeeXXT&X-Amz-Signature=9fe2ccfb8c7884b8ddaffcb140a18f9e2d42763be8e419137cbac1501b8c7f31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634CTJJWN%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQC6AJYK2hi1Utf8JPLly3OByi2NMQSiJfXRQWolTzgbowIhALLnW8pqp02vDKQMOqwjk%2FrWJ8ZTNGD8lLr4xNmBLs32KogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz9SNEgKlKKmMAEL8gq3AM%2Bhx%2BNbT53n23VDL705rulYpVFlcAqDN1JMPzDheUVm1OygimW82T96eO8F%2FbOPm07Y8NEydcuYD%2FVI3bH3r%2FpcHoqn340s4RVWABSohiJsf8wz8ZJRpngnibs58VvRSPy5OxkZJ3SLPw3w6ZkSRTnlUKsemWQyrIBnp6A6lF2i9ZNcfC3tS%2Byn5Kmy5%2BNn4wjLLxxDfStbb0JM0q3IhY7HV6nS4tYYM5wKnbvHdFl1NOyltucRQsy6v%2FjxIqfKGfjd2ucP4SOc4mUNoFTI1ceb4UkPPV0%2BnaeNhs%2B3L55LyoYhuPTnKl4QGTJI07kRWZUlkdZnVk2Y72LU3vSp3TvzeNg0%2FBB9ZWbX7RhOa%2FoVnoLuvaQKYVlw3mq2mGqCOiEkB8ygi2hL2IcyK6E0WnPE770RVnrpPqaGvFwvYhvmlQ8OMA8A9ehjALn0SokwmimRA7WgdxyN4DDQPeNz3%2Bf1kXIHO3j68bgKO5KFusi%2F1Qk1V7VwwBWWS%2BSfBx5jef%2FwEH%2BgRdNXA9N%2FB4Jp4FD74bm2El3gMB9WPvwaL9SnPy0tLeOll7W5A68sLnD%2BeDWVBl%2BFEFkOZy8o9f6FOUOFz58ApR3tSx61RktFP5O8VGZlqeHxnd7RkoRhDCuzZjOBjqkAWq8ks%2FzVDdNWTH8ijrT4M%2FmsAC1uiTvVzjuPCqh83lXNb%2BWvqcJuvVQB9LQBaxx1G7YcYw8kcjDfzjeYNSDqC45DaNsV6IiOCBcbkw6SP4ItM6OpMkB5Ybmq50dQaZ9M0P5dhBQVm%2B4vfyTWQbT2yutWzkc4nBaBQe0sKvCOPQrNHAq28APDSH1k0Cl1WyBvGQRUTZeWRZZt6eQrHg4HAxeeXXT&X-Amz-Signature=9fe2ccfb8c7884b8ddaffcb140a18f9e2d42763be8e419137cbac1501b8c7f31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKEIPJDL%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQDBva5Vv5HOdO0Z5hyJSb6lxNTvtwbxGv1IzIBr6L3ZlQIhAL%2BaYpiDmJcfTKA7ZS6JrJHBlTjP6YBCVaeqUu6Ewzj8KogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxzvm7kDyZx1vdCavYq3AOBIzxLfxCOIyuDuuMo9gQVmHUdkcTNiJeuQh7W90dWGE2XOO7VcxpAfeoDAGzi71UrikaVNlc5tKqvUsZhykhMpyi6QPIMs3Fm6ffLayC7YyL7Q0CURvXfov1KDn1%2BdXYK4aY4cbE8zX5ZdVl1sdpyf%2FHaYj70kntRtLq0w8f6SOvfIbkK814kQs95p6LHhgjoXJWTXyUNeogU4Bk%2Bmh%2BvIW%2BQQjTF1bsfY6%2FkZR7hTAD6gEGXJG2tUzKPrbQsYzKhdiYJoOi84hQ4G8h2pyixCYcSBzcMqcSza2BDzRw3yZfM651gE23fP6VW8PmdrzM%2BV3BWfNXTqSe0rvXjedG63AvVg%2B0rtIVGteJWllscUPgyr3PtbsKBRDfpI2X2XB4FRvySY6cnQfyxEhgXRxL7bWnCACkcQFIKg5L5dsjG%2BKUgDpkHJ1BmT%2BB%2B4TOHq0H7aZYvDwzepzkhwPAFMmlHsFNcFMfvm0Xxus%2BI1mUocwlOcSG6s6v4bQ26d%2B%2F1KfNpJhLi9V6nvMYtzMn6X%2F0V2qlBUBRVkh9Nz4fMQBSkvFQP4u3QiQ3FAGy2Zi4eMYzwbAAlLt0C2biZGwRBS%2FB627Fx5Q6wWTpQXhhdBIM6yy2zw1BoIrsctQPK%2BTDpzZjOBjqkAS1bwnxOgrfg7xoXz%2BbuhkkGDmkatd%2Bz4ihc5nlyDk8bObzJ0HJawiQnDzlDrFsvtmNPCNlGjbgVJ4jbcH%2Bk7shMBVxN61Bl21Zd1vlWqSc13v7qXJJ%2B8Cvw%2Bqx7j3J5t%2BVgu3aiILoEu4zpTeRIAauTdV4bqJeYEtLZ%2BqOwAiaBYcmq5e%2Bx0KUGnrQLLDmG4RavBNIrnOBC%2B7tYqV1QKknqeHjM&X-Amz-Signature=088d571f07d6d87e771785032f1314c62f68bd6e7d3bdec2708c4cea4ac2262a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBVYLCH4%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQDYakhFGpq%2BMVyxK%2Fl7qZHSVT9ESwWYpvXEu63UFy0FvAIgBk8h8HPFDiosEkrGbWyfe8voGXef35jIgpBhLQ%2B%2B11QqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMk0rZcHP73KfWHMPCrcAy95IZznGi9DLFJMCIKNgvdoOGyB0SzKNCAY9iGiUVo4GrvT8oIZlI8qBPEBS1IuLjsbbM59KdpLwvst7yrxHKXchlcE1S9MNTXvLmmoQFlqj2GhQ4Mv2ChoKnWkHAD3SHmhNzzB0IXoAoq4khIbwvVGX3wG%2FDdP3KoxrqooTF2ft2pUlER46dDoOTqgSg1PMohBozWargaNwQ8BqXi0JiNPKK1zq9hZRzGZI%2BuiKDGWAW4ifyypUNDCQwQjO1C9c%2FkJHBfdCF8zWzwGHmKT76ed%2B8Pr0YlvP5gWL9jRzZ45WBEdp98wnUUeC2o%2BGNHIAp6alQKBUhZDqJ45%2BcjV0ug9ylesFP9PdR9zVO6Pm%2BU0C%2FacMmaBlB2ypPCSEncs%2BwEMbbkTW6BytkzNvbQTkmVVi8gFbj8Q8mNqIf%2FhHDWnjxaYfOjyjHI6zQU%2FcJaEn%2FK9q%2F9o5nrT%2Fdl%2BNlaTrKCmDuHBlmJ4bYOvwVCHam2LSkNx%2B0GuYCSZAqSPOBs3oWWoSBdOiwgotvtP4USWxJ7cNkL%2FUVyNBuZIAXCrF1kuj87HVb90%2BzmqVveS4TO%2FaZzm3q1oonGGK3W%2FnOh3DY45bJPOecve9IaePG7617vW8jQTn1VXexSHFGntMJvOmM4GOqUBXoTfh3NlR%2FpJiYfxo5DhORH9v1Nv2aGGN9%2BWUSfoKVUwSSo8z8sO2MTdXUg96G1YKuB73lrNgAIRahEh%2FdlrE%2BoyH8bvAYLswhv%2B6RQMRrnwWQ%2FhdEISSkZRF15Wtg2LXAEACysi74AjibyCRBYVk0rNBjqxWZ8aV7rIhOeoecKCy72B%2F1C2SOUnU1E%2FFippWjHMMXDAwOKwPpnfsDILg%2F01x9m5&X-Amz-Signature=686bab8066be6c3daf5fc1c38b066345533b1cee3cfd114eacc25fef12241f30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBVYLCH4%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQDYakhFGpq%2BMVyxK%2Fl7qZHSVT9ESwWYpvXEu63UFy0FvAIgBk8h8HPFDiosEkrGbWyfe8voGXef35jIgpBhLQ%2B%2B11QqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMk0rZcHP73KfWHMPCrcAy95IZznGi9DLFJMCIKNgvdoOGyB0SzKNCAY9iGiUVo4GrvT8oIZlI8qBPEBS1IuLjsbbM59KdpLwvst7yrxHKXchlcE1S9MNTXvLmmoQFlqj2GhQ4Mv2ChoKnWkHAD3SHmhNzzB0IXoAoq4khIbwvVGX3wG%2FDdP3KoxrqooTF2ft2pUlER46dDoOTqgSg1PMohBozWargaNwQ8BqXi0JiNPKK1zq9hZRzGZI%2BuiKDGWAW4ifyypUNDCQwQjO1C9c%2FkJHBfdCF8zWzwGHmKT76ed%2B8Pr0YlvP5gWL9jRzZ45WBEdp98wnUUeC2o%2BGNHIAp6alQKBUhZDqJ45%2BcjV0ug9ylesFP9PdR9zVO6Pm%2BU0C%2FacMmaBlB2ypPCSEncs%2BwEMbbkTW6BytkzNvbQTkmVVi8gFbj8Q8mNqIf%2FhHDWnjxaYfOjyjHI6zQU%2FcJaEn%2FK9q%2F9o5nrT%2Fdl%2BNlaTrKCmDuHBlmJ4bYOvwVCHam2LSkNx%2B0GuYCSZAqSPOBs3oWWoSBdOiwgotvtP4USWxJ7cNkL%2FUVyNBuZIAXCrF1kuj87HVb90%2BzmqVveS4TO%2FaZzm3q1oonGGK3W%2FnOh3DY45bJPOecve9IaePG7617vW8jQTn1VXexSHFGntMJvOmM4GOqUBXoTfh3NlR%2FpJiYfxo5DhORH9v1Nv2aGGN9%2BWUSfoKVUwSSo8z8sO2MTdXUg96G1YKuB73lrNgAIRahEh%2FdlrE%2BoyH8bvAYLswhv%2B6RQMRrnwWQ%2FhdEISSkZRF15Wtg2LXAEACysi74AjibyCRBYVk0rNBjqxWZ8aV7rIhOeoecKCy72B%2F1C2SOUnU1E%2FFippWjHMMXDAwOKwPpnfsDILg%2F01x9m5&X-Amz-Signature=f6b4c237b3f6cbdd2afc62375ef912a9fd1585415ba8a197c48410d56e488a80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624F6YRFF%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQDKeZV%2FSJqEXXWd6ocjZLW7Bnn9%2Bv%2BAO5UyRPb9JymElAIgCO6O5YtF1EzBP2pbrVEtslOztTD4h050luyIU6FdDHYqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFdngNCuGUajVzokmCrcA3yFHBCi8uyrQkMbFhGBHShbav3tT06s5EwWBPkTn%2FmgU7KqxqyQdtJM54ZiJQkuGHQHSSWEJssxwgDLyWqTcR%2FwbDMZTD0hJ5bzW7DhUyaGfiDPxiux1yoXgc%2FDkuVWi9XjIJB3CeUe%2FJyQhUs5%2FB4mzMxkuEVMdbfuPDqUqNka7m3AfPv4DSjUsCP0uzZfwU5ofube%2BxZLyEoypfn16B4YPrl5z7o9LMnCFnqCyRCjiuvo8O2R6qnshDWIxYn91SaBQZoWucASaC1aFzCpwlwbSNBDty990KZiZbeR1izrHEPNMUn9Ch6CxWbRhscxU%2FKqp54kKgXUXpFVAGlh7%2F%2B3IoMCxj84Kur30lzZ3OD4i90N6z8jHSDvRM4WYfDiM76GAAgCf5Kca1Hv72pxjbjGV7k6HSMIzTYzRjjN0ICDKx1eU2Ya4ZaSLyydvpuFpTW7yv4xGXnfIJn6QDFRR7vmbxm2HllQTahR%2FWKjsT%2F6mUNYnCn5adIsRKYBCVOHy5eWgFd1R5uVmcFGIfMMn7puxVxWW5i4XoeMEW0EYNMM6JWVkBnrY6axt3mR8Qt4OHN4Qw10g%2F2DvlxT9TJ51l%2BAzlvBkuDUODhzd4vk%2B%2F3dAdTNQlfPicMTouGbMI%2FOmM4GOqUBW26WHN6FL7ZSWWVIEf7IWo4YIwqCMRZCEIbsJg3pK9Ag3EVVy5jVifXSX3rSlm%2FeJ%2FYEEoZoBJFjdyuGXU3JdBDVwml2Fx%2FZovjR8Mpy4WCgsxO%2FxMJ2vAQmhevDyqKoXUyEYtYyZHu0uUpvSg0TgEYY3GLF6SmvNoPxoPbMz4XRRtGrBo0Z0ZPEXjK%2B8auNRVFGNHRWNQC77H4HBV9QhFN%2FKswK&X-Amz-Signature=2ea5823a889cc0891ae40c059df6a1d3617cc5de72fdde812c666bd530f36ed7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YK7L3FT4%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQDaZfWcTO3XfriCyuSridFY6RYUTzUwD7jXlsU4yhRoNgIgGNglFVuhBsXvuBXFruEem8Rg%2F3sFs%2BWd5vCcqtR%2F7qYqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCyQ42fwE1pb7mi8hCrcA5ZdEFhZDdwga2nuLbFLUqFJDSQhcicv4T1z1zedW%2FPLY4EFCqg%2BpWsy56VX9dW2DOMj3BYG1iM1TgMAQlcdq2A7Xtamj28QIom11EVLGdWH219MIRUOY3cmeNpfJ7wewMtvtXBPg1blWF9WrKkyrO2vnDIiHeuNDPp8NvlyTDmVrcDKjwdqqcCxVnyOk2W0GbHb8CUDqs7MLHgSJMYrrAosOzABFGM4il0u7Y0WowtyGvbtMLcSFHtSFyEXTflrDZXf0ehcFprM0Z%2BcqBpH%2BIi0MaR8q1nTjbguy9B%2ByLqCtGS926qXSIXRh4mh8iuMQ%2BN7%2ByHklhDhwcUT2xviS%2BeQ%2FAbKTp1CFCogTt913uxjv6Nq8urtGQKlvfYmAx4q9f1mKmgIsBUNdIMB8JUxRXykOMJ5HtAExGx7xD3HxVYhEaol2MP7%2Bl9%2F%2FIizZpUZaOC6QkQ3lRcpNCb1VaYiZ22djiVb%2B8eE%2BOhdJzUY2rA9dGRGKmrI8X8guKD6FhGMvN51Qca3VyHGNurEs0AEWaieKdOGmWdMHdi0EllWx%2ByB5pNKAt%2BRCaPkZvA%2Br4s1yg2F7bz%2FS%2FHd3QnzOjc8ilZFSXifQlx1VwU6%2FZrJtCE%2BL8DEqsyedL8vAYv7MJTNmM4GOqUB%2FVdnnmkhZxNrN0CKyNxT%2F7pxTLVWr5OXoTr7FxVWHJStowkZhJEysqNjdhEEkz%2FIUXRLIjnJgV%2B%2B019KEQnV8I98UWLknwCnaPA6Y9Xm3cqsiIEqLndGYpDpbrKoKi7Y3FC%2BuJGHClEG0Uj5Jvqkx9hYaiJH7dSW2FxTZo%2BOlHYH7u%2FKXzQzk4q%2Fw3uac3ODZarlK01zj%2FWp799S8OBBDs58BgGU&X-Amz-Signature=a5c24ae6d64f554f524d35d54dbc335b83cb2fa0c28ba53019934b5b77cecfa7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z34TQ43S%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCFFOOcV4kHHGzbc2O7R1m96xh%2BrQaVfwgb%2FWPMOi8TBwIhAJ88omHPI%2Bl%2Bo%2FeOrHwAji39q6iTBDlteORbjk66W1%2F2KogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgznFO8gT6VeleAsq4cq3AP8MKaZO3htfkfY2K%2FDsFSunD7%2F0bJs6EliBl%2Fb1CAsHTZfq%2Blde8bIc22tD4cs2PAMhD5PWu0CWOo1%2FIYjk%2Fu1I%2F%2BJdi55QmDu3biySQTJPpO77AnsDgu66z0FdbnvekP2zWqZSdQxxFdvcvRa1BeqsGQjJKKDMKtZgE9wtfWqvJI8vSKK5037VW4oaiyIvANZKiDrbkJmAK0MEWE%2BgGfvCBvE9Gm6Xqo%2BHlVLKeWegXldqiudGzVngsxiXX0ae95r6Z7QizJsc%2Fh40BryJSmvVAG8Z5x8ZxnJd3SJx1RuOz67Vg6Oc6nS2zok3%2BdxNftDOqsDv2RLPDXHz%2Ftxxcy6ywLA4e2NJqQXZyaDzQI8W6NUNscB0j3u0oAvMg%2FiVZBOcgx%2FwgWBMlaZbKsdUoQkWaKkE4l8fk8RGLrjbrjJVzvCwsV3U9K7PtcJ5RJyGxFzE%2BwENiFeniY4aS4blcz7rjrNtLy%2F7SAYhpGOIVvIe4XW3BnvTXwUE2t%2B2gpq%2F6AiepV2sMtBaijo8rPvwmAVB9nGzWodr1%2BQ8l2yUO0cTFsiRT6senrqjBUyxy13gCHG0i34h%2BBzsqIQmjXuVrJCrsLIPHsuFFqUyD5aUF1u6XjIgJ8SjsV2mSeoaTCTzZjOBjqkAZTgYGfmGKHIe668QW60wqE5OQ3b4B2VxTFObLzSlI9I8OexEel%2F%2FIvz00fsNKHafYoTzOOV3evhc9YmhGpfRVSwLqQrr0c3ustd5lWL8ciowpRlavlg7wPQXViTyLhSvAZfz5ObXN9fZsXt1BrBELTxn3CnbfqRXXDRfvYb7J9w9qGB5IojaJYTp51cIwYivtrpJuRH4sh1lzwoi4CR2doMGwpk&X-Amz-Signature=893e5c28ecfab752ff89c001e5701839b21e1e657d0fa0cf00f356a3b9a4969d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BLTCZ64%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIGkQqAMkB4qgBVGhzAtl7g0gNKQsIjtIGBiJA0bHP%2FYDAiEA5h%2BpxgNlWUrtX6SKtxbtJR1lzHZSxpc8rNa5G2SyTScqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPhkFH8OeJOiNLy70CrcA0bpOJpFGwEcRSxtlCt22LzebLCney88cDic7xzKAS7oXVfu%2FbLDSgo7tnJxjs7QR%2BOoHTkFCm0mHNraJViq091C02wUS%2B91ahsqzSukgbbqE4C%2F%2FZOk%2BHYbgPPg7mwXnwtouC1zzGioyoNCcmIEogvG4SYGsE8dw739xLRQuKOHCs7i4y8ioT%2Fuj4MgI%2BaC0q7d%2FHfsQkkXL96vGTiNNkPDuHOqzN0xsTXRq02ZFxOMao39%2FzR0Xf1jdJyGbGXf5U7WGAFlkgRPyLfHiouGwaQfU6I9wHf7OeNlxiqd%2BpemjvvSI2u9RfZbSQs31ybPSpYa74gOcuLtyh33ezIaLNbQQfttC4LSv49%2BCEXanB%2Fg2cWk%2BTZr%2BU3ZsbX66NNRt4B2oZu7mvIi2nZWmSHNDoOqwrzCTSOr83zrIgXPWw5Q5MOjwYKcvSgSyn%2FCnN6FqNDDwM8ry0e8QgV83vF4brTFWF25mtj8jQgT13SqsS5%2BXgAP7sN3PrPkMcNrvyAogCieXMvI0hCCs1uJLgoOTZV33lOqLt51wBgmq6uu5m%2FULP1aeMMDvTXOecePP%2BVip%2BnZzLejesMeqX%2FrEYiWt2cST9QSISwQzUyAStQiV%2B2KWBIcOXWHR%2F%2B5Pk5gMP3NmM4GOqUBKkSnGYJBW2iov14CqwrQWRYUwEqgxo%2F8G4B3bfvW15c6%2BsdmtV0a5Dca16wzqMD3cpyr%2FL4PjjaQcGjOA%2BUoqRdpl8b5hgA0zSymE53jeJ%2FH%2FohRG9r0pmr8h7GAj3DB%2BCatvQstrAO48c2SI4omb1%2BpngvBUWiJWLRX%2FH%2F3TDXlwDp9N1mY1DjGFCfoaMIH7kLjYYJGwj4muoebOm4cYE78ZrCM&X-Amz-Signature=e04bf9ec93259c136f295b1a1ebfd30c4dbd3d0e9c4bf22b8f7870785302b917&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BLTCZ64%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIGkQqAMkB4qgBVGhzAtl7g0gNKQsIjtIGBiJA0bHP%2FYDAiEA5h%2BpxgNlWUrtX6SKtxbtJR1lzHZSxpc8rNa5G2SyTScqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPhkFH8OeJOiNLy70CrcA0bpOJpFGwEcRSxtlCt22LzebLCney88cDic7xzKAS7oXVfu%2FbLDSgo7tnJxjs7QR%2BOoHTkFCm0mHNraJViq091C02wUS%2B91ahsqzSukgbbqE4C%2F%2FZOk%2BHYbgPPg7mwXnwtouC1zzGioyoNCcmIEogvG4SYGsE8dw739xLRQuKOHCs7i4y8ioT%2Fuj4MgI%2BaC0q7d%2FHfsQkkXL96vGTiNNkPDuHOqzN0xsTXRq02ZFxOMao39%2FzR0Xf1jdJyGbGXf5U7WGAFlkgRPyLfHiouGwaQfU6I9wHf7OeNlxiqd%2BpemjvvSI2u9RfZbSQs31ybPSpYa74gOcuLtyh33ezIaLNbQQfttC4LSv49%2BCEXanB%2Fg2cWk%2BTZr%2BU3ZsbX66NNRt4B2oZu7mvIi2nZWmSHNDoOqwrzCTSOr83zrIgXPWw5Q5MOjwYKcvSgSyn%2FCnN6FqNDDwM8ry0e8QgV83vF4brTFWF25mtj8jQgT13SqsS5%2BXgAP7sN3PrPkMcNrvyAogCieXMvI0hCCs1uJLgoOTZV33lOqLt51wBgmq6uu5m%2FULP1aeMMDvTXOecePP%2BVip%2BnZzLejesMeqX%2FrEYiWt2cST9QSISwQzUyAStQiV%2B2KWBIcOXWHR%2F%2B5Pk5gMP3NmM4GOqUBKkSnGYJBW2iov14CqwrQWRYUwEqgxo%2F8G4B3bfvW15c6%2BsdmtV0a5Dca16wzqMD3cpyr%2FL4PjjaQcGjOA%2BUoqRdpl8b5hgA0zSymE53jeJ%2FH%2FohRG9r0pmr8h7GAj3DB%2BCatvQstrAO48c2SI4omb1%2BpngvBUWiJWLRX%2FH%2F3TDXlwDp9N1mY1DjGFCfoaMIH7kLjYYJGwj4muoebOm4cYE78ZrCM&X-Amz-Signature=e1ee86a22d32b591e8d6911b4bdcc2dbcab27a4a5818f93e75e2f1e4b38534a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HFKYPIY%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCID1woUYVqBt1eigGjTEg0w6B86%2BY0xLyJYz9D%2BlqJf3tAiAx0V8bnngJzgQ%2BCvZmAfuy3UxOC4UbW7fhTH9eusze3iqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoVzCe4hOdZKfhEG6KtwDsj6xOn6wh5L3BvAohBttK66g5C6gswYQ5iqe5t7G59FA%2FnUfZehQQo6pihJKF6z3gQnumCyg%2BR6OLWo2Pv3GWzS%2BuX7KkvDnxWZS8xUDH1FcVdAXK3OVvozlUWaqJ2fwG04RUCkXzyqDsFdycsixHoPnNzPagp2UmhZ08Ma%2FCGms30FIX2Zdkuujpvwy%2FLe04aU%2FUvbJPq6Nw4GXzDGJTQEymd388Zkh%2B21Nyg2PjEbL47sfTENdLZWad7MDqtz3vCUzyDu5XOzYlzOgcon%2F0j9M6xfXC5Avo4EXQ9mURZBqxG4P1YbQ%2FllskatVVKbXkD9%2Fr9GZJSy7oJjDOYgza2oVZ61svW9lX1QfdE0kCXkSkB6ymiBzyr2qbbAfGI54RcSACzPBqbCOVO3%2BBEo1O%2BuAboLK105EfQwcokc44Vrjc%2FyXv3yOL0yA6NDWfVNfizfoa6UqNoqxp3PYOxZOs6WySiYoCgSy%2BoFcB6PGKQwPzivjsYmS%2FMdXIxEUFg69igQ6tcofE1fTvR%2FfCpl%2BPk3q%2BztkAfnKjkLH7PXKN%2FYjqzcCNeKcWxgiyW6Z1%2FH3QVPP6pEQwp8qXCfMQ8pQMW7uAoBlzprb1o9TP6raWEfyLOl9h3DhxufB9Tcw9s2YzgY6pgGwr7%2FvztPz3FXtm5HFpfsiG6cGhYewlPic%2BgxrY9b2uHuk3mxYJ450ff%2FiR%2Bth1hesUI1VKh9p4%2Ff1olm%2BaTEDz6m9%2BHJXMarLFSHHcd9uhHR1Ko0O75KhmuIQWZTOmenJtUbO5uVqQYqfJTYXHDK432n1pvdZJ9lvOvF7YuLbSdSpBQGvxj0GygXxuEovdLe6b3nhy5f9k9NbgeS7mkFyC0%2B8bY1l&X-Amz-Signature=6de7a74465db3dbad522d9dcd8ac3f600a29b1221fb7d033160a5219ef90be16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBAFGHR6%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCuNgGhA%2BpGFQ7u1kTUqsfKpAlgVkNnTL8hAMRSIkoKmAIhAL%2FDAm1C%2Frh3z7sy7r%2Fy9lfgoAKifdX22iy6mFx%2FcgonKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzn3f55fSK18roQWLAq3AOJVMoZ8Ezh5sAN35MHY45PtBT%2FvSLAmowgJjdLqi6lNk6jgR6FYuNd%2BQydmNSgK3p%2BzFK%2FQTKzNuu8zuvOB9ExAp5HWA9P2CDIzsydsfht8XFxy%2BRqtWcT0ZPzoMr0xqstDuvdYN7MZk0aO48e4Wne%2Bs5pQiXk6V9YbwTlryiFvGA7AKjZlxNM8um9Pds4qkjBdR%2BW%2F%2BWrxLTsMrsuUXHXbfFpcdwiWwdgCmn1CFsjX7yzRT1OdSt4aJ2Fm13w9jOn9ACBedC9%2BflcFBf9lqpfzkUCnOCAlZcB9n6Ls%2FSyCyRxYTbSOV%2Fq%2BPbxXNHWzZfMKT5HQeUu8KYOQuWbOtPHHKODjGyDUjRUsn0opEgSC5FPROTC27t6Q3kXMUy%2FjGmnbOZvcweLbuW0kPgBzp90%2BAjYgoPSRbfh0MvfANkckadWJ%2FeBSMju0QGS6FpomLTvs%2BHhlyOlRltceGtbnb9Gf41yX2bqzEEkDSBlVUPJzDH6%2FNTWbD2OKXyMfY3e4xyRbv83P83XH3IgllPItwBGL3UnCXO8e7O0tn91uoXDHnwyN3IW6OlBTh7CM2U3eI%2FelAkW3oyifYmhDHoBga2PFc3onz0514oGEIc4yqp7CJ7y5h4dSRFR2DNXYjCMzZjOBjqkAbtoe8d4FLBmAW1BJRTxVfxgk%2F9wXGZvBSl55jDfrz2Bo1UmUPy2dPGiwrXSYljBH1o4fgUh2sXOjY0ujPmVe%2F23GDyXXp4IQznM6hr3S1FHj2gkj8vmvC46YIb7VyRzRP26XMmNCo62vP4Pkk%2BF6W5RvVY17y2QnokOivTNT7mg69gXpaJnX%2Fwbg%2FR8pVdoqdcqsBQSpouiH6QxTuVRPX%2FYM6dX&X-Amz-Signature=d968457f3797442d8bb007b9a12af7e556cab979a7180329bd959db60e1ef866&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBAFGHR6%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCuNgGhA%2BpGFQ7u1kTUqsfKpAlgVkNnTL8hAMRSIkoKmAIhAL%2FDAm1C%2Frh3z7sy7r%2Fy9lfgoAKifdX22iy6mFx%2FcgonKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzn3f55fSK18roQWLAq3AOJVMoZ8Ezh5sAN35MHY45PtBT%2FvSLAmowgJjdLqi6lNk6jgR6FYuNd%2BQydmNSgK3p%2BzFK%2FQTKzNuu8zuvOB9ExAp5HWA9P2CDIzsydsfht8XFxy%2BRqtWcT0ZPzoMr0xqstDuvdYN7MZk0aO48e4Wne%2Bs5pQiXk6V9YbwTlryiFvGA7AKjZlxNM8um9Pds4qkjBdR%2BW%2F%2BWrxLTsMrsuUXHXbfFpcdwiWwdgCmn1CFsjX7yzRT1OdSt4aJ2Fm13w9jOn9ACBedC9%2BflcFBf9lqpfzkUCnOCAlZcB9n6Ls%2FSyCyRxYTbSOV%2Fq%2BPbxXNHWzZfMKT5HQeUu8KYOQuWbOtPHHKODjGyDUjRUsn0opEgSC5FPROTC27t6Q3kXMUy%2FjGmnbOZvcweLbuW0kPgBzp90%2BAjYgoPSRbfh0MvfANkckadWJ%2FeBSMju0QGS6FpomLTvs%2BHhlyOlRltceGtbnb9Gf41yX2bqzEEkDSBlVUPJzDH6%2FNTWbD2OKXyMfY3e4xyRbv83P83XH3IgllPItwBGL3UnCXO8e7O0tn91uoXDHnwyN3IW6OlBTh7CM2U3eI%2FelAkW3oyifYmhDHoBga2PFc3onz0514oGEIc4yqp7CJ7y5h4dSRFR2DNXYjCMzZjOBjqkAbtoe8d4FLBmAW1BJRTxVfxgk%2F9wXGZvBSl55jDfrz2Bo1UmUPy2dPGiwrXSYljBH1o4fgUh2sXOjY0ujPmVe%2F23GDyXXp4IQznM6hr3S1FHj2gkj8vmvC46YIb7VyRzRP26XMmNCo62vP4Pkk%2BF6W5RvVY17y2QnokOivTNT7mg69gXpaJnX%2Fwbg%2FR8pVdoqdcqsBQSpouiH6QxTuVRPX%2FYM6dX&X-Amz-Signature=d968457f3797442d8bb007b9a12af7e556cab979a7180329bd959db60e1ef866&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XGFGNRR%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T074949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQCPtF41tZM2f09Zu7CNxuSkT7ONBUDNRELT30g%2BtWrTYQIgOreqGOdb5BkXAd5pr6miFlo1geiy9WaPYuYZWDvPX1sqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH6g1BVA5LhDrgxK3CrcA2K0E1LYSjiTZDCBESFO5PeqOzNJ5cCpJ%2BOYfVEP4y6EdSLic3xm%2BY%2Bacp5StT1D5W8dRk9a2LI%2Fgo6JfNis8VqUcDhjWijtWbHyd18tqrv4tiBEeJX32m%2BHESdz%2BRiz2Op1zQJqWgWOir5MpGu7zxK%2BfJHk8J5hpKgJROavDKipbaxuJNqokUpxBTwshGxH6OEBh8el4ZdE8tVYL0HjAUsVejHeJx3fURxt9seVakumFN4%2BGD9vK2hzMzYz1ViClwEn9OspBLEtjDoBDaFgRhrbx%2FFhG7PR8b9wcqr0GTEVQ30MmYGZMRk6cBtgIsPvqMsbRpVAVnU%2BKPUQdCXDJl9egBTohpqWnv9IZ5SQK4BSJfJuEmWSLiRR2mCu313eP6sXok5D9gs0xSm29LTgLRu5YxtUXGUX4%2FpSmLvekNMvwBPK84a8dVZ7YGsdYU%2Bx6K8h39uykQnDR9IhkEs%2BJ1nzProEI9Ax6e6YTaphluAlaYYhGcoazgRAxRlCGZ3JuKlchBzRcYYlGolB%2BB68DPcX%2FRbwbQr2GqQmw2PsM6Yhx3paMAhKIaVd%2F9Om8VjkFeecrscnCYm9d5Ff5TS4PQnmFmdAXdEAO0RqzODnGsbkvk1Tj%2FAHtq5mu%2FxeMN3NmM4GOqUB2h7GmWlKhKIFWGnfAljuJa1zmJ0do6IYKX2i7Qd4HOTHzhTXxbJw3qfAqBxMYD7Cvk7fELkLNq8gKwHB8ShXtNd1XNH%2BN%2B4lSgvVKtGMQRtuv3%2BNijsC4QuSvuOuZ39WX2l%2BSmrq1QB80Ge3X3oExXPHBxDEywxKisnBHcCbvUDQ4nFntdktPX%2BJUrewviLaCA1dQCs7ykfsFagnSbP2sy7dq%2BAy&X-Amz-Signature=f9af95a5bad3b6763911e60946edc49d6752cd5f6fe95d0c5d3e1dba8e38ec61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

