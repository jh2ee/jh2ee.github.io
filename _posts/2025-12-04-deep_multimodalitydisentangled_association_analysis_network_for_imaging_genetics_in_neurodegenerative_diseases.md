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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ODU4U4H%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBIBO42%2BSWJe78g0qaLZqdflx2T6E5G5VQ9eqQo2sfRJAiEA4pF%2F0khkYYSpihhH9qcpYSSVLP%2Fj1kflJgGUdEf89q4qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFOsKg6s9zP8TR566yrcA6R0TDhDs%2BXRzSnXGxnIxUa9spHC3OI6kFvNFC%2BUH%2Fjud1lwcBLXbn34R7v7EKEceC%2F9lJdfQo%2Bu9kmdpCoTTV%2FQ2GZqQo5kTa594Q6ATl9wriXjFMEh%2Bl8%2BZ5d2wU1eTR6Dq%2BDX0RFpSP9gpug%2Be1ZSyM9giF5qcwbAeXNkim0Kwi%2FOtVb6cub71BFcEp%2Bbf3pYGilpRA0zu9gjI0qHjdt5TrCqLlTxvtZYDTmh73xq0y%2BBmBzn%2BcJuu2OYhSdfOtntgCF%2FnxpBNOHhTF%2FEmaLETfSbQUG4L9WFAmODsVwHy8pFWxjHHvQaDXrIj%2BCTjoiMRn2Ulfbp7bd4bee7YYWSNsI09wX1s%2FuLO%2FEXdvfEbl2I7bdJiqsIID%2BmMKgwsE4TeYBSsiGDxmJ8%2BOLLTEOtTxSeDMmvV4ujviTwwS7KTaLStSBECEtNprptf6ZLcTTaqviw8%2FEBv3DgQeYjI2bd4TS9oLDrG9Axh2Rc7D7iTi0juBU7jb%2FpQNiMUkjDCl7GGUCH2PiwZQvpdAXNpEUn3kw9pF1OL8wtmQou3waSX2Gchjpbpja1LG2zBEvyVbUxRQP%2BUuPKjr2tTKS7CWiPRJnRfe3W6c1ssLBMfdQ8AKq7FpYWBrqTd9IVMJ%2BjsM8GOqUBQrq3adk0pqD23zxcb7%2F7lkqArFfdb4XijSocoISgld6%2FcafuaUOTEaPzeyHpFkC9Wk1%2FerEahMcldM9lrPvOpi8wHdWU8D9IRr3cx5Q2kqDUt9bLdy6Wj17YW%2FosUwrbG71ljo%2F1OLQlbXPrONcSWeBWlrv7JawXcyVWgxAmJ%2Fb%2FDBBk4QAzz0j3tgtSNDYAhJtn2mqdHFq7Bzv1lCQszGJoL7vb&X-Amz-Signature=d4d7835efbc062677b5797ba67307c781b9328afb72ff1b47861b165ddeff09e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ODU4U4H%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBIBO42%2BSWJe78g0qaLZqdflx2T6E5G5VQ9eqQo2sfRJAiEA4pF%2F0khkYYSpihhH9qcpYSSVLP%2Fj1kflJgGUdEf89q4qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFOsKg6s9zP8TR566yrcA6R0TDhDs%2BXRzSnXGxnIxUa9spHC3OI6kFvNFC%2BUH%2Fjud1lwcBLXbn34R7v7EKEceC%2F9lJdfQo%2Bu9kmdpCoTTV%2FQ2GZqQo5kTa594Q6ATl9wriXjFMEh%2Bl8%2BZ5d2wU1eTR6Dq%2BDX0RFpSP9gpug%2Be1ZSyM9giF5qcwbAeXNkim0Kwi%2FOtVb6cub71BFcEp%2Bbf3pYGilpRA0zu9gjI0qHjdt5TrCqLlTxvtZYDTmh73xq0y%2BBmBzn%2BcJuu2OYhSdfOtntgCF%2FnxpBNOHhTF%2FEmaLETfSbQUG4L9WFAmODsVwHy8pFWxjHHvQaDXrIj%2BCTjoiMRn2Ulfbp7bd4bee7YYWSNsI09wX1s%2FuLO%2FEXdvfEbl2I7bdJiqsIID%2BmMKgwsE4TeYBSsiGDxmJ8%2BOLLTEOtTxSeDMmvV4ujviTwwS7KTaLStSBECEtNprptf6ZLcTTaqviw8%2FEBv3DgQeYjI2bd4TS9oLDrG9Axh2Rc7D7iTi0juBU7jb%2FpQNiMUkjDCl7GGUCH2PiwZQvpdAXNpEUn3kw9pF1OL8wtmQou3waSX2Gchjpbpja1LG2zBEvyVbUxRQP%2BUuPKjr2tTKS7CWiPRJnRfe3W6c1ssLBMfdQ8AKq7FpYWBrqTd9IVMJ%2BjsM8GOqUBQrq3adk0pqD23zxcb7%2F7lkqArFfdb4XijSocoISgld6%2FcafuaUOTEaPzeyHpFkC9Wk1%2FerEahMcldM9lrPvOpi8wHdWU8D9IRr3cx5Q2kqDUt9bLdy6Wj17YW%2FosUwrbG71ljo%2F1OLQlbXPrONcSWeBWlrv7JawXcyVWgxAmJ%2Fb%2FDBBk4QAzz0j3tgtSNDYAhJtn2mqdHFq7Bzv1lCQszGJoL7vb&X-Amz-Signature=d4d7835efbc062677b5797ba67307c781b9328afb72ff1b47861b165ddeff09e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637UJ6G7S%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrr9Vlut%2BwixkP04wBxMqbMVYyjiCM1ZB9aixXSY%2BWwgIhAIFfgh4c1m57gCb%2F7%2FnUg9WHvcU7SafK0o5HunHZMtXDKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy4w639HZykMydQxqoq3AMmG66smDfl5cJQl35JXSfaKmcU9BwaD7%2BuK7RPhA10%2Bfk6f4S97DXQxRS2FdbWhbpQtSkxQpZbYCdr7K3UaxADt%2B5gY%2FQHk7krLU7wmtHLRxSZVm9hSfyvfqJIKZgK5p7G8nLBN3XIlDoV6H%2FcXIQ6qFb7c0gX0sRZqCRX6Iw4XQeWDbJqB5zgETM7T6SlXnwHUgKuKsSsH%2FH8U%2FrcaqSqmQWvxf88kNrXgsMQ3InhZdSWG8aGMWT43o6vgg2waPXmk9x2M7Qy9M3xOQLa2uOT7KjdVvZ%2FxtdhEmWr5qZNQM1nDc0xjpZCZp3fpmNRwsiRJZTrXKBzaaq2Dp61Jdyh9p1Cc3krGVt%2F7FvUq5ELMeinGb35PT1UQDHHYadCUo1uwIrWFzzTK7u3RZcT33dVTR4dw0qairXMF8BTGIJkTVFz2aoiCRhIQVozHPRcBr2Yk%2BZY472UAB%2B9WrLNfNW2rxGkOjHXOGnUGPxqesCZ0S7LDNjnGHhkG1ayHdxR6udWjXOee6q3Gc2S1Y%2BHKDZS6MPPb2TO%2FItGdowQtak9rzxLq8JjOXWA9lmahRmTNLKvuDVfs8%2FRU2Z0uDV%2BxtMtF8y42XBD94Gb6AdXuN33At3Ve64xdWvr9KzSzTCLo7DPBjqkASczqXMy5EnfAplQwbn6ljRBMUdfyITuffBMYdnFxLLnv0lelwd7RSij1w5Qugb7WINmS05XEhbZ0zc7zBwGQ6GVLgeCKViJwSDfL%2BsMgEFP3PGvPxry95lRpikbDBxM2ZKq9393BzMCm7rLzTd%2FQ8C9zmn5E%2B1f7l66AxFDb4UiuTRfY0VfJ7y2o4A0uDsYT51p%2Bd77Sb4XBCHagu2n%2BJGqv5R%2F&X-Amz-Signature=9f2d0bafef1458fdfa305eb4ff7dff213dad900967bb08e9b1f06dd5c2c4ad05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJPM7THS%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDv%2BIs5zGLfYkHIYg4mRW5%2FIBq9A9Ymv5elMZwFs3DtSwIgOcf9f%2B%2F3Uys59F3SiPTAfFU5pBBW0obKOvjOZcstuikqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAQibaIf7yGgKL5jQyrcA%2BBSWWQzwwDf0kTw3lAZ8SYDLCD3%2F3PmYkGkBoeuBnXlQ%2FGQz%2BZljoK6uM%2BGNATbfqpkOnSHGrqASwwARo6xV7HazdC%2F4hY%2B2EXJp7bxChFBH47DwGqtNqBWkQuGosngJ43FgTgCKUeiC6ka8TXZL1DjnOjYHTsCj3tLPppxRjcXdosvz%2FgHR1ogzoCU4IhwUgdqljPv2j3%2FUocZKSDttbhm2mdXZrgMa7iMAzgestUEQ5x0a8AF1%2FPoewi0NI9Lfyrn08D5MzQy%2BfWmnp5G7tQ7nhIQAvBc8Xuy2uPIHbW16CtGmdQblA2QiYaXjcOjeQJf9gXWQSe3Xj7UhvjkxiHhC3uUVUO1gdcXV1o8I5MdCPKZTyaYSHR1KfURU2EIznnDOcJE%2BelRWF0Spr%2BOsLXUBachcVt4K6t6Z3%2BpyzeJfKxNOR48jX4bWg93QQ%2Fl0Ou5W4IeHsiN6wI8OxrtxXfXA%2FmUpZzJYJbw7Ojt%2FdtRQG4QtJJulyBRWsOiL1naOPUcGwAOTXNTMvErSmpIg9CGX4vOqvhoqjMufCGs2r%2Bn2%2FmqKANfjqOlrQqr511G%2Bqf5yfUkE1YSmRk6fKDJXD31ZYw%2FLxZ%2BO0IGXc9pZlRdbQan1V7mjehhGQolMMuisM8GOqUBsSt6jVrS4JcUtgkSta1YeV69mfUgOI6Q1fvrB4LCnthYORd%2F5JRV52nSUk1hOOgnF%2BR2JRTwQW77phmO5o%2BFuoHH2P0XLomHksqkdtYEs%2F%2Ffoo6%2F9B0u92yTiROn%2FucjRU9%2FL5pA0oGSvcUCMLjkAq7CMsmzDj4B25UR0r2MGFdQpJ4xb9oYm9nrE6NhMQCmeHMTZHE4m76K22IgfhAPca5O5X%2F2&X-Amz-Signature=5d4ff10a0abaaecd8cdb949bbe9456b27eb03b34218ef3fa9f1303f87e91739d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJPM7THS%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDv%2BIs5zGLfYkHIYg4mRW5%2FIBq9A9Ymv5elMZwFs3DtSwIgOcf9f%2B%2F3Uys59F3SiPTAfFU5pBBW0obKOvjOZcstuikqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAQibaIf7yGgKL5jQyrcA%2BBSWWQzwwDf0kTw3lAZ8SYDLCD3%2F3PmYkGkBoeuBnXlQ%2FGQz%2BZljoK6uM%2BGNATbfqpkOnSHGrqASwwARo6xV7HazdC%2F4hY%2B2EXJp7bxChFBH47DwGqtNqBWkQuGosngJ43FgTgCKUeiC6ka8TXZL1DjnOjYHTsCj3tLPppxRjcXdosvz%2FgHR1ogzoCU4IhwUgdqljPv2j3%2FUocZKSDttbhm2mdXZrgMa7iMAzgestUEQ5x0a8AF1%2FPoewi0NI9Lfyrn08D5MzQy%2BfWmnp5G7tQ7nhIQAvBc8Xuy2uPIHbW16CtGmdQblA2QiYaXjcOjeQJf9gXWQSe3Xj7UhvjkxiHhC3uUVUO1gdcXV1o8I5MdCPKZTyaYSHR1KfURU2EIznnDOcJE%2BelRWF0Spr%2BOsLXUBachcVt4K6t6Z3%2BpyzeJfKxNOR48jX4bWg93QQ%2Fl0Ou5W4IeHsiN6wI8OxrtxXfXA%2FmUpZzJYJbw7Ojt%2FdtRQG4QtJJulyBRWsOiL1naOPUcGwAOTXNTMvErSmpIg9CGX4vOqvhoqjMufCGs2r%2Bn2%2FmqKANfjqOlrQqr511G%2Bqf5yfUkE1YSmRk6fKDJXD31ZYw%2FLxZ%2BO0IGXc9pZlRdbQan1V7mjehhGQolMMuisM8GOqUBsSt6jVrS4JcUtgkSta1YeV69mfUgOI6Q1fvrB4LCnthYORd%2F5JRV52nSUk1hOOgnF%2BR2JRTwQW77phmO5o%2BFuoHH2P0XLomHksqkdtYEs%2F%2Ffoo6%2F9B0u92yTiROn%2FucjRU9%2FL5pA0oGSvcUCMLjkAq7CMsmzDj4B25UR0r2MGFdQpJ4xb9oYm9nrE6NhMQCmeHMTZHE4m76K22IgfhAPca5O5X%2F2&X-Amz-Signature=0d9ec3576b2df99a6e314de862496b1e30930ea879985c581d1605d503fbb6cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QC766ZYO%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUjb%2BeYTOfFZx7EWGwCsT%2Ffw3EHFRdznCrtaaDdrM8mwIhAPGwjiWCmlxucOLMOW6gqT1lnvHeCXbeKJa%2BCPRZZwS%2BKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwMDaIgar%2BI3rp%2BxZoq3AOLxxXTMEGGJe%2FfbuWf3vnjB3sicNt603JQsS6sHKjL9JvfOnxCUZyczLjBJ07yVBVQ1S4DQMbY4GbWYXQlor1dFmbchj%2B5Dqvrr5UTSq9iz%2F%2BwWnPj%2FzLsI8KCqhTP4dyY3t802EC8oJ5ZC5ZEXlMAOp5JFjir%2FK%2FcxcmtCCYIdajRT%2BPUhNIIswOUrEG%2BvBEP46lFPpY2E2fvNa%2F4jd%2FRa8LlFXbYhB8UTnVCF7pN1TzW%2BhJP8roxm%2FHJzuNkxzWxKlCCwyHB%2BRGeXdxGAH4tZPthOmNw4SG8p%2FwtcY3x3BDfpWn8G4nHwH1Go6Byn84sNAG%2FoQ6Be3JRq1xLdhD7%2B0r8OTBLAUHxh1%2BPmI%2FLAFAFsLrSYlAaZuX27YbN254h2hSBf0kqyGQtOMGRwjNtyYOm77xMt9QB%2BpGxMmlU89cipKWewUOZyCFprNBx%2B5TUoNIYTogzS0kU84kYhVFADA6RRPNzKXq8JTrWrnwrjviTNZKYUDoDdBMOsJxSuikl8H2JNNBFDNSNFilvHrXeZ2uKICRVpF91yeec9UARngMObCS930cmNspyXyFGBnB5AKFjU3uXjHs%2BAjM875rtwlWbz0qbImVgf89dqrlEGzMq%2FxfAujpfbr001zCLorDPBjqkAa4vIzWfE7PZx9Ska4Szt0OlGLDfm7%2ByLHtftl3z1C%2BzHaRF1os4nLhT5bWC%2BpJNZMAziqs7NiOuwU2i4oWrGlO0oJctfdq%2BaWSU7WYoydnY9AkQ89PQrEbaDcXCU0iEZkUvZxg%2B6ETK5srI8cs1D%2BwEMCOolohpN54%2BX7M3haxEVc2hNR%2B3G%2FlTdnOOeyn3uHvWU7tw25cUghQvl2h65yZ18%2FP2&X-Amz-Signature=2a65d0d9a424730c5626ff12ca93bba623f513597de117809b8ea190d3f74932&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JO7YCIX%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDC9SwMmg8RA7dP7lvGddReCWo6g367dMcTqnurX1k0HAiBbWFoQXiA4Wa9r28hNsSi8WtWEj8asrCqKSsEs8LgqgSqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMO%2FMicvBezybTpUlrKtwDzvs0hbOvjB556fP5QJsBjrvfugk%2FZUidPiEzeunsX6w%2BETRUw4EOuc69f0UeOzy2nstAgJlffBfylWd1Tv6VaTvI0dX%2BsnfIVNvzFSWNBIGSga9WegnMoBiPVfIYwTb59viIamcbgewBLXgw%2FlSvr8t2A3dhQA3hAh9bKDb5duk95%2Fk2kpXmp9pOy8uNY4SciSf3W24u3i91KUd0wsb1GTXgkZ5k2kyu%2BNXW%2BwEr500lRk6uvYMeX8yFEBl%2Bwd6cOf8vlBU1ZkKx6fc3wmBIDeCD0K%2FJT9%2FhylHfV5W9b0CByQ5CetaMSlOMFpbgZ2XW1y8%2BoMzxhYUek53cu5QcT8%2BC%2BR68pMVTnshl5m6sSF6LI1%2FDnWCGmIZCZbUUSEj5dGumMPo8uH%2FVqrgipwavyQ2XwmZIqkb8N%2Bh6qbyuw56UTAukt%2FN2XXjlTOmn3y3MzQfRUTQbOoUZuakzCPbVynmCfMjfKfB7gPo4IkmVRW51cSxPU9XqOlhQGpJI3iSOnBv7zaSAo2twsdcQSi2CzdF1khdjyIX5AALW0DFzNpe5MXQ45lkDGtMLyxIZw6iwP3mf2UQw29SuWpZniwpNNE4R9jXjqk3jEWyuBts1qlzO9lmgTEMOwk3kU%2B0wzaOwzwY6pgHyKnp4anOeOdJ%2FGcVrKxID2EcConF0h259LKFRgzSeWEjbRyxI6e4I8hS9DirXWVBgzvdlBjOjqejpbCbgZfBJW1gzRFW4hmNrUq1n8FfKbdI6pTvq%2FsYPVjsfmwsK9Mf4SRO3SJgE%2FDTht32Pf9FEy%2FgmoMEVd%2BaRWh3sGHqzpC6ez1Avh76JVAppkHf82VVEG%2BxUlITlFWEFsu732qPqAOTmz4MJ&X-Amz-Signature=46c26e8a8065ef8bd385bdb0ace3c962294897298915e31819b9ef40010bbb28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MEA2SJG%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICSg%2FptIqtDnbE63zNn0NRwwpxOPqMaWtZ0zgq3zPMS5AiEAwCvMvycuRCCICBNdCXnDklLuS6hccwjsV7zveDirn7QqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKqDGcWq3cbUP2revSrcA3SGXaV0eO%2BNIZZk1LwwoTTASm1Niit7K2YAdeQxWrugEWOBtzMF6wSxCL%2BSScw%2BqqzORhul2GFDnwQ7296JhFrA89%2FcvSw%2B7yCfOiEDXGcsmx7vVKqW7%2BKrHOHYOA7lBrm3ME9tAPyliVjTASNwjJxpG3qIa5oMQ8McZzbr4Of5mu%2FwZNqoy8RxgwBUd6HP6%2BLxgOW6C1TqEvkwWnvqXvrM%2F19Nfmok88ERSaEtn8aIyFbSfYEKJSW5bj9BSGxuiFshDrNf9HRSoXWKp7sapwOYsS4KkE2OgV7JGNY1YjZGG2XfIYSSnmNhwcEweprZqjldg7vtkIIx%2B7TGrxdq3U3YvbDaTvjkvXcjxepo41sSspcIVBs8mM5qTCuQQd4hngawiGc6PUrf278NHMtjiC%2BzrBltuWkbR5lMh4EJt08vV40yuk8eMC92vjH09QJz6tIz0sOxHJbfW6udXHZOTxjpD%2BGUY0dTCGn9lGNio2vshfrDP7oT6656vb%2BJklJAxTOSQdeuzV2FvcC3de69Sh%2F0yD9uIr%2BcAsYnS7YNQppKD5bMeIDfOFsfZkYCMDOZ3JHQBsQ63zSK54kJEVLW9yLjZpL9mF6SElDu2SiLkMFcjoG4x3a%2BvlcpTaksMJ6jsM8GOqUBNA%2FETbAorckvXEX76g2p%2BFtR9zzpuccZGM2TJap9tOjNztdJH2WH6haMwCHeHJoVA6PrZQWll98l9M8jtPkk48RGRtFv%2BsMHZqbkoLN94I%2FBStWMJa25mWjWYdsvGzY0yHz9CgL%2FvD3q3zILl%2FN45dPjmP5mOboOSUbUDZjLZdclF%2BefwH%2ByVWRdoUPorrMJ42UZK8N%2BmE8WusFgOQjPIwJZAwf6&X-Amz-Signature=346103b11ad622d5f53a15b788cd5b123a773be5dbf961ec1400c0ac5e46a1bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WOD7S2W%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCGh3lvt3rocVIwpX9UkrjDMSHGQ95gaeQQhdcNIQ%2BiSwIhAPezHsI7i8qcj%2FtPqiVyhh%2FvdKMdhdooI%2F4UT5n9KzEJKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzk%2BAML%2Fzjri0drwf4q3APe5Z2%2FZEZpPO%2BBxV2kVwAP5lkRts90n25Szr%2BOTrVuNciqnrFB4D18PazWY0xp22HRzd7u1zituoM2JrdQm5qUuFST3cP0yRYHk%2F%2BNgnROyMVDNOVR2vTHn2NeQRG2m%2BZ4IrGsaeNHl44dcFwPeeNGp8YEmXjQGdLAY7IxPXrCpyDwTVmP%2FakjO4xt0%2FyBbNWfStfhCdur3TfftBowqvcE5ZI04txuqGOvYxygL6aGjJefx81gwHEsJoi66A1DqbtVulTJVCJZHf1SZJNxhxJHNcqClLFvupLvCA%2Bbk0GF%2BZ%2BeQhDxx9HM1on9aMwg2P99Xa7ar5StT93ZmK0k%2BD7zmlHBZ2gNbkojZn79BMZeW0hR%2Ba%2BB7Nzu4B1hDZievNozmTQnD69KHIKZ3nYhkeSSOdreTnFmUJkZrvhuLZMkuAHK0O1Jmh8u0e1jGLUMgwscju1vuK9dNT0sjIsPDVouaC5MujMDxCD2VwMsKYS0AsIMdEvSqKvDQI%2BouNU7l4NypORTyS6AkeOoYDxMBaegDnKgLkljASpPg0a23TZiBmC%2FkGd4Kr5yKbFWQoCYsiNUS2It2Zg0vkwe2ZpLyu4rSOc%2FMR76%2F1ojVJ8lpqVR%2F0myId%2BP7nzFMaooOzDYobDPBjqkAUJOasv3yfMAGSRY6FVRQ2oyho5as0uy9nLJjL0bPVRZfRhrL2RAjJknj%2ByosfVJww2iEc15HF%2B%2Fs6J1rAUSKe6XWtygdNa%2B%2BAIaliUI72ajt4nJM5uS7ohqgj3EICm1JX7VfUohAVAZPhIILkzrsCldWQgK7ur0JB8UqeyTvv8jx4u5%2B1T67BUDoni57LRU6fta6ttphlmQLujq0UPJ%2Fw06Gr0z&X-Amz-Signature=d8dd8d893c5e521011b82ff2324d22c16e64f7cf913523575d9ecbd97d1ba6f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WOD7S2W%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCGh3lvt3rocVIwpX9UkrjDMSHGQ95gaeQQhdcNIQ%2BiSwIhAPezHsI7i8qcj%2FtPqiVyhh%2FvdKMdhdooI%2F4UT5n9KzEJKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzk%2BAML%2Fzjri0drwf4q3APe5Z2%2FZEZpPO%2BBxV2kVwAP5lkRts90n25Szr%2BOTrVuNciqnrFB4D18PazWY0xp22HRzd7u1zituoM2JrdQm5qUuFST3cP0yRYHk%2F%2BNgnROyMVDNOVR2vTHn2NeQRG2m%2BZ4IrGsaeNHl44dcFwPeeNGp8YEmXjQGdLAY7IxPXrCpyDwTVmP%2FakjO4xt0%2FyBbNWfStfhCdur3TfftBowqvcE5ZI04txuqGOvYxygL6aGjJefx81gwHEsJoi66A1DqbtVulTJVCJZHf1SZJNxhxJHNcqClLFvupLvCA%2Bbk0GF%2BZ%2BeQhDxx9HM1on9aMwg2P99Xa7ar5StT93ZmK0k%2BD7zmlHBZ2gNbkojZn79BMZeW0hR%2Ba%2BB7Nzu4B1hDZievNozmTQnD69KHIKZ3nYhkeSSOdreTnFmUJkZrvhuLZMkuAHK0O1Jmh8u0e1jGLUMgwscju1vuK9dNT0sjIsPDVouaC5MujMDxCD2VwMsKYS0AsIMdEvSqKvDQI%2BouNU7l4NypORTyS6AkeOoYDxMBaegDnKgLkljASpPg0a23TZiBmC%2FkGd4Kr5yKbFWQoCYsiNUS2It2Zg0vkwe2ZpLyu4rSOc%2FMR76%2F1ojVJ8lpqVR%2F0myId%2BP7nzFMaooOzDYobDPBjqkAUJOasv3yfMAGSRY6FVRQ2oyho5as0uy9nLJjL0bPVRZfRhrL2RAjJknj%2ByosfVJww2iEc15HF%2B%2Fs6J1rAUSKe6XWtygdNa%2B%2BAIaliUI72ajt4nJM5uS7ohqgj3EICm1JX7VfUohAVAZPhIILkzrsCldWQgK7ur0JB8UqeyTvv8jx4u5%2B1T67BUDoni57LRU6fta6ttphlmQLujq0UPJ%2Fw06Gr0z&X-Amz-Signature=07270a98c9c90f7df458680fcc51db6e309901dfffeb32e7da9d0a9cf4c3a0e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FMJKPDL%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwTnT8hpIERcrt1G2KpgfQoLvOLqzSz900NLB5dXOLUQIgJ%2Bfh3PT1unT7VIF0kRrwnSbX9zXOwbv6x%2FqQz3qTdosqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKmL8qoDJfajz0738yrcAxCha551zR6VhkatvdkS2Xvo717ImAMi95UVgAio%2B5tb6bLH3wOwm4pfziel1kNacgJzvy8Yqrk4b6tNNjExSRvqm1VMhU5KdIeLe2bHoaUsnPjWQyidI0rW%2FzaPU0WhvbMBflmRQvRYLqKvVoTTedqWWpMCrjYOLjHFYCMTDKGwfN%2B5JgUSa4HT8KFbqm%2B4fj1sixhUNzYF2wyaCEa26wO75LEKGJ%2B6H6vFd613vMHckSj9QOlph1iMEgUTCIOsyVJuGKJ75P%2FmlCeHMQIYUCUFRXaeYdoDb1i5BrAvjiGBwyrvBO%2Bk1wfMGhUURMvoGUfDosC2U%2FW%2FPpyWFAtoqdrndxktg99H9iHed9r3ZRwOZPzsKfVaMXWs2jIk%2FE4U31zoqWsQUSlvRSEbgWzV5xNJ1CMq%2B%2FUP9DMk2nGUK3eK5PROzvgbIRGs9vbo6H7fsSBI%2BNeBkShpz%2Fbg0WVBn8HzQLP22e11Qy1OENrbYgXxRmPmSCwnQuJdjOtNnjoaCaju5ZjBK2iH%2Bd1%2BKPKF5I8PYqIVsBGCH4VuzmFBNmEbFhc9FBFzYQ6AzdZNsD3MqKNs8loUcUecoVxijA4uQhLE6EEZFIhcc9O3%2BFwXpQcNGpLOpVYZb98nkevkMJ%2BjsM8GOqUBhXGJRJdo9UlpKOiRqjmWL%2Fn77Csfpbu%2F12FSnEPd2GyIK8TYxMbsfstZMfH51l08ZRDQKD2R8WDJm%2BNbpESo53I0%2FXbVdw2r0pdbQne%2BgxGXU4MxRv3C%2BkePuUpbztuq5HUHzCDPcG0v9G2FY3cgXaPT8i6IF8yiFcS1q8deQvaEcusUvO%2F38vxbW4LvB5C68qjtQyMLEYf6totvVZ%2FBz%2BEFZMOX&X-Amz-Signature=a06fae0bf8ccb81a71e815ec2bf714db47fb6803f4b324a152e4ffbae29587b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO6HQXHB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZnqUu3If2LyVqpIe8JVH75VAQ15mUZbGtTbOZxs4p2AIhAMLYiomRZhNYt0uH54WVmLr6zvbAGHGoy97k%2BktCbunTKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxXNTUNRLB5VkiPg1Aq3AOvNN2fZMYFiDavV138j1p7ugaBmxTdgrhOXzObQ8yGHgYjNgaX9J1SjvQkB3mQyngP8LO1AiObzkV4tviKiXyhcUPYjEFshOSu6MDcKgBGxAJc2rbOvJVZcBzC5AF4%2BbKdVKtqNM0f1IfO%2B5ZpqdI1znABvs2hIMtVbShQTCo%2F5fFszFDXoHXbV4BUok20TaZPq7gbcUrH2RrCNjuvt%2BgrPk5IFyZsqCkvIx3L06fxTtohAHwn36GIs%2B5igMw5JJbeGiQuj%2FCyPpWk3XE2yrODGszNDRv48D1ZrIFQ4A7U%2FC%2BSb1Z6aKUU1p9p9%2BIz886HkpyU7jLgrCNsNvHS8%2BDO8rJtgF5t6zbpHGb8%2BF1VGWHD%2BoOZxu6xR78to%2Bmuqx%2BjR7b7bj1if7H9y1uuHex9qGbuvOiUEl3xYMjarjzQhqqtfX8GjostsOvvcYEFXTi1ksYObZ9e5mj5O%2B5m8RTpIMx01U1hO92XJcae24AsjdQU5LP2aLCT6kRucUHxMkkaCbTqcdfFu5Ey8LClbDj9rAgWYanp8Arl5mBtQ1c6LfL6GOU6DXJl%2B1Wxob5HyuW1bMjZQT9bMSq5txdePIynYBCtEYa9anrAYYKe8G87ifCtp%2BkJzlog%2FVzeazDno7DPBjqkASlQYhszXi5HVCFbvHTzu3Ob1%2FmRPCnYeJafpHDIecQh9WPynCj4%2B2QvCuAvZ%2Bad68%2FoykSGF%2BZ5KvX9ICbxNiafRu7PMc3WlIWC%2Bp1TueSclxO7sFkaTCBluwRSL6rcG4m18NjQjuBtKYVSE85svayHCQtqYyOP7jzNV1mHPJCw5IYOZ%2BnTKQZAB6N29ENIKYHbIhw23T2X8fK6QzvcUQ7nPapT&X-Amz-Signature=4e9e4b7ddce07a7639902692ca791cf22f8060206c34a8be7cde8c001df6710b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO6HQXHB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZnqUu3If2LyVqpIe8JVH75VAQ15mUZbGtTbOZxs4p2AIhAMLYiomRZhNYt0uH54WVmLr6zvbAGHGoy97k%2BktCbunTKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxXNTUNRLB5VkiPg1Aq3AOvNN2fZMYFiDavV138j1p7ugaBmxTdgrhOXzObQ8yGHgYjNgaX9J1SjvQkB3mQyngP8LO1AiObzkV4tviKiXyhcUPYjEFshOSu6MDcKgBGxAJc2rbOvJVZcBzC5AF4%2BbKdVKtqNM0f1IfO%2B5ZpqdI1znABvs2hIMtVbShQTCo%2F5fFszFDXoHXbV4BUok20TaZPq7gbcUrH2RrCNjuvt%2BgrPk5IFyZsqCkvIx3L06fxTtohAHwn36GIs%2B5igMw5JJbeGiQuj%2FCyPpWk3XE2yrODGszNDRv48D1ZrIFQ4A7U%2FC%2BSb1Z6aKUU1p9p9%2BIz886HkpyU7jLgrCNsNvHS8%2BDO8rJtgF5t6zbpHGb8%2BF1VGWHD%2BoOZxu6xR78to%2Bmuqx%2BjR7b7bj1if7H9y1uuHex9qGbuvOiUEl3xYMjarjzQhqqtfX8GjostsOvvcYEFXTi1ksYObZ9e5mj5O%2B5m8RTpIMx01U1hO92XJcae24AsjdQU5LP2aLCT6kRucUHxMkkaCbTqcdfFu5Ey8LClbDj9rAgWYanp8Arl5mBtQ1c6LfL6GOU6DXJl%2B1Wxob5HyuW1bMjZQT9bMSq5txdePIynYBCtEYa9anrAYYKe8G87ifCtp%2BkJzlog%2FVzeazDno7DPBjqkASlQYhszXi5HVCFbvHTzu3Ob1%2FmRPCnYeJafpHDIecQh9WPynCj4%2B2QvCuAvZ%2Bad68%2FoykSGF%2BZ5KvX9ICbxNiafRu7PMc3WlIWC%2Bp1TueSclxO7sFkaTCBluwRSL6rcG4m18NjQjuBtKYVSE85svayHCQtqYyOP7jzNV1mHPJCw5IYOZ%2BnTKQZAB6N29ENIKYHbIhw23T2X8fK6QzvcUQ7nPapT&X-Amz-Signature=4e9e4b7ddce07a7639902692ca791cf22f8060206c34a8be7cde8c001df6710b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXX7OKCM%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T010817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA0m0GfDwyHncgzo%2BACNd5uyrW26vSNcMPU22rgnIx3OAiEA2XR6wUUtmS0xjxKFERymTIjlxuIkLv5IJnVqKpO%2FPMIqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNDQQ2pPn6m7RuDf2CrcAwTyKtmyaMfBeEOeN4bhaQy6EYfA4AZpQdNReKJDXvxv2xCc%2BqUId%2BFVccF4YlSfcxcKQEGFUZjDdRrV8iyNDQvJB4bmI53xMhSaunn5zhsqCxmbO7xydeFGk0jRB0h6DEYqw1NEfYIagbiuW12%2F2jYecphLDLO0GRFW5TLVde1rEWyfhUeUgngXI7aJeFb1n%2BBfLMZ0VJfvSomoaVAdMQP41mNa6jbodzDd7KnNf4Vtq6F%2BAZblK68yjo25oPshJRD9xZGb2X5qGhPcSNRYoiFFxLoe9yPIZTlQOaoufewYLAmuea%2B3mkVZ6LlMRDbqEv3CYNigNAODdQx6ToENHkqGsiNcwXdbQMzCUoLtFdUGW1AUIiizEPdfQNiSZkfLF%2B6z4hs2%2BgJ8BUyOB%2FKxH%2B0k7vc9O3CdIGs0xM%2BoUXh3Ih3YP9mHJK12guH%2BZc01PbnOuI2eJdczSQYditZACkUXD8Ery6FL5UBd5mcu92nLka6IePWRWJP0HOm0RmckExV%2FKqPgc6TYjH7smIZ0gJdUqmOQe%2BPeViL0%2BjEEu5wEzkz06ZCMWN14yCSHThRD%2B829Cczxqdl7kpGVotzYOuXIkLhyBdnw8adUfnqWC%2FjbHINcOYvCqyy0zbWtMN%2BisM8GOqUBfEdgNCLjbjJ8abpvNgBE%2BgZYnttwozQMxkVyVyL3WkqJYvaI0YKTV0flmXDW4fmJUbDTklY29FxsseJGTYOuaIUct3oLdOu4%2FQnpbk3zN4D7BssHUf%2FsEi2ZHDDgDlBshq7wYixoSV9nsniTmH%2F4Yetg%2B2FzqdDvvsd0kxTUdn05XSoQDOgz7oTgQdoHJ8eajkrrROJrliG4mVOGUIVVjFs26LNc&X-Amz-Signature=bb2d80463b0d73020d2a33f00affc2af91dcf6e187b30e749977fcdbf7e90ef9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

