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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NXR7LSU%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDtzjaSJPX8PtYuL54Q7Z1I9Vq3ipFWL%2FW4bdzVUL90NwIhAP6gI34FJUAIrXkHTAHHU%2FjmQJkmV1w3UHRZouiJlw14Kv8DCGgQABoMNjM3NDIzMTgzODA1Igw4Lq6q6wbp1gSfx9sq3AN8ZJd9fKv1wH4ASmEQU%2BPr3R28DSbXniM0PnFTKVbpWrz0AKE4RvTDuxDlVN8jGZOGHTXVigWFDSD5IMweBQGiR14WHB88VZzuxulrc5XfX4HWIxeBK8dIUlTm8Ow404ygQh0hSdzB46iuIsE2AQFpVIhEG8yXMD0azhZo7tcZUEcOeAJJ%2FmxZ1fujod9dIGiKwEvuIOZn9kkLeM%2FOVMnwr7H1mkjR8dOIJOBhRDlLakoiRwnzVVPeCCU7QA7NF%2BWuQ0OVTcYPDiYKuGzkCwDMvGgE724WELLS6Pc15WzAt0amQ%2BURR4G%2BNssnCZ8CArBgMovi%2FqlZ8UPL2IyOZsig8eDS5EZLmHw8pCI3%2Blax9sE%2BjEidDnvLeyBETCx6HB4UqVsemnVYZGBlHu4XvKEqOWsETMlCnZLjPW1WLgTOjh73MNhTfDOUp5LytIIhohWhsJTY6W3kOwIaT3lCgmXZMAq%2B9eCctEOvHgiZxvRpwOpCsvDve3LRovRwvIeQ%2FZZSh156ZRE9%2Bmmw%2Fxe7HivFY5m3k%2BZcEkR5qEPQNpuItFb6vchyDWfFuVtHY3xOoKeyHSJx3EkvgHaAdnwOnRoThOIMBy7%2FxRkGKcQMP4Ow7HfoZhGgHqyoQO403TCZ4sfNBjqkAev9gHLMH3DJYEQeeTdnAW8FLxJJnrhybONkIVtU1ZC%2BztsDWSEUxfD9tUiCs%2FrSK%2FjcdYNB8vu680dOdS5jhdglrDA%2FjyHf%2BxIl6f%2BYI8jNSWbdFe0%2FmCtiV0J76%2Bj9T2pFw4bmbB5Vx6Pm3zcz00UECuWEpaNq3snvDQ8UobLHitLimBVYzryvh0GmLZEp5fWhztw6UnKajEUaKqDYExcxp0Jg&X-Amz-Signature=3f1ec15f5266bb61b88ac02fbd6512b720d67306d90f218653cb95f68c5d6b62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NXR7LSU%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDtzjaSJPX8PtYuL54Q7Z1I9Vq3ipFWL%2FW4bdzVUL90NwIhAP6gI34FJUAIrXkHTAHHU%2FjmQJkmV1w3UHRZouiJlw14Kv8DCGgQABoMNjM3NDIzMTgzODA1Igw4Lq6q6wbp1gSfx9sq3AN8ZJd9fKv1wH4ASmEQU%2BPr3R28DSbXniM0PnFTKVbpWrz0AKE4RvTDuxDlVN8jGZOGHTXVigWFDSD5IMweBQGiR14WHB88VZzuxulrc5XfX4HWIxeBK8dIUlTm8Ow404ygQh0hSdzB46iuIsE2AQFpVIhEG8yXMD0azhZo7tcZUEcOeAJJ%2FmxZ1fujod9dIGiKwEvuIOZn9kkLeM%2FOVMnwr7H1mkjR8dOIJOBhRDlLakoiRwnzVVPeCCU7QA7NF%2BWuQ0OVTcYPDiYKuGzkCwDMvGgE724WELLS6Pc15WzAt0amQ%2BURR4G%2BNssnCZ8CArBgMovi%2FqlZ8UPL2IyOZsig8eDS5EZLmHw8pCI3%2Blax9sE%2BjEidDnvLeyBETCx6HB4UqVsemnVYZGBlHu4XvKEqOWsETMlCnZLjPW1WLgTOjh73MNhTfDOUp5LytIIhohWhsJTY6W3kOwIaT3lCgmXZMAq%2B9eCctEOvHgiZxvRpwOpCsvDve3LRovRwvIeQ%2FZZSh156ZRE9%2Bmmw%2Fxe7HivFY5m3k%2BZcEkR5qEPQNpuItFb6vchyDWfFuVtHY3xOoKeyHSJx3EkvgHaAdnwOnRoThOIMBy7%2FxRkGKcQMP4Ow7HfoZhGgHqyoQO403TCZ4sfNBjqkAev9gHLMH3DJYEQeeTdnAW8FLxJJnrhybONkIVtU1ZC%2BztsDWSEUxfD9tUiCs%2FrSK%2FjcdYNB8vu680dOdS5jhdglrDA%2FjyHf%2BxIl6f%2BYI8jNSWbdFe0%2FmCtiV0J76%2Bj9T2pFw4bmbB5Vx6Pm3zcz00UECuWEpaNq3snvDQ8UobLHitLimBVYzryvh0GmLZEp5fWhztw6UnKajEUaKqDYExcxp0Jg&X-Amz-Signature=3f1ec15f5266bb61b88ac02fbd6512b720d67306d90f218653cb95f68c5d6b62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4QLS7VC%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBSme%2BDn%2Bo93rqBQDsv4UjNs0%2BeIYPO2j3fCEDxV%2B3lYAiEAtCPcj6Y%2F265Q2HCBHuH3IZed83X3jkFmZYN2XCaaltkq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDI2VyDIvKhJ9%2FlQKtyrcAwX3AL%2FQEHOhNE0TzgIeKXTWknuE1rmanZdb3SfY0LQz3NuCQVOfMfaEjfcPTyQEpB49uyCqAJG0qvvya1W0144xfSVD5wCSICH3tE%2FLGZWfDs7UbVv9N%2BqP%2BA6U02J8ENYr1qGP3yPJYRYrb0ng%2B9nFVO9Xob67fsH7H8x42jfwkGobU%2FlGqy%2Fn%2BavL3I0ckwXFFxgAxKjNggkFuvZMpx9qBht%2FXsWOnKL34iHbfcGm6qLXMWMFN5445tLNXTmJABBKWldualwH2mGAdXB6HAp1b7U797PJw1h3Q3rVEd%2Bc5wuLAac68qlo4bbQbFgau7pRkcdCZnuIuUDxPoST36qvcykaGs8iJQNR75S%2Fvf3AoCl%2FVYR%2F%2BcpjlQgY2F6bzK4s3wliDpTzwuu5sVd9Qal%2FU1v7k4yiFKAMkX527jY7P2m7%2BR2YzKV%2BAjig7szP2gkMgXkYMAKWYoTcYobZNTFCXeLXwWC0AcddQiC3tWqB36l5KrGncthKv%2F0kLzrx034B1KF6bfOQPrFw7NNUxgmhWgp5Wv6UAwAUQ%2Bl%2FArMaBU2OdZbTljWwyYxoW7ifstVHPycyclM930OY7UBf3MHrWzJ717QYvrdW1XIUyUX0ojGbVlWfLsFRrIQSMJ3ix80GOqUBfOTlgY%2Bu62nDesbyZ2r60v0EB1xra5x21tT0k6X80Rgn7XUVycAIsasWH24t5SooBf8JHcUhvgJ%2BcJWBi5DMwZpFiarji8g3wX3incNiSSuQD6s7wvlYrXY%2BQGIP3c6wOa0KZNDv1KWcirrSzoBD8AeSdF2vL6pkF5BxRgul6YAuIKl36HadjZV70U4r4djWct1b9xdOZ62P1JOs9cMqjPg1gm5y&X-Amz-Signature=1d56568333da7a900a6994b4868364344e6e9e680ba1960628a1e5b91e8b55b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYDTVIRQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCWoQWtfpMfrirPFfCkgKmN%2FJLZLU98MifhXa%2Fjkl2V%2FAIhAM%2FRkaO3OT7OKVJqgIFm6ARLieXIEWLbBwS42sXU4BQTKv8DCGgQABoMNjM3NDIzMTgzODA1Igz3v6D%2FH70Qzu3ocrEq3ANhjt%2B1xfA7GONOaZwjPoO416lywrac3%2BAmEpQ2gPfXWSb9YUEv5rKqssXsVxwgqKLo1AgTBJbx6hMIhwj4%2FYSGZSCokHTCxx8samNmsxt54Uz9728wBPI5FMF9POJIHajl9ShJjSu2aaDu6FM9gAjoSY2deeRztfCxg0olRITFIKX5tPG9Sbuc0su28ZCHM2Qh0Gpb6vsHhWhhKrS7jQuiTbqBgk4ZDg3tH3b2sTg4vRskfZVDSQy39bC6AXfuxIVBgf71KetnH%2Fzi5TLf4WEvidWsiggp2jF0eqMng%2Bq8%2B9UJxR51DY3gNQILtBvwT2owuwDdWm351R5jNI%2B%2B8633IhnrU%2FaLPqBAH9UzvDgDtMkZGvEhccKqJDVixQm0kfATQiOuk0kkJboLI5B3E5EJ15ECEvSwgPdA5l3cE%2BgagpWSd5xIdj4UJYJq%2FnR1EEZm1y52SnTgmBAv0PdQrvh25WcXRMrUq6eVYsJMWgsAsuf3TIVt9yxX5ShLtzjkWW6RTDCSjU2f9LXoDOnwYdensxe1ukJxfArTTF%2F47Xc95EvjnMiiy3Rx0MN%2F2F5zPB7l5f7LYWNxcNn3Jlrx0jt85zUOBxE2UWkeaShM3KKdaQrERCJqzzgrm4EZ3jCC48fNBjqkAXGtTN8Q%2B5d1nsItJTv%2FbMIRg36gmrWGB9oDIzCr4OJGV03CavoFgEqsm1o1UrIggaervLARs%2BFv7lmUY7Onm7V%2FcWA0Zc8PsTkcbgsBVHNkYvTv0xoXqIZZOTJaTxgYGKxSyAdneQmwWHPd5CcCoiJ7Mftw58KIAdzt77n22T9hMpPuAfaxpOJM5GCJIOilhah%2Fbtfhg13WXbruqiSR8imCF4HE&X-Amz-Signature=a12bd574b8192c065c7dead5fd1bd2282210098d0845de7896fc4d7c072baa1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYDTVIRQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCWoQWtfpMfrirPFfCkgKmN%2FJLZLU98MifhXa%2Fjkl2V%2FAIhAM%2FRkaO3OT7OKVJqgIFm6ARLieXIEWLbBwS42sXU4BQTKv8DCGgQABoMNjM3NDIzMTgzODA1Igz3v6D%2FH70Qzu3ocrEq3ANhjt%2B1xfA7GONOaZwjPoO416lywrac3%2BAmEpQ2gPfXWSb9YUEv5rKqssXsVxwgqKLo1AgTBJbx6hMIhwj4%2FYSGZSCokHTCxx8samNmsxt54Uz9728wBPI5FMF9POJIHajl9ShJjSu2aaDu6FM9gAjoSY2deeRztfCxg0olRITFIKX5tPG9Sbuc0su28ZCHM2Qh0Gpb6vsHhWhhKrS7jQuiTbqBgk4ZDg3tH3b2sTg4vRskfZVDSQy39bC6AXfuxIVBgf71KetnH%2Fzi5TLf4WEvidWsiggp2jF0eqMng%2Bq8%2B9UJxR51DY3gNQILtBvwT2owuwDdWm351R5jNI%2B%2B8633IhnrU%2FaLPqBAH9UzvDgDtMkZGvEhccKqJDVixQm0kfATQiOuk0kkJboLI5B3E5EJ15ECEvSwgPdA5l3cE%2BgagpWSd5xIdj4UJYJq%2FnR1EEZm1y52SnTgmBAv0PdQrvh25WcXRMrUq6eVYsJMWgsAsuf3TIVt9yxX5ShLtzjkWW6RTDCSjU2f9LXoDOnwYdensxe1ukJxfArTTF%2F47Xc95EvjnMiiy3Rx0MN%2F2F5zPB7l5f7LYWNxcNn3Jlrx0jt85zUOBxE2UWkeaShM3KKdaQrERCJqzzgrm4EZ3jCC48fNBjqkAXGtTN8Q%2B5d1nsItJTv%2FbMIRg36gmrWGB9oDIzCr4OJGV03CavoFgEqsm1o1UrIggaervLARs%2BFv7lmUY7Onm7V%2FcWA0Zc8PsTkcbgsBVHNkYvTv0xoXqIZZOTJaTxgYGKxSyAdneQmwWHPd5CcCoiJ7Mftw58KIAdzt77n22T9hMpPuAfaxpOJM5GCJIOilhah%2Fbtfhg13WXbruqiSR8imCF4HE&X-Amz-Signature=1b458a76e7098b9c83e77246f5d86e94e6f40c9969bb2542afe0fb3b1e339b65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2E4ZIUW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1b%2BPrFm4rwOda7u9Yf4ulFdDXCK2eOzSOsmrzpcpx4gIgE6hstUghg4qnKbUUN%2FLaH%2FVBFstLg9acg7306nv0EE8q%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDAWxL6fxgIoK4pN3FSrcA1VbeDRNfNbqC0aO5h4%2BSfu7hxjb4yZu91T18RwX%2FFW5%2FBQlMZznDHy1vqMUgMzUTt8kiknW6H383qQWq2sZO4p76Q9Q5pF6oCGH45HKTvzAmN8LvHs34mIJQGQKGd4HI1PUc1tY6CKbh%2FsPrlhLENV0SWZk3L3VFqBE7eSBv3knMxnbOK6MUk8s7CfU9%2BC%2BCIMnYsQqZfwcUPJlAUGpC0UqOjvmQfad%2BqeE4wQ56KgCgyBdyR7Op7jyxJtxIysTQio4bQ%2FBOVPyHbpfQ6px%2BrFb9IomL9rpEuNRlWdXhOpyHU6I3n9H9sAM5yohQjYyWfO5R9kE%2Bz4ILnNNkDix7fUKor2iDm2Leu9994IzMwkQiUjc6B0sTk4uPMmvRQq6ioF6FS8E1YGVp0jg186Z1lmWiXXYzVwz4uVxxgyAbviH47wqIFCavqVMuZqtDQAHTbcaOzkF7cHGCxuTnUH2xcNcRaPgWzppbH34wT596LE1mF%2FrBV2%2Ft7nAetN7v3x%2FmZ3QSB9YNirNlE%2FdKoT91fQ6js%2F24mj96Lf9vF9o2SLDO06MVw3xi3Wh4dfyVu7Ke1V2yFXw11pSPrb02j75fTOpO%2FvtWIk6iw%2Fpi%2B7wxHC1tqPOExYfMG5PtpIrMMrjx80GOqUBwfj7wNlRXvwrzcevxSsUQyIT63rKK6zE77ydWrmm2ii46KSCZJZ%2FQaGUbAWxzS3%2FM8YJ9zRhowB5YRfbqXv3UI7o7zkkHGvXn0XVMjxJOWLh8ST6wTmWifSGOyVVxJxnZ2Veu60zA7MxGan7rQEI9lND1mmtcg%2F8dv7v1FTBCdvidmi5NXmFWbAbNcbi27WqPh1jPcKjPieSRrPOAcJ%2BComCPvyM&X-Amz-Signature=af56d923dd84b2325743ff8a0af919098c78fcf4d990f0370f79db7815f9257e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y64ODQPL%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4sVVI2uG95nHI9%2ByrHD8mT1Jf4TVVby%2Fii%2F7zePBKSgIgDvf3Ihfkl0TLaTh3Y7kD2HQtxi%2FG0yN%2BczPAt8Bsrbwq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDLjjVbSoX6fD802gxyrcA3%2F7jgrn2jnB4C%2BeRXh4RYPQ714BiNfnpvQXEgSpjw0h3uauOdSO2F2etDZ621yPVuIpkoIJRNxbHn9yFxhcHhqWEGI75nxWTHH31Q0KJ9oyVQK8f9F1h4GteKi0cnotHPEaJEdGvDm44JvwJeKA%2BIMR2r9sGW%2BAQZOckqwJ%2FLO3jHneLcIBF2gmnIun7OBioFUGRVoHTA6LlezRACRy1QZJcFVxJW7DrRRsVfsr0Hzu2Qd4CBzMQklXZuyC094LR45BRlWxfNLHP5Jb%2BI96CgSUeWSEf9sYDVZMt5y7SbJc30gy880kd%2BxzOtzbyUxTPC1LmgmuNR9NTC3fmzggX4vyog9Ipv2Scodo34slw3XIoGNVbYx9FNPL7ajAJC9PyKFhS8w62TXylIlFEgm23WZPpxpw7d9Q9eH6UlvMF%2FLEEZdq12400pFb71ehT7kRWKKMD33i0hfdbgMcnjGp1Iib%2B8DgfjRQvUGHNWPV1cgLX01w6BIMiRCvTxrVIBAVC4L0Bv3YRZwiJLkRKwFdiFQLbcEs%2FFIL4xllNECF8b9M7hBlA7m8fEInXRWycN2BZ3XkIUS3myspbWpKQ5tzdmxFko%2BvQbj%2BD9fhJMUdBjADL%2B4Zfy0m6kePg792MJXkx80GOqUBWX6DVN5MM%2BuxpvAOc5jVnA9frql1VpHxljf9DTswGjIbapi4kjNAkKHQe2tqSVmfV7l4i1lH9oGDn2BagB2MdSjH%2F8daHUq%2Bazlp%2BqIxNGUIMo6KpjA%2F43ETA%2F%2BCQNo6kOxM9Q3dD%2BUBNfQznN5erGMJCq3D8D22%2F1vUj9xKJiLZu4Ca0H5xwnapX0dQvF%2FjWp5kWVEWXvGvVytcEVf2ON3DynBm&X-Amz-Signature=e0cf6d2ac09c068fab1f6f35f1ff34fe9533a328128e69d114547a024313ab8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOB6ZTVZ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIJYgdm9eihNTOhUf4cejiG7PbrDxdXuU9s7GM%2B0c9EQIhAJakbPt7Sjcq27Y3LjoLtbRmkGPeOiGZh8eJpSn6iq5qKv8DCGgQABoMNjM3NDIzMTgzODA1Igz8xwftni%2FrpHHGrl8q3AOug4K604q4dUu%2BDgMR3FzUR0AyrBnpNBKYH5AzuyDQ%2Bn34axAO7lmiCE9pfRSoSiAM%2BMFyxM4K464itwStJo04gTym%2FfmWRtLaon3jsBaVRdtmaltL8gfX6UbaMIB5PD32iqK4G8jRZqL%2BYKAmhKcjr%2F9Nk%2FbriAT7BD%2FqvMCcbH4HhMksRbfjQkSWe%2BDpW8CKR7QmpTcF0Ot60%2BD%2BWBpjemgz2E8L3U954yhwegMY7rq9XyC92zHtJl1LVmn8ePEPGmsIn0RxCSgJ0%2B7ccYjTq4HVLb0xrRtE94UsPsAimis9UmkunxhNhfjB8ASKsLZzeNF4IyMUsgx72CcWGee8EoidbuK1HIugPmq1H1s4a%2F%2Bb6MTmjBjYnDggyerr7J2U%2BGE%2Fyx0NzwAVwwdMwOxf2KXExI4Sx7OtWhKjyrZDaiS0BhdG9u5GKtZPUm2IIOZADtqfrKIqcMsFVZG3AcOneArOB74hNU3Kz1gK1D%2BRQkz8D8QrFUZf6pBsnEPALMp%2Fir8qVc4G7bf55dLzbO8H4nyjF6f%2FjRiFhwvPFz04frw%2FKzcb2optbk5OvYDHikTQrR9z6tYMfp2aYOs9BGsOP03YpJPB14ZXXGZdJdm5zy2sZMebukoaKWMCtzDl4sfNBjqkASCZRTE1nNUDjigms1ACBgwPSoUsxHMfb5azr%2BkWB6PUXMJ8qRMeeAVzQfVV41m6ki5k6K1qkX2P3%2BWrqL1Syh5ZBhu%2FeyHeWeB2jaKy5vaK8QQuqPL1u2G4Wh6NU3axQDS6JlHFc%2BjkEVKt4aHDwg6L%2F4gIBBqv3ZMcO%2BwWAYGdH%2BJKSQs8FANpOxZTcrAF4b509KEdf3PEGkcKump3ySEKxo4A&X-Amz-Signature=14a2772b58cf030789a5a16e4913012e1d1f4e975c154ceff4b7200229758124&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647X4YWXN%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAgo26YIaihR8qfjq6hdA99RrvZy2zcExkhVED06AQyAAiEAn%2BBBc6CALxbKzoOOkt75LDETNn2ISAIC%2BeGMLq7%2FOJQq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDPT4fLXgcQHjW1kW1ircA8hbgZFVqsaK6Oc2bFE4o5weNYXWgDl9HaQyo%2BEhlIyrimsGtW5cd%2BLiQXZBVuciQaO5S21nh7yqHMPYWABVorIpqBwagxh1Iwl3AFNDTTDVHFB9u3lV9COpAWmk1B2xAmwk2wD4c9k17vnzin2EokWYYhL0XL5XVBErfqRkitz%2FvnvZVw3oik91KrjRHovReQ9GY%2FHJ8R%2FdDZky7DPu3mvit1borpX676yP8hD70OW9HcOvFTVtky0JcOhPj1iPsepQiomMvyQ9M6MWVDlQZWbZNNDAxxF%2FumAsyhblL%2FK9PA47on%2Behbp3OqVtE3EcAyESZKzJoS2Zaa%2Bqi%2BvwodP%2FBIvnwRkfU8bhQtDMLeoC6Lyx%2FYn4yTNq5HkJU%2FF2Cg%2BAPKnOJRsvANOFxEBwLvhr9SuIVB%2FJq2SgED0Wdb0WRv2YuuQ9IrZ37wOsdsk74JkfZZbIkzqiy3cCRD6gQmzNhdGTfmhf00scgmDU4LibA3pEV8R5ZCgEZSXVZQuEsefTh%2BPi4NIXoYJy3lGjSz2vlKqBzv3xCQQVIdqIbwfpOtLP2TLSC1TmpW8a56djwttdHAB%2BKJWr3O5%2FC822oEh8FE9XDFPv%2BzJYcbPrXPP7imZvs3dlnh8luxNlMKnix80GOqUBm5sZRZkslVaDR7UlOrFhaEommvtZkk%2F0U9WquWkEjJg%2F8xYH15oOAwVxEKzU%2F9MnTxLfCV5IM3bdL4CLkED9nziFsnC41sJ%2FLS25ynJL%2BYNkQygi9wPpbgmDnk3qnN1Sr5Gsk1KJmD4hiXy5RXSw%2BlHoNhlkpYtivBVIogo8Uv1RAz77XQO%2FhjvjuTezR4uTk7CH0ttQezq8vkUGzOCcQnMsXU36&X-Amz-Signature=108cf063004f19f14ed8000e785acd0fe3aa050fb0546f3abf45cff81607b752&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647X4YWXN%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAgo26YIaihR8qfjq6hdA99RrvZy2zcExkhVED06AQyAAiEAn%2BBBc6CALxbKzoOOkt75LDETNn2ISAIC%2BeGMLq7%2FOJQq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDPT4fLXgcQHjW1kW1ircA8hbgZFVqsaK6Oc2bFE4o5weNYXWgDl9HaQyo%2BEhlIyrimsGtW5cd%2BLiQXZBVuciQaO5S21nh7yqHMPYWABVorIpqBwagxh1Iwl3AFNDTTDVHFB9u3lV9COpAWmk1B2xAmwk2wD4c9k17vnzin2EokWYYhL0XL5XVBErfqRkitz%2FvnvZVw3oik91KrjRHovReQ9GY%2FHJ8R%2FdDZky7DPu3mvit1borpX676yP8hD70OW9HcOvFTVtky0JcOhPj1iPsepQiomMvyQ9M6MWVDlQZWbZNNDAxxF%2FumAsyhblL%2FK9PA47on%2Behbp3OqVtE3EcAyESZKzJoS2Zaa%2Bqi%2BvwodP%2FBIvnwRkfU8bhQtDMLeoC6Lyx%2FYn4yTNq5HkJU%2FF2Cg%2BAPKnOJRsvANOFxEBwLvhr9SuIVB%2FJq2SgED0Wdb0WRv2YuuQ9IrZ37wOsdsk74JkfZZbIkzqiy3cCRD6gQmzNhdGTfmhf00scgmDU4LibA3pEV8R5ZCgEZSXVZQuEsefTh%2BPi4NIXoYJy3lGjSz2vlKqBzv3xCQQVIdqIbwfpOtLP2TLSC1TmpW8a56djwttdHAB%2BKJWr3O5%2FC822oEh8FE9XDFPv%2BzJYcbPrXPP7imZvs3dlnh8luxNlMKnix80GOqUBm5sZRZkslVaDR7UlOrFhaEommvtZkk%2F0U9WquWkEjJg%2F8xYH15oOAwVxEKzU%2F9MnTxLfCV5IM3bdL4CLkED9nziFsnC41sJ%2FLS25ynJL%2BYNkQygi9wPpbgmDnk3qnN1Sr5Gsk1KJmD4hiXy5RXSw%2BlHoNhlkpYtivBVIogo8Uv1RAz77XQO%2FhjvjuTezR4uTk7CH0ttQezq8vkUGzOCcQnMsXU36&X-Amz-Signature=8ea6732612fc34a80e7a6b340e1678b04a936a3314cb9e45a9397b326a8dd7cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN7ZODTW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDBoW1YcE%2BnjNSLmmlZDnGqhpyjj7zm25hxl9RM%2B48tDgIhAPWspL1%2BAWSpacZsGVkJJOvjq3wmzBmleWNxueccalyuKv8DCGgQABoMNjM3NDIzMTgzODA1IgzGuMd8q78VgUOBjKQq3AOpf4U0t1B%2FxE%2B597F%2BZjdkRoWBcLAlm8ez2drye7iBfIOQl6%2BJu2oG0KtwfOxW%2BxgchdPbwTMRIuK3swSjoISiPJCoKuo1ha6dMKz6RTioRN%2BoWncC5xTUF0unMWu%2BWAL75GKz0Zq%2F0bqgsC54gzxW86q8s%2B9na49b7wMqnFMBMhoP4bXx00n%2BaPWuuier6LloJlJ6NdLR9U2nqV%2FSpS9M6MQMshG%2FdRf5Ylr9CeWRA8LwTN9tEY1ysV4ypK0TLXr4XbfEZ4pOFHUdSSt%2BwP7TKdETLKnRH4TXW2N%2Fm5biRukfWrTthPI8TabaU6NGzK20DsReUfjaPQWLUlB4F77WhwIJR9j6Jm3KFxQLnmnfPbf4CTcLuGBLqu6GNRCcjRhWo3CKgnyB0hW%2FRIhKx6hPhm2h6kGZ3nRrBuLjyu1AgLs%2BLFms0l8z4yv8hjcU6F3bMOuw%2FXWng5LVtGvAQsC33Sy9DdvNRfB0bIW730CTSQ0vL0N%2FkqwSTSxUzut%2BeDbaUYSt3wi6sP%2BbR493vtrEat%2F5C%2B3hOKBcYOMZmfh5yxM6IgACBqPzfD8By7dfHO1PFiujtDqoT6IBnUv5%2BcAVofs3P1B9SdZtI9CVJcrLZmC%2F48cGBs6kdZsKDDCW4sfNBjqkATcgRgK%2FEYdJYxAHD6PIrAWodWjs8QM1Z2LhYNgNnDewbAGxS3igRj%2F8PpK8qSK5gUT5fWgH9j02SQPZbPCvKYpfJoNVqiqQDBw5lhqDPy5Psg%2BESUlGHbwzs3OU1gVimbHrGawfyUpDsHCJ5orkyGObfkLJTeRM0uepNcTKPV8FutsDLDxxZ8au9cyf4pj0Y71K0%2FsrJ9%2BbPTUxDchZE6mg6RGw&X-Amz-Signature=a52068b8826858b43b0d64cda5e4cfd8fc639e69aa4567025097427e89585abe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LGTBPSA%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDJx78Qp0dYb3gyZvdZgR%2FuuepKjnodoaMyd6Ib5KnAOgIhAMsG4Ci6EzTkAmpLm3ZevvMy9fk7E%2BbGpc46OUbONZARKv8DCGgQABoMNjM3NDIzMTgzODA1IgyDPswVmrhZTrn2WPsq3ANoGi2CQbLbz5RMV34eqDR%2B5Htsm1pr8s0xQVqMC5LNyG8CurWN32wApRvl438%2BxTkP7hXWzbYnI4e1H%2FDMA%2FFforzQ8vJhtq%2FQemQgL8B5lZLyQ0ZNAgCfs996ZctB3RTlUCxGDvSBflHK8USHO4upITuxJulbivzFSva9UtPHGIdYzMoOtJlPEvyV%2FREItjRJwK%2FWm5GrHK2qZKVDK7ZeG4wnEu0gCEnaupkM4cJ9RYFEaf1jUWur3LoCsqWBwU4B1qGGBh806zLFWmHZHn5Er21wTMd6Sy232%2B5Cixlhxw17QBvcUY7MCMcW0fWqoo9Mn0ADOLMlg1ayvz%2BdbjqA42WYNxNKPqw5GaVjHx0RpIuv0XwqcD6WFGPCHhHxBtp7Nte1Vs7EqxcFbxjuNFBfucfbdBfwxn867Mp9s6N1kKri%2B%2BmiXLW64840vep3cJ94peiQ%2B86BYtph8SLL5dMMNisDBityhLD%2FZeR3XE6YJYdanCBDKIKBZ2TuunjltNqxBerPSNjL5seNLgrJF1NfzEpuoX%2F4ZOa0IWNJkkOSyD8fuGlh3iwgtY9lxuGP1lC5ingidhnPVEQ%2FMjPwMOVHOOSPrghKvJT6Bjrb7RNEvpVEnO%2FAFYGemKIaqTCj5MfNBjqkAWftIXpa4F9HQ%2B0CksqSNa4%2FBO%2FdDcWuRmBdkptOfo8QhdJB1EPofJEzS64Ey4m4%2FUemZUpNgYrCBd7xyYieApFivQyjwFpuGG8eVIg%2BYglezTDniYGwEuGRzubgcLvxTVTzj0TMntK1mF8sM%2B5lJ6YVmu0zgjiIK%2FxANl16S%2BftmHOOAFrg5n7ArTCt44VQLD7fi2DaPJkd42veA0EPBVrh1r0A&X-Amz-Signature=7445e3d27968979bd2f3cfcaa4b5f38a85d5dc6e042ca0f0953847dbde95ac4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LGTBPSA%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDJx78Qp0dYb3gyZvdZgR%2FuuepKjnodoaMyd6Ib5KnAOgIhAMsG4Ci6EzTkAmpLm3ZevvMy9fk7E%2BbGpc46OUbONZARKv8DCGgQABoMNjM3NDIzMTgzODA1IgyDPswVmrhZTrn2WPsq3ANoGi2CQbLbz5RMV34eqDR%2B5Htsm1pr8s0xQVqMC5LNyG8CurWN32wApRvl438%2BxTkP7hXWzbYnI4e1H%2FDMA%2FFforzQ8vJhtq%2FQemQgL8B5lZLyQ0ZNAgCfs996ZctB3RTlUCxGDvSBflHK8USHO4upITuxJulbivzFSva9UtPHGIdYzMoOtJlPEvyV%2FREItjRJwK%2FWm5GrHK2qZKVDK7ZeG4wnEu0gCEnaupkM4cJ9RYFEaf1jUWur3LoCsqWBwU4B1qGGBh806zLFWmHZHn5Er21wTMd6Sy232%2B5Cixlhxw17QBvcUY7MCMcW0fWqoo9Mn0ADOLMlg1ayvz%2BdbjqA42WYNxNKPqw5GaVjHx0RpIuv0XwqcD6WFGPCHhHxBtp7Nte1Vs7EqxcFbxjuNFBfucfbdBfwxn867Mp9s6N1kKri%2B%2BmiXLW64840vep3cJ94peiQ%2B86BYtph8SLL5dMMNisDBityhLD%2FZeR3XE6YJYdanCBDKIKBZ2TuunjltNqxBerPSNjL5seNLgrJF1NfzEpuoX%2F4ZOa0IWNJkkOSyD8fuGlh3iwgtY9lxuGP1lC5ingidhnPVEQ%2FMjPwMOVHOOSPrghKvJT6Bjrb7RNEvpVEnO%2FAFYGemKIaqTCj5MfNBjqkAWftIXpa4F9HQ%2B0CksqSNa4%2FBO%2FdDcWuRmBdkptOfo8QhdJB1EPofJEzS64Ey4m4%2FUemZUpNgYrCBd7xyYieApFivQyjwFpuGG8eVIg%2BYglezTDniYGwEuGRzubgcLvxTVTzj0TMntK1mF8sM%2B5lJ6YVmu0zgjiIK%2FxANl16S%2BftmHOOAFrg5n7ArTCt44VQLD7fi2DaPJkd42veA0EPBVrh1r0A&X-Amz-Signature=7445e3d27968979bd2f3cfcaa4b5f38a85d5dc6e042ca0f0953847dbde95ac4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDDHYHT4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T231357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD33r%2BGpNfQN0weX7IyWrFkuWnxNtb2z2m%2BZZwghguCzwIgXOUDTE1wctb29lFojZX61B%2F270smGyYwutAJvKZ0FJIq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDK5BNSBkiNpXBpe%2BVyrcA0n9SNRxN7P9iQHkzDQzhlPBvT9Nbmz5NcVNHRp9t6yr8EfMAL%2BCtDzLZA9zOLPo3rmbw7MuJIsIJbmG%2F%2B%2FIDHYeMhMR3s9WadjQIw0JQXCOJVNpXQNdPSJGAyGn7%2B%2FXy2H2AnjLc3T0UHRs4ZpN%2FGqsOsVNYRVFYon%2FaYIquNzTA%2BrMdpoz6sRe9wDvRSrjgGIoHHSvCt%2F22jHTUPQM0AYY%2BBIulQG5pzq3rQkqGlIEu8UJ4o3ExmywwqnM4TomHZs6hDeJKg9vQ5xaye6zfX8DB3ABmacj6ViU5084WGf7rGRhmex6vurRTRyifJ7sKI1Pf9t3NhYoI%2BKwbIU9T79NulKhp2IoF5zafg1H6uMpzVpol1jbANxlxvoU2DOjlbxEWXGGWDWSQqOX0BtXPch1CGOyG7OWrYw1BcfkCpgREJdwmkt4KwmKPPdcHBZheWp7pEFGQri4PGV%2BgEvToYxDs3busva9phqt0o1FS%2FePmOAI%2B0Q1hoK47T12g4qrN%2B1pdLMI%2FPFro8yP8LaXSxxnRxgMhSd6katSK3%2FDI30I8Rav4EhDGfl%2F8XchgPoA4Di11aoGyGD4DvWMFiehT9lFncYOh%2BTSWuky5SJF4nVZnR0mESZg8e%2FdNPQeML7ix80GOqUBUOluMBNUx1ydck2EyYouiPT37a2IcQC5CThGozkVq2CKUMj5JQlQk0gCm7XEq6eoJn%2FLuUb4hff%2BVcT2TxTu%2Fb5Tci00yKMaSFiayA1kT3uBVdEen%2Fsz1XJbBu9sMq%2FjV9aZICN1tTIw7mWwtc%2FeVWId2E38h4VMyoiRgKri3wVyR5qPe%2BVEiBXtXAdwkR9tGbWDGP8SuTC3VjtWHBBv8UxcVECF&X-Amz-Signature=ed843701dfb95b4f7794048be10416d164232690d1a5f6ca69ca97eba576c1c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

