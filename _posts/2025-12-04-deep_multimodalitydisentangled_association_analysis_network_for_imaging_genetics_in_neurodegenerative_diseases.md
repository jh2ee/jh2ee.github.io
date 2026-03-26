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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MO7EDI7%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIFndhKUVfSFAqUxd1Gksk5neRU0iV6fV2qSbN2koJq9hAiEA9m25vTCNNJB%2B5RmOZv44Bl4z8Ov2o69xyOcJHZmgTFMqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIAfvruKxrDLoAHH7yrcA9C6qrN%2FFRY%2BZXpJvh%2B5SbxOG%2FMuMjuMPiCR%2BPoCk2qaYWUKJuhop32xg2zRu8fLSIwhnfuOwiMu9zDkld8hMjwJMf2KsxV2xonzNUH1zbfXix5NUKKOtahY6nGhQ61LeSGe8sOLhisSSLdGW%2BIg3NbiwwFxDchwzuwC%2FvT%2F8KGNHoDwMwWCVcOC2JWwBoWEmm%2B3r1e8apUqrS%2BSBSJf2coAzT6jULOkBy0ms6GTsByJwiDSY83dFaYD6pketX83kaeKuoV9oo5IHi0F0Hs%2FrQwElE9wVvP22uSd5hEnLXYvYB%2FvRQIdBlF%2B%2Fy7%2FWBYgNCL4MYFhVAu21E5jrKBh0BPofOheAFuA2jJ2DZGR7tocEu6y03%2FixdTFGJynIFJFH6i2pAjyQ9jR%2FtrfwD92ufBdIDBm2MynhBSmkYJjj6qOzPrZoavJoDgRqxq6NHx3ODbIpRjPR5tOVDqvzSAdtBl7Z58jUrWHwbe0u0eZr5BcMPw19iacarkoT3nYMXNR7gVYFJoLqTEPSq4dCDkRflTkTSDIRyrxWnV1MKaOk7ZAsJqPbFWCKsCZ0aI%2B%2F%2B6w5jeCbJ1HfBEcD03WMtqpR4R7m2SaF9%2FOLESR4w%2FnEtrycqvI0Zm2sB08H7cnMIqxlc4GOqUBtnyF6%2FlbN4lqMnkbevJqvQT%2F7psDxKMjGC8S%2B7COFWGpIm7SWK%2Bis752o970whtl0RhILj5kaV19%2BWhwZZcC6HppUdxDO3PZKj%2BGgjfKz4wJCNWm%2FHvD8TWgvvn0WKhcwis6lqEF%2FzSjHZeLqOX6w2VfpN1cNw3zwSj%2FDdtdsnwSntCkfrnSzFc1IN%2BakY7rSPdVIL0C3%2B1L37LLfAKLqW7NifyD&X-Amz-Signature=44cc1ee8cc8163cc0a0d4b592d10e7b08b4f4d64623f2be112aaf65c71997f12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MO7EDI7%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIFndhKUVfSFAqUxd1Gksk5neRU0iV6fV2qSbN2koJq9hAiEA9m25vTCNNJB%2B5RmOZv44Bl4z8Ov2o69xyOcJHZmgTFMqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIAfvruKxrDLoAHH7yrcA9C6qrN%2FFRY%2BZXpJvh%2B5SbxOG%2FMuMjuMPiCR%2BPoCk2qaYWUKJuhop32xg2zRu8fLSIwhnfuOwiMu9zDkld8hMjwJMf2KsxV2xonzNUH1zbfXix5NUKKOtahY6nGhQ61LeSGe8sOLhisSSLdGW%2BIg3NbiwwFxDchwzuwC%2FvT%2F8KGNHoDwMwWCVcOC2JWwBoWEmm%2B3r1e8apUqrS%2BSBSJf2coAzT6jULOkBy0ms6GTsByJwiDSY83dFaYD6pketX83kaeKuoV9oo5IHi0F0Hs%2FrQwElE9wVvP22uSd5hEnLXYvYB%2FvRQIdBlF%2B%2Fy7%2FWBYgNCL4MYFhVAu21E5jrKBh0BPofOheAFuA2jJ2DZGR7tocEu6y03%2FixdTFGJynIFJFH6i2pAjyQ9jR%2FtrfwD92ufBdIDBm2MynhBSmkYJjj6qOzPrZoavJoDgRqxq6NHx3ODbIpRjPR5tOVDqvzSAdtBl7Z58jUrWHwbe0u0eZr5BcMPw19iacarkoT3nYMXNR7gVYFJoLqTEPSq4dCDkRflTkTSDIRyrxWnV1MKaOk7ZAsJqPbFWCKsCZ0aI%2B%2F%2B6w5jeCbJ1HfBEcD03WMtqpR4R7m2SaF9%2FOLESR4w%2FnEtrycqvI0Zm2sB08H7cnMIqxlc4GOqUBtnyF6%2FlbN4lqMnkbevJqvQT%2F7psDxKMjGC8S%2B7COFWGpIm7SWK%2Bis752o970whtl0RhILj5kaV19%2BWhwZZcC6HppUdxDO3PZKj%2BGgjfKz4wJCNWm%2FHvD8TWgvvn0WKhcwis6lqEF%2FzSjHZeLqOX6w2VfpN1cNw3zwSj%2FDdtdsnwSntCkfrnSzFc1IN%2BakY7rSPdVIL0C3%2B1L37LLfAKLqW7NifyD&X-Amz-Signature=44cc1ee8cc8163cc0a0d4b592d10e7b08b4f4d64623f2be112aaf65c71997f12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKTVGCL4%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCIGPcoAS2lspjw6beou7FMSbBdeTFHgQxicLrKJlTHVv2AiAL1mLrF66L97thKR2xTqL0HpvaUaOxLpEAwSyZXlZBuiqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtZ53sIJ9cPAvTL6zKtwD0j17VN3z%2B7gSeyezlniV5OcPyvoYQxo%2BcaVGQnuuNr8xy%2FFeLlxBySCDTxbXU78r0IXdCbv7lV0VwrirkmDj9uJWE3qOpyclFcQk60U%2BZeuDwRqhgrhkTO9JjD14NK3BoDsOWIR0Xu1l7NfUUXUgsAI0OXMgyPaxbPbJ8KBsfMjh0Kp1ft%2FIuqZxIERPdplHe%2B4kVppMdh2BgCogMVy8wKeAAOIYxTZqxwtwfxpw7fE9XkE6A%2FAzk%2Fd0BQFM3%2B%2Bh8o9hJw7GcbMjW8jjXri51OOUoyC8%2BhoX%2B6G9BqC%2FcZLwTbRoxjZ2wpxGchdTnio675DiBVAK7gYvQUxhLC8iNyPNpCE7utIjHZyK7DYRzitrS8jMDbWGT6th4zllEzj2e5m477UQiYNyCKaTlzQGQWsgcv7xEh6VdmXEUqoNgWeDCa2uQ5lCE%2Bq9MVzp%2BpbcPEr6r5EwpxIX%2Fm09%2FFkL5Z%2Fbkw8zFNl1yOc2ev5hF4e08RjoUHNxuhmSQRpuzocbJb8PDvb7XGPVA6CTpWJjEFgNE%2F6%2F%2BiTda6z1TsmWDTd38DyvcuwUbeixc1EkbKW8v5msrmYKgYxMDSgiwtBLfJkKIoGrwIcGPC4L2gZEeLPE0jE3I9z97YH2eGgwo6%2BVzgY6pgFDEDQgxofw66SEyTLSofLJuxKI5mi3pvTjz%2FNvgMnc3AP3LPiPF5YPusiV4qluRPc3RCdUrGQKcOsfQzL2CNlk4yK22OEkfdWxeBiGAvPGROZHA%2F5AX8zK453eMbYwiWXniBNcTpec7DxinMhgpHxizcs7fHyfBrVGTpm1u%2B8SXsJbDMF%2FpR%2Bff2emJ%2BNpEtizVt6UXZ8ujGSiA1h9o%2BjFZdbAdpnX&X-Amz-Signature=37778bbdf3e159b83240023d71dd159acef50e1f7fd3cff66e0e5792e82c8fe9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7A5SP2E%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQCIMYgO%2BVCyjOhbiL%2BQVpzD4l49XPU7XH110Ftu8lOW1gIhAPsOKsMRUOuCQh03%2BIdt%2Btq3PXjCggHxfatdMfvE4P4CKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyBqxBnVW%2FemvG9nsQq3AOu6wn3sc8m5ZgMX6AK2f%2FCRpZh9eyZNKtK7CcUfo79DPh6%2BMaikL706M8tJ7qir6Yt%2BFocXjuF4uKZLCPU0th7byEycnTHwM0HHju2XFMw%2F9PyvF5J7F6%2BNypSBA3Eeyb6gO9sJ7JlMf2kexguOrRc5hjNQDX6N3MKqLNggifF5bnK93eFs3muFOXQo5oX4LmqkIUeyi1nHzRR%2ByuAMAJj5XdItPIN6XDMQRoF7Fy%2FDHFq8TVzpC%2FaZ4de7d%2FDrjWWi9adg0Ue47PnC%2FIE2bqv4sLzZ5waHxgnR6tI4to5LbU%2B6ugOG4VvEdbzGfG959Sn16boNTRjC0Ogq1ZkH%2BIhIxgn6lCXYDvm%2F%2FkbjD5rFrYTPd%2Bh8wfBXmEJ3NO8FerSpii5mAiqtsW8SaDzcKqPfnssFqHC3tArdohFCslk9KUOf3CrCGV53azjeigBJjNCcnHx3yNSqGHuB3iRn2WDGqmJTzlX2yIsN1y6jImx1kCSO42QLle9%2FOBKRemaP8O9Ji4h5llz65ZKLyf8O%2FwuTrK%2BtYe9oAzpcFUdt5m1eITHHJN6dFff6SaZywW6ejCtGvbMOmaxepKlL3Dx5qoks2Z%2FKstIFci%2BMIjnz3lgT6%2Bd6vyjuKpNHiUyVzDasJXOBjqkAcFmrSUl8TtI3xQcn7mm8n49po21DDKnbo%2FEz8yUPitTvauFbLxYu7No0cpeJkRy2xkO9GWrAvkdoJEV1Nvz2Ve%2Fpy0E5zI98ZrY0%2BMRIHvO63ZeWCGCwVpKWfogd266FqYXYni3VsDm4DGmxYJUoLI2%2F8SDNH63Ed3EhgZXnWgeK%2FPWNUtT8LpYgtbbP%2FEbUEqwh8RO0z%2B1xh%2FeV3Nk%2FQhuPrGl&X-Amz-Signature=2ea0f0cdaa7661fb108803fe3bd8230f78b09a5ef71c0c5a7a28de12749936a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7A5SP2E%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQCIMYgO%2BVCyjOhbiL%2BQVpzD4l49XPU7XH110Ftu8lOW1gIhAPsOKsMRUOuCQh03%2BIdt%2Btq3PXjCggHxfatdMfvE4P4CKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyBqxBnVW%2FemvG9nsQq3AOu6wn3sc8m5ZgMX6AK2f%2FCRpZh9eyZNKtK7CcUfo79DPh6%2BMaikL706M8tJ7qir6Yt%2BFocXjuF4uKZLCPU0th7byEycnTHwM0HHju2XFMw%2F9PyvF5J7F6%2BNypSBA3Eeyb6gO9sJ7JlMf2kexguOrRc5hjNQDX6N3MKqLNggifF5bnK93eFs3muFOXQo5oX4LmqkIUeyi1nHzRR%2ByuAMAJj5XdItPIN6XDMQRoF7Fy%2FDHFq8TVzpC%2FaZ4de7d%2FDrjWWi9adg0Ue47PnC%2FIE2bqv4sLzZ5waHxgnR6tI4to5LbU%2B6ugOG4VvEdbzGfG959Sn16boNTRjC0Ogq1ZkH%2BIhIxgn6lCXYDvm%2F%2FkbjD5rFrYTPd%2Bh8wfBXmEJ3NO8FerSpii5mAiqtsW8SaDzcKqPfnssFqHC3tArdohFCslk9KUOf3CrCGV53azjeigBJjNCcnHx3yNSqGHuB3iRn2WDGqmJTzlX2yIsN1y6jImx1kCSO42QLle9%2FOBKRemaP8O9Ji4h5llz65ZKLyf8O%2FwuTrK%2BtYe9oAzpcFUdt5m1eITHHJN6dFff6SaZywW6ejCtGvbMOmaxepKlL3Dx5qoks2Z%2FKstIFci%2BMIjnz3lgT6%2Bd6vyjuKpNHiUyVzDasJXOBjqkAcFmrSUl8TtI3xQcn7mm8n49po21DDKnbo%2FEz8yUPitTvauFbLxYu7No0cpeJkRy2xkO9GWrAvkdoJEV1Nvz2Ve%2Fpy0E5zI98ZrY0%2BMRIHvO63ZeWCGCwVpKWfogd266FqYXYni3VsDm4DGmxYJUoLI2%2F8SDNH63Ed3EhgZXnWgeK%2FPWNUtT8LpYgtbbP%2FEbUEqwh8RO0z%2B1xh%2FeV3Nk%2FQhuPrGl&X-Amz-Signature=a573af509be35dc568cab6a29d99865ae72ee373110f67214afb7e2358b6b7b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPGDW7BV%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCIGVxLklsBsXdtohExNf3sspZzXfQzO8iS%2Bbl9i8g4jqCAiA6iRkeX%2FELM1xRa2k7ij4sk1DcFRRpFhMJO%2F02RGkl6CqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMskpTOijlC9vhAKhiKtwD2BuZ1rUOG0UT0VKVt0rJF%2BX%2BckLwEx%2FsUHHLbYhmvtitDgcDNm%2FfSVUF1CzPfpWqhgHIra9i3SbU9dHPGScqwsBu6Hl0NSGfrNHayQjznVU4zkghgUxybaapkGHe9kFQUmryo1Cclvooz8y8DkOGokQ0mQf%2FeTrC%2F8w%2BXXqXGs6ozn2BC0rnmFg1vVxNvfpIEtBfU%2FowbP3x0h4RCbu1I3%2BQM0%2FINPxax%2Fwn4KW0u7Kj2Jq%2FCo6E2oEVlpqxbW1LzhPvmki3sBb8u%2FED67dCVyWSPQuiC0Y8K3wlRS4LSL9lln8OFU3nbLHJx6%2Fsl0Op0BsD5x4oC3vyDj%2FyXmLAwAtvpPptp13XAjXWy9OY0%2BHKtLQ1U%2F6tAzQFV8bC1i0dNqfQ9dZVv2UXn9B7PP9qaCbqgK64utYDRhSDNBGpSQ0peyNxb4c%2FISgywlhDuX50ERyFh1VelwoNeHuRI1TpscAotugOKv0GL15iz6R0cLYNDn%2FGhj%2B4BOiZSgCqMrDJSTjfKzWNAYbtpYH9%2FrXoYOX%2BK13vgE6cH5CA0uGeQxrF3QYGl%2B22klfQRhufLr7RoR0P5NCY0uNd3CG4TIBDR%2F5i5FSiXOq55qUjQKWcSGwwtBAH1ub27kFvLGgwxLGVzgY6pgHUQwWl57Gi%2F7bBt%2BisU6AsHFwnXxg1bmtIlWqtZ8i9ZS%2BBXBHx8aKdValD8GFpJIZvTfiq5t5tem5cusYgALMAk89AucLPteAHAcz4HQyVNHhlRs3ry78Uoyriz52aN96kxGKsHK0KJUWVpvgenL3UJpjDUY0iUWjGuj1ek808PfQZDEY6ioO4nGChiPgiXcwjoX0uNIfkyEs9j%2Fu31YalK0h%2BobJd&X-Amz-Signature=b8c2f7a4e10cdec9761cc975b77dc073c553102486d651843e71d29e76e5fa3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XDIY5TM%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIEOmVfVoQt2mJNG%2Fv3j49NuwIwNFlt5MDM%2BCSx4l82hPAiEA9oM0Gx92LDSSw91COXN3em1dG3YPC59WV6fZYBcFUsEqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAHo5igJNa8fn6gvzircAwduMcIfX9Jth8JDWedTfghEQ0Qs1jWicVcH4sfgvn8Ym4nTGEXACHYt%2BcM2KPYCi9zhNVyKWYErLZw9yn%2FhhqHNfl2li0KGr59iGWCywUkrI56v6BIK24pKWJ4X7CogDdLr2V10eww9eozkk9xkulgcrOfnzjrLb5XMZqgDJ22C4P93E3Z9oVyxcZttmxKo6LxQmsKMd6OB26I75XZQ6KVxqRIUn2lgDN0FNIZOdn8exSjYUUD8GI1D2ZSy3aF5EgjfzzzkQUYPRS7xt1ICCv%2FskeSDgvF891baXWRMwm4Ci9bN39gzbKKHv59t8iZVJonrEZ%2Bf9A36R2SI%2BZXRFTYfuwQo1XY8LzujjvRZXLLR2ArrV7%2FI6stNm%2F0ko1dJr1IEDHJds5vdUM0oviYDtVqj4BNN4jNR5eHatWNWZHVkVxWAPU%2FKED4w%2B1lAGYBRjS4CGfDa%2BKKbDpniGAHP%2BnzSZ1ln7Cs%2FHILN2itMxHFK97FlOCV5jMv%2B7YUizR%2B8PJ9rQdJZiUkA%2F3sDkr7OEYpe9JZhq2pfhmaDoW8wcBaVbwpavBGO9C%2BvQp%2FrmKFvFqPYWSAlAlDqSbqOZqcW75A2vfIAnwn48P91%2FFRLmlXYPWOk%2Bok5J8SaXs3GMPGvlc4GOqUB%2F0foSxUOYPw1Kwiaq1bREg5nIitJXS4lsyliQL8Sz7w9nqNeYSFpTyVy35IkxH9sjR48yIiRsdxs2apHKWRSEV%2FDbIHgYuK2U47sk60NsSwwjGsafoNUs7MfTl3XDG3JFbiE%2BrMBGNoBcAE4NLQFwXKdnZE%2Fw0dTO6t0c%2Foz7iXmaKPQQJAI%2F%2B766U129tu5aw3MuSOjIhnEH6h7leSy565%2BsRmU&X-Amz-Signature=606565fab92e636207508d7437b0ecea7accc52a781f274599219be9637de792&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VOJQ7HL%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQCt1Vw0S1u0lkkNg8vo7LjUl34aUUTYLz3kHJvwyGBgEQIhAPQpoX8qK75Q3IiOxDFXgfk%2BZrU0OQOBmf5rrMRIiQN1KogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyi6HQNbR0VJr5JLsYq3AOXmmCWHDl3hPyTxT846POsnJ3V%2FRTm3PrlLW18%2FIjdrr%2BMF4GjC%2FVAhltBN8k1bsRtB2PfsezUY647wCghYi9qhoShruueqfFJ8eiSMn%2Bxt%2F1OZ4Rc%2FYmwMM2vLmdu0oVpdhaoP6nycnOXMy257Rb3lxQ6DkcgJfe8%2BcagzCOEnwYEA6NhAWUaza%2Fz3gzyhsyUW%2FDQOtOnc6UnT%2BmarlgddjGivmZnVp5f%2BnXlROiQsVdIIm1yhKxNVJGqeONU2rTlT%2Bul9E94zAdmca%2FfKQm5iFLecXqMjmvCn7DaInIiUpzH3RjoeiMsQAvCeqDcKugPwveTPDECZLKktKkqXFWJAqqQo4Js78VkAPWSD6YURWVClapyq0PIuoVx4%2BLQzD4DlM6TxpPN4KLXTwt%2FC85ge%2FEL1hLv1VDKRCcTYBBHHIjpzE%2Fe3XsTGhtm9F3AaCvHNQVD6pfi8eZa65H2kUpKzBGOKVyEcUdzGoNhoW5RxcJWKAISgRXLKX7mhqfLV6E7bfFVUgo1uzCWEDpu%2BuujP8D7ylzbuaROJVC0EmBe7ePVPQDuR7jGQkJ7fDQLM7z984lAAqBqnlHdyncTZIqJDNBlF1ZC%2BA8aPnb1HVSCuLx5lsQ74xQkOrw8ijDFsZXOBjqkAdfeDKGYpzlNpo0RngwOcnclnDaZL0dmAQsEAmdrxkx9UpltkfoO83cBty7BUtJ7L8xpwt0ns8HsgwIl1Sna%2B1NvDxBk%2FITrB3ZAJmPCSKJtKsGd02tnbDBllKZHg3St%2FFITi73Dxfs6wJShX8OyiJBsanPyIaa%2FvPZswMFf09F0CnAW5nVdQBANe1nS2Bih2f4LA32xq%2BrZ7NkpH2AwWpoIM9Ji&X-Amz-Signature=924ee6a6b0075de034c5ccd57f25f1ecf78592428301cf43dffd2635bf85200e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LGXGN36%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQCHrusi1%2BUiyiQmmQr6BJU6PHcgEFBlq%2BrIdQ3flYCmugIhAMVnaPHMCpREGyqkPfHo02UfZgFtCseEn0t7IGB6zBFxKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzkv%2BW5z%2BclxHjvYKQq3AP0PYf%2FSq%2BX2ZVskataSfaZjVkemFn3kKYsHcznnieUrdmV2%2FqqVzqmbDFv6gLviHuO57tCOAWKmUNhpz%2BLAkssPP1Mb%2FtSOGyQgqladB4v6Kq0wb9ATaCXMHzhxRHJfLSnaZHso5RNYd%2BNZ6rg%2BgBpvO8Gr%2FXtKSs2RKa8W%2FH7LqJ48V7qknT1eSJ1yyZr7x7wOIsBJXEzWRtr1KaxLi4BIW%2B5Wx77Jq3tIefsUQgmUQ8hGqHRYQ3V7qIWDN9cySHC1e2zx4OSUbk9LhBOemdXxcANGrAbIBFpqC2yvY%2F6gUsP4J3piVOJBPtrJcrcRQQmohoN0mVXoIm4ZEbKTQpKwoi3BpyrOdLJJSRBA3k5ivtpKqyeTFeBYq0yClo753Dmiq6X1vW37XGplGbASOc2BriEBcjX8gr1EynQuvy5uLbIXh8wLcDvJf19GTrfJIWnfODhartFOKmgbVqzaqgTlL5lxdo4%2BCeaPYE6Hvcx8lilLKOxEwGx%2BJxV5pEqC7BBTgXCPYIYS8SL6b9r4KdrxbFHUfsD%2BCoo9SqaFJwWz53LF6tdcwaIZUQUNWmzWJukojy3m%2BE1mZgZsc%2FDWW90Pwji0S8PYVg5B0yYM1Dz7NIkLDd89bbjvUXR%2BTD0sJXOBjqkAWNxxwOKgW1D1AxlY37qjyYYWI7TPnIFvnMefqerNupP3bHmbcHJe2C455PQRce6VgskRWrOMOhL3ZTeLrV8BcYUu6%2FFZlIPUwampfG0WGt4lKqnUV6z7lHibndGMtJfXrpYFhJTlNWlb%2Fz6%2BC4xM6yZ4J%2FlO4jOw45HMSnqxaREGqs6gTVbVS8kTirtZcUifXu9oGtCd5%2FKWHR4aikfqDfmmjEg&X-Amz-Signature=54cb4611615d5d5c070cb63302298d3e6d37cde0d3100f8bc6c9ebde2bbeec0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LGXGN36%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQCHrusi1%2BUiyiQmmQr6BJU6PHcgEFBlq%2BrIdQ3flYCmugIhAMVnaPHMCpREGyqkPfHo02UfZgFtCseEn0t7IGB6zBFxKogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzkv%2BW5z%2BclxHjvYKQq3AP0PYf%2FSq%2BX2ZVskataSfaZjVkemFn3kKYsHcznnieUrdmV2%2FqqVzqmbDFv6gLviHuO57tCOAWKmUNhpz%2BLAkssPP1Mb%2FtSOGyQgqladB4v6Kq0wb9ATaCXMHzhxRHJfLSnaZHso5RNYd%2BNZ6rg%2BgBpvO8Gr%2FXtKSs2RKa8W%2FH7LqJ48V7qknT1eSJ1yyZr7x7wOIsBJXEzWRtr1KaxLi4BIW%2B5Wx77Jq3tIefsUQgmUQ8hGqHRYQ3V7qIWDN9cySHC1e2zx4OSUbk9LhBOemdXxcANGrAbIBFpqC2yvY%2F6gUsP4J3piVOJBPtrJcrcRQQmohoN0mVXoIm4ZEbKTQpKwoi3BpyrOdLJJSRBA3k5ivtpKqyeTFeBYq0yClo753Dmiq6X1vW37XGplGbASOc2BriEBcjX8gr1EynQuvy5uLbIXh8wLcDvJf19GTrfJIWnfODhartFOKmgbVqzaqgTlL5lxdo4%2BCeaPYE6Hvcx8lilLKOxEwGx%2BJxV5pEqC7BBTgXCPYIYS8SL6b9r4KdrxbFHUfsD%2BCoo9SqaFJwWz53LF6tdcwaIZUQUNWmzWJukojy3m%2BE1mZgZsc%2FDWW90Pwji0S8PYVg5B0yYM1Dz7NIkLDd89bbjvUXR%2BTD0sJXOBjqkAWNxxwOKgW1D1AxlY37qjyYYWI7TPnIFvnMefqerNupP3bHmbcHJe2C455PQRce6VgskRWrOMOhL3ZTeLrV8BcYUu6%2FFZlIPUwampfG0WGt4lKqnUV6z7lHibndGMtJfXrpYFhJTlNWlb%2Fz6%2BC4xM6yZ4J%2FlO4jOw45HMSnqxaREGqs6gTVbVS8kTirtZcUifXu9oGtCd5%2FKWHR4aikfqDfmmjEg&X-Amz-Signature=730cdf2b28888d63c3beff76aab48ba4e5441828a1d8ec9a266797c0916efa9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSBXJCQI%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJGMEQCIFxSYwWHXr1Q7%2BF8v%2F0Mcjv8cV3YBmqpdDroDreB9AeUAiBMQqdaNqPuLIL%2BWyCRhlYP5FSwjvj4Ed0DtMCLRs5N4CqIBAjJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKyEu9CSQdzOopYeuKtwDH%2BnMM8tArZbb%2B%2BRQxHd9MPMHvvWz86IuWmQngwbEGfcSfvxaimuHp5Lu2SHB0%2FU8VcfEoLiUGudZspaI6curhmPv0GJCgGmqYhM7OFeVqLdLDjwA2UzTpGhuaMZZ00LipLhSl8or05ZF5Eb2lOssycFWE7j81MjNMp1YWAB5ffiZ2vjKHXcBOg3vWb9U%2Bwg7ZHzuKWsQbwyKyvPETuu47569CUiGfrPd5lWUtNLGFATDf3hsRfCg14rnlHupN0g%2FtZjHoq1%2Fx8cBTEKJPGBZ2DARCNTQtnKMPUibyQbSoiD8oPgnDF2EpGKLTTF5qGloe3ilkOzaTLsXOBBtsQBWAIzF4kHCGc5Tpa4notL8FZtSUQJ%2FxAtbGfYQapHiCQYjoEO46szPrLXUvZCVsjSRyRvUU24VvDwe7%2FXtzOu2W6Cu0nuGh%2B4PTpSReNb1qaA8zHCKGl5DQotb4jSaiBzoD%2BNRd967z2L39DSUY6nQeU39iPc0CmRcsEEetXRJ9cpXFZDoDeAWldxMyGMmu%2B6fbfxMn5179LXdoUIrrrdU6L%2Fd%2B1wVxvKX2OvjOM9n0yEceoEAM4G0wgvicvt3GwsQX0A1ErpoK%2BPI%2FnWRo3UuRynbAiii01vJtl98G0QwsbGVzgY6pgGoikIJwbr%2Bw14H9KEQDBXD2ywFivCFvYZrrWNJmpTjJf7j8s0Ea1pXb7a9sgzApsTq%2FqXteEfNVdeAfc%2B9zcR6LwUeDmOFgMhh2tawcK3WBIU0miI5%2FPWi7aUyk6F5VbmO5g9r9Y8ufI3NLirsdGKEZbqEGMIiCmktWb4IBowDC8U3Wqlg4MeoQ8J3TbQDyleMbedg5pAoogMu36krU7SD42huAw4O&X-Amz-Signature=a3a7a8e94a85e1db49088d7ed9d7278adc688598c2f15ab4a06fcd16349d9fbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDX4SYVB%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIQCQGJ434b0K6nkzRmH8PZlY2m0YK%2FTcu7X843v2OmKSmQIgQapraFL%2F99QOTSWm9q%2FkhVe7iZhKBRzh5z%2FC%2Be8j9wYqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJnZEIKvIROgkXKU4ircAxdMc7Sq%2B2yLSYPuSmBYwD4PrOSM2fpezDmz9m1QgykS7Yx1hn18YkeB1zrUQloidB8un%2BxU0rTsWEZwcq6BLZ1gyUBCWfOhAxEDUCpvIuyIx6Wx3pM7aGc1ktULnBGzciGZkOHyYvCkMWQ9PG%2FHM89nnabCjW7INyQiWmLcGt1S2%2FyR%2B41RnbCjkCSQw1NGbjVHEsGwMY1A%2FKu9lTYU6Mkz5Im3fRrjsF0s15aA1pROqGFUDeJCtO1Fn6qeh7Jxc3iab%2FNVxn7Ss9JiYmsq%2B9h0Qn4%2B1e9c0d5zKU%2BYS05%2F5o2SCPRZp2KbdDpeD6TLR6yYsoSRQYUXspFvgENzJs30y1d%2BlzwwVtPlS6d%2FjBU4qrpj4tczkUuIiiCbE8RYcKHqbJlFLRdMsoD%2F4pe65asMfO61OrS5dgmF6cBiuGgK2fbS1QY5qFl3%2Fc373tRFHd8LN2rPQk6wDtdpvBNN0NVY4D0Cy2cvkN4tqri9SenV5FlyicecXzmiPDwEidP7vhf2eDugqiy%2Fk6Wb24Pmt7YxFkrxse%2F50q8O8u9L%2FkQ1lNkOTWofVwG0i6fGbLNP079Y6H0PnC1CjDmb7BwtUie%2Bn565aOzu66TeKldsCqAdMOIy%2Bh%2BaLHDlYWeMMN2wlc4GOqUBUOdriNMkDRlIZXzXZpVXJVsNuZiGH%2BCMNhPjAXVpcZmV9Irvx%2BJtxS6efWbPUUw8dsMuDsbT%2B3NJG10Rn%2BBlF29O8RFFDUdqSm4v6gStru1oLLb38MuqJLrjLikuCkey4eBaXWew6ZCb8zL6oQgicdkSWYHtxzJDtWmigbfhsCrqP8hIEyH2LRIOXUOJ%2F%2B2jQ5OwdLQkcy%2B5XgqkadGOtklj5ESt&X-Amz-Signature=b88b54c087c0e1b81033d5c66d48ad2dc94f09673d13241b11591a63dd7e93f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDX4SYVB%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJHMEUCIQCQGJ434b0K6nkzRmH8PZlY2m0YK%2FTcu7X843v2OmKSmQIgQapraFL%2F99QOTSWm9q%2FkhVe7iZhKBRzh5z%2FC%2Be8j9wYqiAQIyf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJnZEIKvIROgkXKU4ircAxdMc7Sq%2B2yLSYPuSmBYwD4PrOSM2fpezDmz9m1QgykS7Yx1hn18YkeB1zrUQloidB8un%2BxU0rTsWEZwcq6BLZ1gyUBCWfOhAxEDUCpvIuyIx6Wx3pM7aGc1ktULnBGzciGZkOHyYvCkMWQ9PG%2FHM89nnabCjW7INyQiWmLcGt1S2%2FyR%2B41RnbCjkCSQw1NGbjVHEsGwMY1A%2FKu9lTYU6Mkz5Im3fRrjsF0s15aA1pROqGFUDeJCtO1Fn6qeh7Jxc3iab%2FNVxn7Ss9JiYmsq%2B9h0Qn4%2B1e9c0d5zKU%2BYS05%2F5o2SCPRZp2KbdDpeD6TLR6yYsoSRQYUXspFvgENzJs30y1d%2BlzwwVtPlS6d%2FjBU4qrpj4tczkUuIiiCbE8RYcKHqbJlFLRdMsoD%2F4pe65asMfO61OrS5dgmF6cBiuGgK2fbS1QY5qFl3%2Fc373tRFHd8LN2rPQk6wDtdpvBNN0NVY4D0Cy2cvkN4tqri9SenV5FlyicecXzmiPDwEidP7vhf2eDugqiy%2Fk6Wb24Pmt7YxFkrxse%2F50q8O8u9L%2FkQ1lNkOTWofVwG0i6fGbLNP079Y6H0PnC1CjDmb7BwtUie%2Bn565aOzu66TeKldsCqAdMOIy%2Bh%2BaLHDlYWeMMN2wlc4GOqUBUOdriNMkDRlIZXzXZpVXJVsNuZiGH%2BCMNhPjAXVpcZmV9Irvx%2BJtxS6efWbPUUw8dsMuDsbT%2B3NJG10Rn%2BBlF29O8RFFDUdqSm4v6gStru1oLLb38MuqJLrjLikuCkey4eBaXWew6ZCb8zL6oQgicdkSWYHtxzJDtWmigbfhsCrqP8hIEyH2LRIOXUOJ%2F%2B2jQ5OwdLQkcy%2B5XgqkadGOtklj5ESt&X-Amz-Signature=b88b54c087c0e1b81033d5c66d48ad2dc94f09673d13241b11591a63dd7e93f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXXHCDOY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T165623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLXdlc3QtMiJIMEYCIQCAWMcgDUa49VxTyY87rmUsRfaNa4%2FU4qutKYAKvzPwfAIhAOtqmKA66o1TT6vF2xaZ0ucY%2F6L4Ncx2gbWpomdM6Q%2B7KogECMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyHFDMQmdgxxrRQLBMq3AMhyxmwoYuhzFtkuRlawFyRKNRh91hCY4ecmJeJcl7krMcnuVyfMF3kXGgnNV2MoDJxYe%2BmG%2FUmVss41a%2FnbBjeNrRljNmZt6JLjglG3z2Q1OiLnEKUWHLK56jHoAHKpsIIynmNWum0bWcstm9%2Bo8p5X7w0Ti%2B8DhYy7Ivq8v1jI65r%2FnXNPIXFwyvarE1NoiAwkLT3pDVeIyhTYy6X5CDIlPfTR0YrzSlSeejK9vYkqDTKEtJc6GDXcBNIvHiWzI1a33PTOkiMf3PTgL1w0eBuiVDMW3TuHm8cAD9T6fWIsRS11cSFSpw7HmqdrWGjasP0%2F1cxiHlUrEtPmJ9yJuCgLwOVxJ27Xbd9FgElTyx0syRsgmt0QADJjS3nuTuvPSBUlTB9hfQi2Qa%2B8PR0LkAESFmmmapveYvw2U257uq2ohl3SM8yt8KdlmBe7lx5Hrv6gaL67R3Eg30%2BzbTdSAYJX%2BDyfzZKRn0ltDrfosVmvRHllXZxJRhgMeTTIQw0ZyOHbQBeq0g8gA%2FMIwG1W67HaQoj6Aa%2BifcWfGdecaujyTT29EDnnMdYQ4UvmKkyR97lVXIQ9SvCeQjG063M1jGkGxniQ6PLXQZlR6QCyz9tSH%2BaZeD80kEVgBHx9zCmsJXOBjqkAeaN%2BY5%2BKRBfqK%2BSQ1YduPLo1IUO44%2B%2B7rypAKd2EgZffvxJ7yUlEWtY6GCMM8OkBlbl6lpuYFR6puaDnEHmPvhFM4sQ4hxUsmdrZGIv9YiToSgJVZIkQ2jM0p%2BX8vrIFzInfKngJFHT1mAr57m4uvkSDPML7swoubzBeKm%2F4QYJFG16qtN9dkUF6oRuPQPYe0cLMh%2BJTQGxQR2leOVqwGgZUW7h&X-Amz-Signature=59c6d96ff22936ccd45c3c280e1e53c7c8889d7fcd066cb1247c9ea2c9372c5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

