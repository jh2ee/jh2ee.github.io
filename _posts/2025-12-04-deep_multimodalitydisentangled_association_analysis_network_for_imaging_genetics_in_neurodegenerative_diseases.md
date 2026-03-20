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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QO3SOKR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQD2nalAGC%2Bou%2F3O12ltsxgPwWf%2BHdNF4TGBJoYSvpOC0wIhAMq%2BvNKtqQVjAyET8iOiO%2BVlqhoyctCUbRRRFmCGc9dPKv8DCDoQABoMNjM3NDIzMTgzODA1IgxKKHW3onWhay8uDhwq3AP1H3oHVvW5ZGHD4%2FV1JdHBlpodZbrAGsmNspDL0WR9zrgD8dCm6h0VKxjEksyJQSBAI4fE9HOJUGJC52KU%2BgDEnoRW68EAlatEnxkZjpmozpUjPyo1b0uQWGWe5%2FoR%2BcO3RmYISQZt5VsrUwniqcJILLtuRTxoyxW3NYuHCC3c24LyfcXIviugML0sEJ3jOtqMA55MWLgtRov7UnAcByKaitGGQXE0WbJEThZ8EWOdiLUGZI5%2BIRCsoct17ookjETyhkq2i38kLH3ieXqKUQdiP74i0EifceGlxD7QfwqmImtPfqpw3dcXGKt6abyuNw5pRqKeceC1AL%2FY3qEjL2ujEf9hCOZcwBlD4HCUaxU%2BJny2FUGX5hf%2Fwgj1X7rJf98KK8v%2FcH4AQMI9U6fkuix952c4xz2MH8v%2F1m7q%2Bfmdtd1DuFyQwJIKCx27yKUBRpqUY4%2FLsokvJoTvM%2FVqV4BCnXIv9MeEHZPwr858iDtVYd%2FLpbL354E0doTT9Oz5qW8fwCOhtjIAjiUir4382gDDGvFKjFxmA%2FCm%2BBYrOhHRhhH2HPKlJhDvYb8htdd65neqMbPxGeRNHO8UVmDNtaSHwDpEd78d99k4pFLqkkz6LKmN0L6z0WxxVHRBKDCC%2FvXNBjqkAcGl9eU3oEh5C1HaaQSsqZNi6mChkRd%2BaZj2qpgfjuFZLGgGgevSQYTaCOQDfgLZ%2BUu8vMNTeu3E4gcNCfDZNZ4A9urgBv5i0lG3%2BbAcqL4dkmuCw0CoqcPO7KZNqA9clpTNS54%2FLpI%2FEFSqTpiihInsy517ODQbaqLDqkDAbGGFzNy6uPPZe4Up2K1aQ6Mu4IPC33cfj1xBrVzmVMVJheBQyXgA&X-Amz-Signature=0c7b069595e2d9fe781d0ffa759e7720604fdc4fd2b5d499cc5c5b33b3a4debd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QO3SOKR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQD2nalAGC%2Bou%2F3O12ltsxgPwWf%2BHdNF4TGBJoYSvpOC0wIhAMq%2BvNKtqQVjAyET8iOiO%2BVlqhoyctCUbRRRFmCGc9dPKv8DCDoQABoMNjM3NDIzMTgzODA1IgxKKHW3onWhay8uDhwq3AP1H3oHVvW5ZGHD4%2FV1JdHBlpodZbrAGsmNspDL0WR9zrgD8dCm6h0VKxjEksyJQSBAI4fE9HOJUGJC52KU%2BgDEnoRW68EAlatEnxkZjpmozpUjPyo1b0uQWGWe5%2FoR%2BcO3RmYISQZt5VsrUwniqcJILLtuRTxoyxW3NYuHCC3c24LyfcXIviugML0sEJ3jOtqMA55MWLgtRov7UnAcByKaitGGQXE0WbJEThZ8EWOdiLUGZI5%2BIRCsoct17ookjETyhkq2i38kLH3ieXqKUQdiP74i0EifceGlxD7QfwqmImtPfqpw3dcXGKt6abyuNw5pRqKeceC1AL%2FY3qEjL2ujEf9hCOZcwBlD4HCUaxU%2BJny2FUGX5hf%2Fwgj1X7rJf98KK8v%2FcH4AQMI9U6fkuix952c4xz2MH8v%2F1m7q%2Bfmdtd1DuFyQwJIKCx27yKUBRpqUY4%2FLsokvJoTvM%2FVqV4BCnXIv9MeEHZPwr858iDtVYd%2FLpbL354E0doTT9Oz5qW8fwCOhtjIAjiUir4382gDDGvFKjFxmA%2FCm%2BBYrOhHRhhH2HPKlJhDvYb8htdd65neqMbPxGeRNHO8UVmDNtaSHwDpEd78d99k4pFLqkkz6LKmN0L6z0WxxVHRBKDCC%2FvXNBjqkAcGl9eU3oEh5C1HaaQSsqZNi6mChkRd%2BaZj2qpgfjuFZLGgGgevSQYTaCOQDfgLZ%2BUu8vMNTeu3E4gcNCfDZNZ4A9urgBv5i0lG3%2BbAcqL4dkmuCw0CoqcPO7KZNqA9clpTNS54%2FLpI%2FEFSqTpiihInsy517ODQbaqLDqkDAbGGFzNy6uPPZe4Up2K1aQ6Mu4IPC33cfj1xBrVzmVMVJheBQyXgA&X-Amz-Signature=0c7b069595e2d9fe781d0ffa759e7720604fdc4fd2b5d499cc5c5b33b3a4debd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SY5POQQ4%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQDhGNvljoLRXirL%2BMlBdWnHouORtpkm9%2B9OXn7p8Om5FgIgTeVT4XAid2UmktD7wjpgJNecIKMB6H4cko0%2B%2B14Z8v0q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDJTrg0k41CsL1mLW8yrcAz%2BBKPaXLIHmzZ9p%2BlaMKzMxpfQUbjE1TDwYEx25Jhaz7HhCak9dq9qNEOh0mJ2S2A0iygjj4q8RED71lz2GNZz%2FyOsaIrEdPyShjDZlhvkqHONNGF6CZsG2uogNheJQVjIgOl1nBZ4dzjV2fBfWxgPYy%2FrfJe7IQPBqCRqd6QkjHYorBuOOTuN9hgkkFsbLUc97uC0Spqp%2FqzQ0EL9BtjVprW%2BJO3MNV1hKHUKYlZx6lYmlLczMPxW2j%2FmFftefNEQeUl7DJ467K5GDE8RfQaEtCh4xxW%2BCl12Y8tblUqgyp4r0El1T627kNMhz9z%2F3FL%2BZYoDzUABUJhbLc%2B%2BqpDgLjKux5UHMNyMUznGxW7V5TEKEuXsGI3%2FsiPfaVYp%2FPQEfJAb%2FcYXDaBJddepRHhsA1TykZoAi3tR5RiDVoo4356SI9kkGHCn8NbqBJMkdbt5nmdEpiEYyGa5t7np9X76k1coLPuqg4hAdetne3oqG0T5TDSkG9%2FYapuztCXIpyKYzYBpee0YnsXiAHxIoPxS6w8H8wdTYyH270NZqGQdg5ieaNnV3Agkntg6z%2BDZ0%2FQkfZbSXA95CGnzWvK6V1dBovlgPUacU8AmB92DHJILFtqHIXrQb6KQrdjqEMLf99c0GOqUBVhVg0W99liUO4OpQVjlW1CVCvOC%2F0IOJB35f%2B4uD%2B20Nsu83PlM4B6ahYQ%2F0FS2O4eD4q8kOZvTIoduEwRolGfoOYzxc3lNsTU7Th49K2ifaPQ3%2BJ2aFkGxsFZ2yss4TQyfEyoiDJpUhTSU8b372wuybaW3GL0pKkHyD3VYKGJll7Ce8N2JBJTjhKqMrIXaDQBkLrl9QniWxwtHPqegCdBgzqFE3&X-Amz-Signature=01a09eef0e75efd317c07d1529dde99883fe27ac7c0ea0c33e55d3d952268613&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SIVVK2G%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCICxgF57RdKNNkqEBLciCSARW96dB0Upi1wTfxEJuhWb4AiEAhRAcXD5ULLk55dailnOtNHCFie6Dpj%2BnsBMXObRHWfAq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDAfuzMWRu%2BKADQ%2BrAircA%2Bl2Gjv%2F7YZXcyroIE7%2BJ5WPJ3pzxjjSk0mUzw7eFDd7nUqTNYsHlcyodnwmTe7o4VsLkSa2cGmGX8nyiOwxAaZ9zeRf57RIZAvBRiPgjCtxWWu386RxvI2fWp5Xmta3tgBbQxdjkcXeevEAvXu22saUbyhTx0RCgJ72Sbnw1DxSkJqJPLAsIYMVILt0sGn5sXom5lUAnQ2lFRzQdPZ89ZACIySAaSIQdwiLEDrqW8P645I%2BunZXR5aJiDg1NpkO1kt7wNUcY%2FsmEQVPaL7Vj7Sru4N2rzDWnFvRRNSWsYLWhZZdH3pncEzH3mnQc4fqRyyBgxyazTp3zLWMrgQGVnwNOtvkaa6OSyU%2Frx5%2Fu%2FOLqOiMwClwzSade3nOaISnCXDsT1JCzjHHWUK7s60drT1IHAEhm0oQbb%2FZS2kMt4V9OWiS3760gYJCVIxa4MoshznrXzGNN0o46u5balvB3Oml8RuXmvSZUeaNGPohQlb9eGMOrUlK0FGWeFUEHzGDzsY60hgsONiuRHSNnNSvHoy6UkWSmZL%2FTfEr4FatsSw7VZgIpt%2BkDNW%2B4MhxXbJu3yB8Xn2oAJQnyvTCRDkIIHrXh%2B9DoeJTLueu4AWDxi1JfibKFFhzp03OAlpjMIaA9s0GOqUBNOO9FZjyQtcOlCFvEun2xHNgaPaIOcHt40DtSRHYq3GH1PZXeD4YdoxxlqI5AQ7eLkRC9fMPYha8m0x9rhGL30Cly2UFg7HpF9CbyJgN94Fl2MK%2FBxnXbwP36PB6jpHpuXye5DfuWUBr%2FUIz%2F8%2FQ%2F3f6rDdF0073dmXssjswHkNlRlJswPaqUvF00iXk9ijPh%2Fr695St8jHZ4%2FrrcPCiIZbcnqy5&X-Amz-Signature=c677f1a0eb6891e4bb4b36f163a3e71ea315cbf1c4a105ebcf153d4039667f57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SIVVK2G%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCICxgF57RdKNNkqEBLciCSARW96dB0Upi1wTfxEJuhWb4AiEAhRAcXD5ULLk55dailnOtNHCFie6Dpj%2BnsBMXObRHWfAq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDAfuzMWRu%2BKADQ%2BrAircA%2Bl2Gjv%2F7YZXcyroIE7%2BJ5WPJ3pzxjjSk0mUzw7eFDd7nUqTNYsHlcyodnwmTe7o4VsLkSa2cGmGX8nyiOwxAaZ9zeRf57RIZAvBRiPgjCtxWWu386RxvI2fWp5Xmta3tgBbQxdjkcXeevEAvXu22saUbyhTx0RCgJ72Sbnw1DxSkJqJPLAsIYMVILt0sGn5sXom5lUAnQ2lFRzQdPZ89ZACIySAaSIQdwiLEDrqW8P645I%2BunZXR5aJiDg1NpkO1kt7wNUcY%2FsmEQVPaL7Vj7Sru4N2rzDWnFvRRNSWsYLWhZZdH3pncEzH3mnQc4fqRyyBgxyazTp3zLWMrgQGVnwNOtvkaa6OSyU%2Frx5%2Fu%2FOLqOiMwClwzSade3nOaISnCXDsT1JCzjHHWUK7s60drT1IHAEhm0oQbb%2FZS2kMt4V9OWiS3760gYJCVIxa4MoshznrXzGNN0o46u5balvB3Oml8RuXmvSZUeaNGPohQlb9eGMOrUlK0FGWeFUEHzGDzsY60hgsONiuRHSNnNSvHoy6UkWSmZL%2FTfEr4FatsSw7VZgIpt%2BkDNW%2B4MhxXbJu3yB8Xn2oAJQnyvTCRDkIIHrXh%2B9DoeJTLueu4AWDxi1JfibKFFhzp03OAlpjMIaA9s0GOqUBNOO9FZjyQtcOlCFvEun2xHNgaPaIOcHt40DtSRHYq3GH1PZXeD4YdoxxlqI5AQ7eLkRC9fMPYha8m0x9rhGL30Cly2UFg7HpF9CbyJgN94Fl2MK%2FBxnXbwP36PB6jpHpuXye5DfuWUBr%2FUIz%2F8%2FQ%2F3f6rDdF0073dmXssjswHkNlRlJswPaqUvF00iXk9ijPh%2Fr695St8jHZ4%2FrrcPCiIZbcnqy5&X-Amz-Signature=2096c17e2ceeb61f8f728aac062c09febf3574c537c1fc2436ae4c1fb378906d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWQGN652%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQD8zyalwFTYUQDUNtMUofnwIEFnWpsN6hFk%2FXhU31gQTQIhAN%2BYnLo3fwWW4LkqKVgVnJWx8HPDTYn7hnb8cczc03oWKv8DCDoQABoMNjM3NDIzMTgzODA1Igwa6DFInYqlh%2BxWip4q3AOi%2BfZFQqNJEslWkK8vbu3rebJZ2230zQcK94qNSo63o3CrxTtx0Eno9nc0dU%2BrsI0R96O9vri71IqUAeMFTIEo4YHFyjEAQAuA03ydL%2F4i4o6W9JdFlFz7%2FoPx1wiGQhrFwJaO0Af8kAFrkJBI191Dff6jJ%2FdhQWoFf633nrh00Bbd%2BGotw1kP87T%2BNfkDINJCHpTPLGvnPowkhpKBhIGnrOQBZwv0qAJThfMati6RvJGzWOgyipLNiho45GSR4EdBvtdOXwk5l1kf2LkqldHLd1oHhA7zZvWevqzlb8jWQlsfHTem%2BqsB77Mhw%2BdUlkojGIaBGkn9OJGATL3wEXL3P4d7aj5S%2FrfU1seXVQ81Y4OrAGi4YlQ62o5sbL1ECEe5OriggDVwh45VN7%2BY6oPfZYLCoQ9rFONCi1Hhsmq7oDVFOyIHCf9crft40UgSlATGc72YtviC6uBhDmimwEtPU1mFOXkvoo8cKjeEVHlQ%2BzcH%2BCIRNBLLqI9DdxqbLcu%2BBeecp1XSVpD07rLS4r0GGFAYHoOmariASXw4bPQJrKslpKGvfrLB%2BOciNlly1du5CCS%2Bs0%2Bbh1dhel%2B18kHZg47MLn3S8qKtFg0qz6%2BHTRIMxnkGwDxUJQ0DUTDD%2F%2FXNBjqkAb%2Bs23%2BaXrICtbTdD3jwThsMCJ8alQTpckPq9QoI8sdXdBXqf%2BysINpUDPS3VTw3smboDqHiZJ%2BTvtQJmNxjDOIrymk5%2FE7I9XSr%2BXcP7GHmN584r7FK%2B0avgd%2FfBJ%2BIHTHEpujT4ZEKTSpPy%2Fba4CiBhRqFS36n7T550v%2BpJ02U%2BAfzugE%2F29AoQ7akcHb3LNTQE3VhR5wSpk120uu%2BGQsJz4iW&X-Amz-Signature=a7cbc82f6711f86aa924c53658dee2304ae875fef1337b691f3b518a343bbe98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IUUWRSH%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQChzb1KlSSYWi8pM4P%2BubthLQywVve3QZ%2FZimI5arrceQIgfkwa9kwiv3jKaEWUXffnRCCBEwxCTWctsst7FPNKiqMq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDM7ZTQEvLH1XuJ87sircA6hup2lZpnPqyRv%2BPQCkZSoKeGVcQbdJSLZsSv%2Fi2z%2FTz3pTx218MSzA0emoCSmUNSbZJ2A62FN3td9GYgeJL3HuWIQfk%2FxolUfkyJK3Cg%2BohcuXJjr%2FcLRlui0MA8KfPK7iwB8a0C8h%2BI%2FjVvQnW8lu%2FruM79nbLnp7xn0lc7J95UXAprIaYO7nrREaNUTF8xWrYbn8LB5KmjhmnaJlnooQ07AYpfG%2FySN4q7SRyVWLY9%2BWFxUBeYEEd4QGKI8ttIX9A6D8zDIcuj4C4fAR8dLwSIOL0iBpeWn94fvyzDbNJmSMmYjTq5WndsHigqlEDmA6wswolZvXc3hvw%2FHdjnIzcYyBNwDy7jbwDv3mKJ7SG2bUjv3ErGmUavz0DkrBc6qlODxOLRhbMKPU2g8zMqLt5K58bJRaQnULSlaxEcgVPTTabN4t5JOhZpZ2L46SF7GCW1oj1WqVXPETcTr2Pqy%2Bahv7tR6QaTHuMZI1Nz4jfhfcaVizhTsqIur5Tv41IuBH26D7xDSgTB8hOcevj%2Ft1lgH%2FxCVyj48PvNQI2WuX0h4D7B1hTbXI6CHBqreC9abjzYMTWBlyly2%2BdntffzDRh6NMXu0Z%2FKp43fhfBWC5cDlzBhi93xuK0h2mMP%2F99c0GOqUBrygo%2F6OqaYUfEgAUtI0XPzT%2BaeBQULpWw%2F4GE2ZqGK7ey9hn5VBtnIDOxkhboAs%2Bvum6ngkeDPBHRxO%2Bg%2F1JHH47nkCd%2Bm1FM9yPIh%2Ft4nEElLar8fhkHn0%2BQn6kD3l41x7IpwwHb2sG%2FHivYWcgtqZyL4BQENcOmW0uN9e7mXSVi0A48ia395%2B3dJZD0nr8zuHuHVwf%2FB7yOtpEPbYTRm%2BB8kkv&X-Amz-Signature=0f232d25d6873fcb828cf6d062b48dc0fcc58b1f1ddc09224d9e4ea01be578ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ISZ5SB2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQCn9lnpf8l9LcUEJDmwGwxAqo5FsrL2af7gHALF6Ox3OgIgT8Eqxs%2B0Y9WkYKCzCXJzyuQm3rUWTvMr1YpY5eCl47oq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDEhWlIJiI%2Bi7skPDqSrcA8zIFxfAeQCkNiSygrqPrs435ixcHgpBwxvb4s96uSS%2F8uCiJ43456t%2FJ1bhzl9pDU8UgERcclGB7A1bdbIkzhX%2BYy4uKBvrRY0yy4NjP3IciGAQ3zWW9XypGY%2FXLvEXsWwUoObv4rtX2WJExfIT2E2MrQf1BuJeJ%2BUT0tGSINt%2F8DvWVMbLEveD9rJ4ivoFSGJwRb8r%2B2jFJoD80JPX9xhQVTjz%2FUbRdNaRarFNKxAQE8jf2A%2FZAI4%2BxU%2BUxxqH2FEUlyEgkoSERvbxAf%2F15b3xIz7zEbPDZG39ZsAXA1%2Btzl64jNOzB8VdVaDsJ76Vg0gKcuoTML8uz4BYclj%2Fc%2BC605hCGk%2BuawA%2FJRdnv5j%2FSnfekkjfkMAw8Lb7AHMAionNUYZOPcxwHk0H1bMlUMDJ7D89smy8rGlgsUGtFKm3je8ZxkhcQZ6paLxrJLiQUPMHZJETFDU2%2BWJWwUd%2F1h5vcDVjDa6EfY%2F7H6miLeQzlbNmaWj7uzFji5X9jVRPdm6ABCs1tYDmVYGqUy0xmV5h5OWB%2BdUlZauWDKtzFZYiWit5tJjEgL9ZvksAgogyBdB3I1oEZrv7lfcO53GBXy0%2BA5GV1f7Lvk1iK7ytb3wPK7Rd0bobBwycd4RnMNv%2F9c0GOqUBcr5hHWxS4fg%2BTc6fwCnH2hiYI7rn9qkXFdftLrtxsyVdWtHD0U4ZxYjQ%2Fp%2FUFuoKa0Lb3VuWeOizu3thgc6e62m%2FPOSYYe%2F9RemWf6%2FE2YR2OjqB0HzHv7XHs8AfjoKITugwvhSlR9eYW3cjH2qUVsVmcSkkcGZ%2F423Li4LTBMf16qrpjpSr%2BQ21vlfsbJv33UjLzf3mjokA8y7GwVGEJy1tOgBE&X-Amz-Signature=cf9fdc4687393f764e7de2c92eec9363e05b1df1e23359f01e93faa3dd44689a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7L2FKVM%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIDxY6L4ODa1GOzbDdF6JUisN3J6Bfhbc1Iwem67Og45iAiEAjFppoMi7YbgM3t%2Fr3V8pam6Wqz5L7Xygs4sR3dkdftIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDBLNWjGuCBam8X9OkircA3S96mqEbtraZtmS%2B27xfRr5VOZ4WT9lAluhRIg8Olu14nDQH3rAnUxwOG8aF%2B7giSEhkXwnLrZIbXAMlD5SQTSxUCZR8wp53m15iW9kltllb4PAg9bSa%2Fp6%2BEuXlZJdyhOQKAInt8%2FE5kF3qYUNlm6fphMImILkXeinMElwOifMyPZc0%2BWxYUmGGPTkOH9Zzv9PrkZfs948U0WKL3IjJ7E1hUCUDDGkoOzEXlAGnbxi3m%2FqCYsQ3sNlIeTiHzY1Sa94tPr9yqgvL9th5IZYx%2FMY4WM%2BPr6xYRH428Q0scqs22nmQoVmdSk0qw%2F464XVfksNb8kdajGIgUdRSd5bwFJL4qdUd2lu2r90H3xENSTdmkLR%2B353lryeP%2FlytUOdoHotTEjB9T5Gr1nyEEdF0VM53QFeU4RwEstME4TH8bSQjeJOL0i2%2Fu3%2B%2BO7f%2BleEdzFvC3U1QMi9k%2FXUFcoamePYqDlcr0%2FsX0VyoRswgM3lCUq7koPAQqAnIZBTgsPR8a0lffWixZldKihjIMbRY9cFXOdGYUcqzu3RgGZKcAIcJqHaXoUW1kOs%2FOL1TrJeyR%2FRzWEBEC33M3R%2FiQ%2FOvGAtR4dUSW5ShOhW0%2B%2BIQa9GFegE6lA8PMEy6toGMJf%2B9c0GOqUB1W4oPcy5Zh9Ga1s9zT5%2BQdeig6zLeMDSJzdDk02YA%2FzhYogYn8fmWfd5V13vJdPdsAaImoLTtiXAyKpvWKBNzvWlYnMVIe2bdI47WVyiVev%2B9PTfg60JajjmgntZNQAVjWiLfnUzezm5oXzUIERBV4dJOs6CsVZEJ5SuEj%2F8CT4z8%2FREEtlpgjVEexUS8pJ4Hlwc0w6U8PRgN%2FGIYU9%2BDHUJ5YjJ&X-Amz-Signature=7d0d14dfdf08817e7166fc733273a94496be48ee5c4795d8e5b881ac3972ddfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7L2FKVM%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIDxY6L4ODa1GOzbDdF6JUisN3J6Bfhbc1Iwem67Og45iAiEAjFppoMi7YbgM3t%2Fr3V8pam6Wqz5L7Xygs4sR3dkdftIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDBLNWjGuCBam8X9OkircA3S96mqEbtraZtmS%2B27xfRr5VOZ4WT9lAluhRIg8Olu14nDQH3rAnUxwOG8aF%2B7giSEhkXwnLrZIbXAMlD5SQTSxUCZR8wp53m15iW9kltllb4PAg9bSa%2Fp6%2BEuXlZJdyhOQKAInt8%2FE5kF3qYUNlm6fphMImILkXeinMElwOifMyPZc0%2BWxYUmGGPTkOH9Zzv9PrkZfs948U0WKL3IjJ7E1hUCUDDGkoOzEXlAGnbxi3m%2FqCYsQ3sNlIeTiHzY1Sa94tPr9yqgvL9th5IZYx%2FMY4WM%2BPr6xYRH428Q0scqs22nmQoVmdSk0qw%2F464XVfksNb8kdajGIgUdRSd5bwFJL4qdUd2lu2r90H3xENSTdmkLR%2B353lryeP%2FlytUOdoHotTEjB9T5Gr1nyEEdF0VM53QFeU4RwEstME4TH8bSQjeJOL0i2%2Fu3%2B%2BO7f%2BleEdzFvC3U1QMi9k%2FXUFcoamePYqDlcr0%2FsX0VyoRswgM3lCUq7koPAQqAnIZBTgsPR8a0lffWixZldKihjIMbRY9cFXOdGYUcqzu3RgGZKcAIcJqHaXoUW1kOs%2FOL1TrJeyR%2FRzWEBEC33M3R%2FiQ%2FOvGAtR4dUSW5ShOhW0%2B%2BIQa9GFegE6lA8PMEy6toGMJf%2B9c0GOqUB1W4oPcy5Zh9Ga1s9zT5%2BQdeig6zLeMDSJzdDk02YA%2FzhYogYn8fmWfd5V13vJdPdsAaImoLTtiXAyKpvWKBNzvWlYnMVIe2bdI47WVyiVev%2B9PTfg60JajjmgntZNQAVjWiLfnUzezm5oXzUIERBV4dJOs6CsVZEJ5SuEj%2F8CT4z8%2FREEtlpgjVEexUS8pJ4Hlwc0w6U8PRgN%2FGIYU9%2BDHUJ5YjJ&X-Amz-Signature=82e12d83bc8b9ce3795aa775cc7569ac1a3742b0012077f43ba96b9947e4753f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGI53EPV%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQCByLg2tOJM8lUAJkWs74SetsBNsezpcPUA4n9NUsCYtAIhAMBPiAvkq2vmpr8Gdu4JsxQE0RO7US40e2SxCL6LF02NKv8DCDoQABoMNjM3NDIzMTgzODA1IgzqB9t6wktmFjNvxoAq3AN5U3ouUR%2FhcVQ8S11OKuaO6zP1HRBOHoXuBAi9oBkjXXa7ysuBldy4cuisElJ3feRHfNUOYQF9HizF84nQAwg9bmbn3e2DAJ4szSIFpyssmklMrqvlGzVzRKDsJn6Ul7x2X%2FkcLVaATkK0yrG7r%2BO1pY8PTpttZYxQoSe%2FC5y7KNhDUfORoN%2FoD4UjGQMBSp1uiRfJfGN3QruRs6kSB84QweGCHn%2FuPnkTlLIJvcLlsgJs05x4bXYDkUlf3WY1CkuLztPp%2Brr1NtnI8blv6uXvlQE9pDO3bWrenYX7OYKx6b1QZraVMHCc9RQTJBJEPaZ31m5VZkjd%2BlLDYbT6Lo2UwyCj6iJr5CjvTibgrrBDHweuXpx9TjK2fXU1rZLG2FhnyNvLuwu4dIgpzMqd2DuRL1b7k3SptUs0SxwuVM0qY1sw2HSOzxuYBR2IqWeDZED9HnVc4%2B0y9ubeg6awCGUd4bq718q8ELIRbePg7dZzoAhb01PyHn55wCrjytBH1%2BuNha0VCvQxRkXc2NbbJaIRKD6I2QtiWqoEetJnIICpKefDgUiiiH3v5KBCfl%2Bip67K3IkcyZoo7nqxB6DejgE72unDr10LhNeYxkcydfa9uXqndlRqoD2xA2rrCDDu%2FvXNBjqkAa0iMK8ECfr7Vmr2SM2jT5XIKn9fnmBxDk1KaZbQAjcWsFx3WKC5vrZ16BUUkzW2VI06TTlSdPq%2FWO85dyunubljmXh2oEqUsnsT2wOQmmd9LSE%2F%2Bon%2FxVvhFafxy6k5N0hgSmQCje3vVBd1zKYSpJDytGcG9YDZfyweYfmKF%2BcfLXs89vh9CVxY3EcINEiS%2B3OFJkopkZuhWCWi7xQaM2mzwnD5&X-Amz-Signature=d6807bf08936a1b3797e8dba009cff23bfea739b3a7699abf3a9961be11c76d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLRI6Y53%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQCirlgC8USAQNn5mfBLlqW7Yx%2BwaZnBZVEPCquhuaJWBAIgCgeKtuV73Ngu4kT3fsBlqY4XUL1AdRHM9eZ9dwZLmDwq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDK%2FIaO25e91V6v3jxircA0KbnTMHyQeXcozC7C27bQICc%2BykdTkwm3slhDdUHwmeNhOMwwmpWtKrxNcOm149ZWjxf1VhmkUNejmDia2wMniV4PC0cH%2BTbGNuAmeLMCh6ZZiN2azmr%2Fb1B8T%2FgxledLaz1baqhM%2FT9TugCOUdOl1gYGu8n5QcAT8hYB4ONY8IV%2B8qi3Lyt3COcCruSgs6F5xDzfVFcB34ae4jlaSTOOzRvFgIdJHxhgKrPUyORAJen01WmVEwo2rcgZNhdOrCUj8p3YStqX6PaGE%2BpAV%2Ba9CQEq32khZEok7xPEBIVq0Tl7Psh0Iu2FAJBK7A110xcQwLpLCABHB0rL0IBF8Ut3B27cFZyu4BwzZ3y062L7TNkU48wXxOv81CXbBpjzWAa6pFK4gK%2BE8L0txiI6W4cHlPNuAhxxu4oJGY%2B%2BIBAk0Xo%2FGCb2RzAMTqzcZVEyv47Ycf1oz9NHqIpxhKG3nCnQf3e3a5zr4lwHjVMn9rc9zIauAjYWXifV4JK%2BCDAqpR5lw0Atl43I49cwOCxk7v9MdGrFn4gB4iN4RPMbHiI0rOjwlSRhLEjZeXTcJ1O2m0FYI5RiSz9wA%2BVC1AMMOnDhivQF966GuboSvVN4xe12i1TL4qRqXFaBdGxkRMMM799c0GOqUBCHFGSDcMdpue7aBRAO9jEPAI49iKnoOHr8B3mmLV2kl1T0qr0AoZFSFEBfTlW0gpnvygspvX8hFSO89dHpUxSVXhaNoZMr093HIQNDVMRbWpsRPznDcp2Sv0gms5Voq2g0WRYyvnTS8KxDIuR9Z4ojv4ICMr7sAKXA3pN01%2BXc4X2hfUSIJ6%2Bmfbsi5OuqI9m4UYY4rKUZ%2FXpTFp8UpGHzUujOoH&X-Amz-Signature=65a7d78a6efac1836fab721eb944c700eb588b777d8b0731fca48a87069f0872&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLRI6Y53%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQCirlgC8USAQNn5mfBLlqW7Yx%2BwaZnBZVEPCquhuaJWBAIgCgeKtuV73Ngu4kT3fsBlqY4XUL1AdRHM9eZ9dwZLmDwq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDK%2FIaO25e91V6v3jxircA0KbnTMHyQeXcozC7C27bQICc%2BykdTkwm3slhDdUHwmeNhOMwwmpWtKrxNcOm149ZWjxf1VhmkUNejmDia2wMniV4PC0cH%2BTbGNuAmeLMCh6ZZiN2azmr%2Fb1B8T%2FgxledLaz1baqhM%2FT9TugCOUdOl1gYGu8n5QcAT8hYB4ONY8IV%2B8qi3Lyt3COcCruSgs6F5xDzfVFcB34ae4jlaSTOOzRvFgIdJHxhgKrPUyORAJen01WmVEwo2rcgZNhdOrCUj8p3YStqX6PaGE%2BpAV%2Ba9CQEq32khZEok7xPEBIVq0Tl7Psh0Iu2FAJBK7A110xcQwLpLCABHB0rL0IBF8Ut3B27cFZyu4BwzZ3y062L7TNkU48wXxOv81CXbBpjzWAa6pFK4gK%2BE8L0txiI6W4cHlPNuAhxxu4oJGY%2B%2BIBAk0Xo%2FGCb2RzAMTqzcZVEyv47Ycf1oz9NHqIpxhKG3nCnQf3e3a5zr4lwHjVMn9rc9zIauAjYWXifV4JK%2BCDAqpR5lw0Atl43I49cwOCxk7v9MdGrFn4gB4iN4RPMbHiI0rOjwlSRhLEjZeXTcJ1O2m0FYI5RiSz9wA%2BVC1AMMOnDhivQF966GuboSvVN4xe12i1TL4qRqXFaBdGxkRMMM799c0GOqUBCHFGSDcMdpue7aBRAO9jEPAI49iKnoOHr8B3mmLV2kl1T0qr0AoZFSFEBfTlW0gpnvygspvX8hFSO89dHpUxSVXhaNoZMr093HIQNDVMRbWpsRPznDcp2Sv0gms5Voq2g0WRYyvnTS8KxDIuR9Z4ojv4ICMr7sAKXA3pN01%2BXc4X2hfUSIJ6%2Bmfbsi5OuqI9m4UYY4rKUZ%2FXpTFp8UpGHzUujOoH&X-Amz-Signature=65a7d78a6efac1836fab721eb944c700eb588b777d8b0731fca48a87069f0872&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R64VBKTW%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T182859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQD4i8L85p0ztKltfwHu1lbUdXFxZXuOREhwmv4oSHdbGwIhAONp%2BkmgLhkszqX9JtZe4Vm8Fbb4FRFEBeSf4VyeaZvfKv8DCDoQABoMNjM3NDIzMTgzODA1IgxUVoSnKPzIwgjJlc0q3ANZvqWnTXCWopodeBw0YT9qLUzgJ5ipGQm%2BA8jkbjnik9tIWZ1XgIm5XB%2BxcnBqSom2BYpUH5U02Qa%2FD38Vsc44NhjTpWgbQEH6Z7CtAdQNCUO9G0ZXZFxpPdn3KGtQFCsQr3FX8IWik6y9ceN8Yzb%2FHDWQOv7WQ2LNa7Nc8RgnnJGHPnkyrLxklNuspGpvRpF%2Bed4ggD2obV1hNSEjkNxu2vRLGq4ZigGhm82XQaHKOIwhDIKxQUoySJUgC4Up%2FBc40fl6TnVkqAxlf9NToPO%2F507hLaaP37%2FRrhx6vp7h70mG2jhU%2B%2FaCNAwnOKizrw5%2F3gN6f4IUVdj9BKQblZI7mF9HQgR50IeGUZR0FDdj7dG9NCoqw9dhubeP8KT7svyug3uc5GOZvpyuVP7sEG8vFfalYSomfu9DOJagPPRdzFahdIuz0huU5BmWYUi73KreGi95jRQCw03ChlydznhI8MtAxnn8PDsn7T9N6GUuz4KMMm6o6NSwcWNoDelNmy6nvJBGe5BloS9BGsJLFi016ZXxD0Bkm6MMIjkZH1Crwq%2FovoQ9EVfIPloqso%2F9Cv2FZVFQmUY6LUg3f%2BkuV1gUxZBtXFPW1RMk1uDMn1cAY0Ahtnyyu%2F7CywGYzjCY%2FvXNBjqkAXgOeWKQApwQScUUBLYF%2BwydDxXgnYRolfqu9eOzCoeE72Jbm%2BCrE4YBgCrMOGLZms2RVqSlnnBi4BPbu1wYiAan7I%2F%2BMEVDChNf1pT42aBeB7A%2BKrWxkmDLCsvNmIbVS23ju30IgeOOv47lHUOp6S1RZcrECESHkMuqbP7B%2FK%2BeICNA8Nq5FBi2w5aip0jq%2BdNInxczzoqsIbLoEd5Reau6tXB0&X-Amz-Signature=2d51498dfd935d6c3bff7429325d2f2de47a1ac0eb9d21f9288a11d70b545c9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

