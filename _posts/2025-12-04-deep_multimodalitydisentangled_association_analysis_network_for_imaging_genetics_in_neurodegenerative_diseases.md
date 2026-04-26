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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F66CWV7%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDevoDCNyQarePgluaj7o7hH%2BFwJvoleDD1zQEYHuMyAwIgeFji3tjlb%2BBVqlbF58anI5VDqhv0p%2B7icOCj1AgJdJAqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLJNnyit9wjQendEnSrcA7LnfuALdBMQjlTfNFG0OaKrgtiViisSzIZmzgeiDWr5JERFYcHJKVCe5iJdsVTxf3MglaKVg9GuSXRP7yTav3%2BlEeb8bvTOcfFGzXE8NGvytA%2BaZf%2FUbxSJZBuQ2XCIz1LRmN7vgl5ZaC0Z9XkO%2B907OufqXxbsHH3sVXgjnM1TW6jby16Rx46zHuAldyoYBHQ6PO8XGq9MRHFk4e5cPdAbXuI8K6KIgiNUOJKzEKPkd%2FzfQzgEshgRGen4hBFHGtFy5nzs%2Fmlwz90qxWs%2FiOrUqAo8VwQzN4KK%2F%2Bvn4At0qsLdD%2BwpZaq0lgLlv17qRtbtZSpS4qF9Es8dwJzrWdciA%2FYdOWQUD1nmWb52LJUF3SIOyDYR%2FNMQ2TdyJBr084YXtudZdx3sEGzxYDbBkpAPxa%2FYuzNP5LIWYiHSKaT6X%2BE3d%2FY%2BLRUARBPfnLfIVjvUc3BKKb4tTmDVal3emGtg%2BWxQpHqtBVdXdAcZNz2SWhmmX9flS%2Bk0oQO%2FcRwyhCYLo53J1yIvtp%2BXefcQA8laikyGp0i3gGcrBkVxVp0a2WOH2og0eRX9hq3GjQ%2BeI0jmBcd0ggLgPjI0veoxVYMjA%2BSKTDIQ8BXcGM08XIhA%2BOzt2jm%2FSiGLZrpcMOuYts8GOqUBhB7xan26q2wGEenJZ3kCBwc%2Bs9wwtoT6KVztMgNZkhOWsxXgRs3nKHMnRiYpDOfKBGXx820yMevROaUNFxHlRIH5sQYOC1z3FPMoWleECozITXNd42QfM52T%2FhUvkmwX%2Bn%2FES5AQoqlK1H%2F%2BDF29n2w%2F2InH4lP0TAkrE6x4Tnc%2BA%2BfNZL6zktK1tK%2FWToEeyC%2BNP2dYapShfVX%2BOVKTZbABhjdj&X-Amz-Signature=b4e6ac2da15b8670228985690644da279b02ad33166183923423fd08fda64e61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F66CWV7%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDevoDCNyQarePgluaj7o7hH%2BFwJvoleDD1zQEYHuMyAwIgeFji3tjlb%2BBVqlbF58anI5VDqhv0p%2B7icOCj1AgJdJAqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLJNnyit9wjQendEnSrcA7LnfuALdBMQjlTfNFG0OaKrgtiViisSzIZmzgeiDWr5JERFYcHJKVCe5iJdsVTxf3MglaKVg9GuSXRP7yTav3%2BlEeb8bvTOcfFGzXE8NGvytA%2BaZf%2FUbxSJZBuQ2XCIz1LRmN7vgl5ZaC0Z9XkO%2B907OufqXxbsHH3sVXgjnM1TW6jby16Rx46zHuAldyoYBHQ6PO8XGq9MRHFk4e5cPdAbXuI8K6KIgiNUOJKzEKPkd%2FzfQzgEshgRGen4hBFHGtFy5nzs%2Fmlwz90qxWs%2FiOrUqAo8VwQzN4KK%2F%2Bvn4At0qsLdD%2BwpZaq0lgLlv17qRtbtZSpS4qF9Es8dwJzrWdciA%2FYdOWQUD1nmWb52LJUF3SIOyDYR%2FNMQ2TdyJBr084YXtudZdx3sEGzxYDbBkpAPxa%2FYuzNP5LIWYiHSKaT6X%2BE3d%2FY%2BLRUARBPfnLfIVjvUc3BKKb4tTmDVal3emGtg%2BWxQpHqtBVdXdAcZNz2SWhmmX9flS%2Bk0oQO%2FcRwyhCYLo53J1yIvtp%2BXefcQA8laikyGp0i3gGcrBkVxVp0a2WOH2og0eRX9hq3GjQ%2BeI0jmBcd0ggLgPjI0veoxVYMjA%2BSKTDIQ8BXcGM08XIhA%2BOzt2jm%2FSiGLZrpcMOuYts8GOqUBhB7xan26q2wGEenJZ3kCBwc%2Bs9wwtoT6KVztMgNZkhOWsxXgRs3nKHMnRiYpDOfKBGXx820yMevROaUNFxHlRIH5sQYOC1z3FPMoWleECozITXNd42QfM52T%2FhUvkmwX%2Bn%2FES5AQoqlK1H%2F%2BDF29n2w%2F2InH4lP0TAkrE6x4Tnc%2BA%2BfNZL6zktK1tK%2FWToEeyC%2BNP2dYapShfVX%2BOVKTZbABhjdj&X-Amz-Signature=b4e6ac2da15b8670228985690644da279b02ad33166183923423fd08fda64e61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWPOCR2U%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDtmqAaxs9RLV5E2PVgyo2SXTw2IAzqRSUE9rot0hAzMAIhAOqwm99z6WxaWrVL2QvWpDtPF7Dci6sDrVwhz0LLUbblKogECKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxvtfwJPnWC6dYftyQq3ANmlWDePs1ahE3aJP9KEw9PRUaQ%2BNJy3TGh4b%2FQZk3rgUIMq%2FvCh77Z0bNgcUkvSwZ0%2F%2Bmf%2BwXLo3MrA1xmg6OzStTKhWMFLPqrJp4muC4kJ6vxe6MCs9G%2BVsLWUI8MJJk1UG4k4BdUDfjGcLDcAMHYq5I%2BHfcc3H6sEM3GD7pRs76uxAZMl7eFLrwZ2DVd3hXAeDrBi6FWwyiROQmr4XH1qhPyZCuKH%2BDMj%2F6%2B%2FfXpoJqKgdax2Iwa9a2jYnbEKBO5BGDoWzDrkm%2FlfBvqbysQx08wkt2mWxgGfonoae1XSJRt32dInf5ZUIg5BkgJBZUFE82yd7KW8cEepEsO77DxYjQ%2FTAAAW5UpWt5dare5t7tzNrnRSt1tXexqk7OwBgOEfQuOdsFGt7vijKh%2FiwxB2M2mJ5KjSmRnAMsbJvsZk%2BeJ346Pa97Yx%2FVNBvAZxLeNPcsH4sJOwixqRTnzNziWO1liPv5tYFE86k%2F3iqSiNwHZQKLmHv37uL97xOnncHp%2BJMExmGYHDuSmaUsvi5uuCL3HidcUxgysVCuiWpJkPwPqCsDimWrONbfgmAg31zAG32hne9WkPl79WvDnsEJVOBp5Cj69rhLvbvbilHd%2BCLhypKJoqcQAQWzpGTC3rbbPBjqkASh4FC8KCX4rx90yJ%2Bk3lPzZ%2B3TY2y1ZoU%2BLR%2BNfSXIVu9uI%2FzgQJpzCtgFX5NmxYeB6IlK8YCr5i1R3syI0T9KMrnIOpVDW3VHyYmlmY5p%2BGF8gAIUnbt3YmOF5QAMU%2BLBNPiYecDgigCwlazTgCPCcBYRJOD67frdUf0cq8%2FkgDskW1EqDvjKo2RBgBWnK4zkKUKODuvqUQUX6HssvRpdxrXFV&X-Amz-Signature=3d6b4d956d9383d95ea3ee39ec6d28a3fed072c2a81d933c78a88ea668f31375&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULM35F4A%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCNKd9e7man%2BlJIL3b0IzrlKMU%2FyZK1mwrRh811BPOxEQIgUfz5dIuORvpy%2FsxTwpgJvwM5eejcNjmBGQF2FrJvvA8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK6JCXZ80oHwRXFjbCrcA0h8GFOp5Z7ijMZ3TTIWqD5yCnh2uRnc2fliygqnmK2X8g7qWhz45OWhmEB9GSk6XH3UIyHQOk%2BnLlQutlN6in%2Byh8TkHS09ZX6gU3aRCGEz6zazPVpAb7zC58k0Ro9VEMtntENZthGkr1pFdX5d%2Bp3%2FEgLdcJD%2BX2GLkeaCN2Sjn6NTgez6qfDGghWCERCDSne0vvZppfBr8igiDweizazedMvKrMA9yzcXmVDBoTRD1GpubwrttEGowOq1t%2B952UIDIVR4gM5hTIw9f%2Bc0ElDpUL6AYr3LU9BGcZQlvVnCHhb8R70lopfPG6vjye0hpoggkz1R3n77%2FWmRd7vtdMpdoAKhHfYYC4F9XC0lGgUyo7DoSSEUgd%2FFUOes0zmtlkMQyriTnr4IGPtQh3XoNNfJbml8pQHPVbTiNLKib22b6lnt5qYBleEIcwJJsnoK7rWg3h9CQHLduq3fGf8RH6VCe8ywHYmRf9TuIZGMtbT81GzH%2BdDiIDbwQxDT0PG1u6hQRarIPxIMtyCUgmXAUg8iQmUr173rrV8dDukLMBs7OROaosZL%2FpmnWeHaQtJRfg18UVhvuGf89%2Bko%2FSjR8Fo5avyxJLSaK646ZnEtP7h6Dkej48lUOuvsFV5kMJGYts8GOqUBAok7IR5inbFfENklX%2BmQ9A4lBVzpgfjBYDAQ4j0EVaGGSjsz4HSROHLrOT2jXk7eruFAwJdpAn%2F%2BWvqOf64cygiUUMv9YUFRAnTlhYodRtKfArj9YdA1IFs7rsoubLtKwaLqjowwYWuIM1GU21imDIsowovYAfBxyoOM%2FHrzyHP68kU6s1H7yjBlD8rQb8F3cVjT%2Fe5I4sfs7Xn%2BpunzTZasmSyA&X-Amz-Signature=9a97f6836bb35846979f0c9eafed80b2c1ae08286b6e7596832f0071391c4347&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULM35F4A%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCNKd9e7man%2BlJIL3b0IzrlKMU%2FyZK1mwrRh811BPOxEQIgUfz5dIuORvpy%2FsxTwpgJvwM5eejcNjmBGQF2FrJvvA8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK6JCXZ80oHwRXFjbCrcA0h8GFOp5Z7ijMZ3TTIWqD5yCnh2uRnc2fliygqnmK2X8g7qWhz45OWhmEB9GSk6XH3UIyHQOk%2BnLlQutlN6in%2Byh8TkHS09ZX6gU3aRCGEz6zazPVpAb7zC58k0Ro9VEMtntENZthGkr1pFdX5d%2Bp3%2FEgLdcJD%2BX2GLkeaCN2Sjn6NTgez6qfDGghWCERCDSne0vvZppfBr8igiDweizazedMvKrMA9yzcXmVDBoTRD1GpubwrttEGowOq1t%2B952UIDIVR4gM5hTIw9f%2Bc0ElDpUL6AYr3LU9BGcZQlvVnCHhb8R70lopfPG6vjye0hpoggkz1R3n77%2FWmRd7vtdMpdoAKhHfYYC4F9XC0lGgUyo7DoSSEUgd%2FFUOes0zmtlkMQyriTnr4IGPtQh3XoNNfJbml8pQHPVbTiNLKib22b6lnt5qYBleEIcwJJsnoK7rWg3h9CQHLduq3fGf8RH6VCe8ywHYmRf9TuIZGMtbT81GzH%2BdDiIDbwQxDT0PG1u6hQRarIPxIMtyCUgmXAUg8iQmUr173rrV8dDukLMBs7OROaosZL%2FpmnWeHaQtJRfg18UVhvuGf89%2Bko%2FSjR8Fo5avyxJLSaK646ZnEtP7h6Dkej48lUOuvsFV5kMJGYts8GOqUBAok7IR5inbFfENklX%2BmQ9A4lBVzpgfjBYDAQ4j0EVaGGSjsz4HSROHLrOT2jXk7eruFAwJdpAn%2F%2BWvqOf64cygiUUMv9YUFRAnTlhYodRtKfArj9YdA1IFs7rsoubLtKwaLqjowwYWuIM1GU21imDIsowovYAfBxyoOM%2FHrzyHP68kU6s1H7yjBlD8rQb8F3cVjT%2Fe5I4sfs7Xn%2BpunzTZasmSyA&X-Amz-Signature=9a7fdccc0a05cc93a319817cf905e81e5c33df85bf8fbcc789f19347f60cf8f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ47FNDM%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEGJya5Z09%2FYnGVS8RpVyQ9Z0BKgFuxtmhNaGAlnseV3AiBnJ4kEVEnfC0BAyvGXNnE7AEriu36vf1s%2B8gal7YALOSqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUAmn5lRXh8HWb%2BDIKtwDvCG2XqkrYcApiYzqwK%2FxNk88Epu0OeFgL7Y6h65y4Ct5b%2BTzLqoCjuWda%2BrQq9U38%2Fxe7pZ0ft2IialDTpzCAtZdUD1iqK%2FQ2gwAVZ6jNfcaN86imsCYG0YiUvsCI8QrBswX%2BKuTOtSssneLy4aD4nDI2UWk3fDArcD6Wh0T%2F4SXAap6XjR8NDKqXPnlKDAaO9wDuPX1mp3u%2F4lCTsPHXCt7JTqynhPkVwJror4VYaCesYFI8TleGX7gmaEx0OBZgpH4YbanTnQseZxdmARSTbFzgU0cUChuufLhRSkWEFBPcwqLHKC146FK0GKCNTEofHBpkrenLKQLhrngn%2BcyZqR3iLll88%2BcWId01NdLupSlny6Y7mOhB8cw7qbthheg0GIkxEbPMvAGwdoY9o6f6FHnd9UY3h5NWkhmYA4MGkTsClo8sufHdPogMgWvcUX7%2F9y9UH5aqy93KF%2B%2BVQB7Z6OKQB6SHC%2FJkyimQlDTRpj9J5FYviE%2FofixEnFMT95TVoKsQpjDbUIG1g1pYXpsM6veXPtBp%2FDmG8W%2FD%2Bjq55%2BvppE0sSSITGiHHxRDWHFVaGm5amsB52%2BcFOYnIDk2pBEs7Blh19qus%2FMyBKswiHrXhD8ZTyW84Lqj214wv5i2zwY6pgE0uTvMPjHr11mMl6vFjpABMVwwh6KFZqLtpZaNWbZt96BOvoa5Kzr7cuoYEORmGYYj5U2Fxgfu3uhtjC4AihaBcAKIY9LrovK8pB66P1W4%2FfNC%2FIrUNQ1ufTRIUxbJJliFjekF%2F43CFHPtrkcz1i5h1q2dg896zqF7kSgvRpLyh9wRkdqfWeuBjJiSjt8uoEw%2BE2F5KzrVJ07KWiqMDI78yOtVFQlw&X-Amz-Signature=ae853664aabbad2830ea2759274cef444f81957a04a002873da9fb3eff562f16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIBT3YG7%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFaUoxnhZqHADg%2FN9xc93A6%2Fl%2FLVGTF1CeW47htaxJrQIgRcC6311lydOh1PsDbt6V66Fl3lB%2FMZXSBrQE173LojcqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOzVD89xJosel%2FQHgSrcAxVUBmJiM%2BhiCOecZ0WmLP3C6bJwHpeDwq9mLiSQ2wU2r6ZJeuWCmKFePFEQvewDXlKxOdTMeO3T7UGYRtbHA69xdJy0FVZKl%2F8bZC36xIoPS1P15PngtgJaiezCEH0yIXBYKYlfB%2F%2BUGV9L7H%2FqqYnC0jMc9DVmidCY7iJqY7rWVy%2FBnvoNjKvfFrTJqx%2BonbTJjuHJy3SeQWDWC%2B84IvphVgru832fhowwy5Iwxm%2Bou7lvmtmGCulG97mRNdsDCm%2FsPx%2BH1%2B4yEaHO2vMDlQd86nWQZkir4vQCbP3uvJVJi4EkDUR7I2zZ%2F%2BFmsweitOS9oEP8v7FDK05ypElh9Qmd7X8htyRevjKWI69ILDdjLInNOrADscTc24%2FISPy0bRcFh1J%2FsIe8tC9ke6FgUUcaaP322LYZRopb6qnfOiaAZSDigGODTEDGmpqdsST9G82F7kgaOkhxS4IKGa6u%2BLhBu4B%2FZh0qM6T9V2xBghzouDaf0ive2El5CQQ9X6ozYRQTEtKoGJiSMkUyq2eJPJesz6FUT%2F8oxZm6mW1q0WgPIm%2BuaRv5JwWZc6ai8DVDXaKPbbCTWmcTB1RN5qtQSxm60XMwUHcBFL62X3fgtF19MstUPH%2FVy9%2FikhYWMKeYts8GOqUBt%2FoAENCfC7u4Oo9hSYgKXc7CwC3Ip4hWrSz7kfnnrQzbPEjea%2B16qmQWHHKVaXVXXFgA8URJ7%2BQU2H6YstX6Ck2MqktvAbYUyqAs%2F3iOHUY%2FcfG9uw4YAPnl4I8p4v2LuQzxeRgEmqQwXGhA52P8sJkZSVIT9J7A68jLaUmOw5XRN5p7NNOBGMrAGRxJ1ml%2BnolK5yxLRknkNRE2fizRctRVX0tX&X-Amz-Signature=1ab4e2c471b9647ef6287fbf70ab5f087f6716838e782ba351176ccc2b78eb96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXEBCEAY%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFhx%2Fx6XHPMphVAFbrqb4%2BKC6zDAJpOzs1qtJrIobQqiAiBdKKLuRvMrFc4D%2FzVr%2BdVQG%2Bmg6mIn8ucxYa0Nyj4EDSqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjr6iVOQDog88MAl9KtwDKzYVtHRRKm6fnWqwuhU7Cc3%2Br2AlzJlxpPzw3wszFHhbhLpnYdY9IuWYFHoxFIeKwYvq9lsRGRacA07111n8cER3ajAAS7mt%2Fz1usIj%2BUMmICcuSpvpgMGer%2B72W%2BGlSRpiYZHeSIDJOtdKrlgmwsYGMebKEXCAWJxXThpqqwKnrQATdshgvMS8E%2BQjCAswNvMVhcrCFqQJWY8hgk59fRoJCHyuzl4QZS22JI%2BKdyf9pkGCApGm8yr352pv5iQyQF2Ip63anRG2C6B7CoCMa%2FL%2Bf%2BdUZb5C4G%2FnLzg4LAZ1EfIVJsA81aaZgpSj6eJWhXGiNAmVjwOESlWhtOmejYPAf0ezEyje5vcPrRYT7xuZpCCXP87PCpVM%2BCxqGcwwIXXRXUwUUZFzTxPEx68I1NoxbUBFCMRbO6NCgmswxI1sM6ys1nNJ3J9SX9LybHfAOko1c6aRycoD%2B6er424XtEMdsUzsz8Yryp9n5q%2BoV9R5BSHULrgv2B7f6QZUv25KtCgnu4%2FWPs0iwkYkpQ93%2BC9236YNhItTvndXx5q26YPpXo0cFdEziVr6aAGJZISPBgl8hXo%2F792i%2F0FEUDUxHS45kIr%2FUnecGmBH%2FfEQTqYvvUSz3LG0e9hJj9dcwgJi2zwY6pgFIXy5daPJXCsVTFsZZquHkkpSrpthyxBOC3w84VvkEufAa3mcfeg7Mblc9KM1jfGavtB7%2BmbM51V0LLYxbMicv%2Fb7xZoMF0p2rr9PX7UNvFAp%2B%2BwzSaIv2vUGANYAsN9XOMWifCafT26EH%2B6jBdqmbp%2F5XrdatOI%2Fl9n87%2FMISie6mroNJSeowpk2IG3vGTCqCqtOqTZjQ9WADVkyaNPyh2LVIC5Tm&X-Amz-Signature=670b4b6f02bff69e4e0fe6df7e098e40cbe0b917342049bd41d143f68783769d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GWVL6A6%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICnQdvHhE5%2BefQArA69QzIltczDi8%2B2yk8dzqC3Hgy7YAiEAlrXYHD0MhELHsSMflWW4xjOv3aWy0W48GClq0b8gchEqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDABuly8tEI%2F8dmMLiyrcA4lBNzKDGaSupTlQ4gi7kulMf0pwyqihDkR93B0GZV45WkWBo9WOeFKoQiF9zdJV5%2BtXq2syB49TddJ8zkT%2B4tbh3v%2BbQCrzxkViXRcoh0pvPffQwyfzKzJRKN1mwv4ZjH46aeNIF2tPuxeMk6J%2F4CPU3jm23sR34xNhTZ0eEtRgoY%2FN7ldAcmYRv%2BJfCKaB5mkT6NkM8p1p63hM4RrVVG%2FxzCZrBGUTjrIIkMTsOqeKSZoQZK7krKToTYTXWnDn0Jf7oMbxut31cv0ST0b2v5N0nD%2FxlAOIRw2bl4X51gMoam0rkLxZMUGRGHB%2FzoQLToXHF6sLZzlFdGiGfSryp2zGF%2F5oOUPPRvl%2FlIVLgOlqg1O6RkLCds44hCUsPLI8qFsDYXaXj9SByC4q2xqUisYej1eg%2B25r%2B3VUcMLbO7EYJ4ihzTjgOBHEUb54ra1lOJMF95h%2FgSoc3ZvvOrMYovozZ21jDM9sHI4TNcr47AvnKzG0QnH9NZv%2B0j7THVpzDHsv8MLItL3eCmNEctJ2kkzZkZQW5Duy%2B%2BS4g4gWner9PL9FDEGEMuunYmf00xDP%2Fsl0Lu%2FGlNtJVNbJrkw3lJGxQI%2FlR72%2BWdqjMsZIeQlixdP%2BtZvYDrr5pPFjMPqats8GOqUBGO17D7kFDeIED3jBUGbevDfFxzfskej8JxVdOwMVB1uF6efxiUFb75thxbBfe8EkCLbMFmwQam27GtASuSjo0zF8ceGKxqQOOPsAQwBDaYw0zRkyr6gBeWaIzy6DmsFPTYxHklP%2BMIFXIoeXfh1rqCc70HRoAL%2FrSEE8fOWrkwJ%2FiWGemSk%2BFj3n9odtftdEvptXL5n52lGmRb1Xsm4diipmURSf&X-Amz-Signature=fb23a626826a19c23f52f067efff938d6a691dfdbca2319e19f8f16e9eafb931&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GWVL6A6%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICnQdvHhE5%2BefQArA69QzIltczDi8%2B2yk8dzqC3Hgy7YAiEAlrXYHD0MhELHsSMflWW4xjOv3aWy0W48GClq0b8gchEqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDABuly8tEI%2F8dmMLiyrcA4lBNzKDGaSupTlQ4gi7kulMf0pwyqihDkR93B0GZV45WkWBo9WOeFKoQiF9zdJV5%2BtXq2syB49TddJ8zkT%2B4tbh3v%2BbQCrzxkViXRcoh0pvPffQwyfzKzJRKN1mwv4ZjH46aeNIF2tPuxeMk6J%2F4CPU3jm23sR34xNhTZ0eEtRgoY%2FN7ldAcmYRv%2BJfCKaB5mkT6NkM8p1p63hM4RrVVG%2FxzCZrBGUTjrIIkMTsOqeKSZoQZK7krKToTYTXWnDn0Jf7oMbxut31cv0ST0b2v5N0nD%2FxlAOIRw2bl4X51gMoam0rkLxZMUGRGHB%2FzoQLToXHF6sLZzlFdGiGfSryp2zGF%2F5oOUPPRvl%2FlIVLgOlqg1O6RkLCds44hCUsPLI8qFsDYXaXj9SByC4q2xqUisYej1eg%2B25r%2B3VUcMLbO7EYJ4ihzTjgOBHEUb54ra1lOJMF95h%2FgSoc3ZvvOrMYovozZ21jDM9sHI4TNcr47AvnKzG0QnH9NZv%2B0j7THVpzDHsv8MLItL3eCmNEctJ2kkzZkZQW5Duy%2B%2BS4g4gWner9PL9FDEGEMuunYmf00xDP%2Fsl0Lu%2FGlNtJVNbJrkw3lJGxQI%2FlR72%2BWdqjMsZIeQlixdP%2BtZvYDrr5pPFjMPqats8GOqUBGO17D7kFDeIED3jBUGbevDfFxzfskej8JxVdOwMVB1uF6efxiUFb75thxbBfe8EkCLbMFmwQam27GtASuSjo0zF8ceGKxqQOOPsAQwBDaYw0zRkyr6gBeWaIzy6DmsFPTYxHklP%2BMIFXIoeXfh1rqCc70HRoAL%2FrSEE8fOWrkwJ%2FiWGemSk%2BFj3n9odtftdEvptXL5n52lGmRb1Xsm4diipmURSf&X-Amz-Signature=e6ca6d9b1c7bcb6c8463120a2d56fe86352e6bf589a3d423b9cee0db738fa612&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLIH6GZJ%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDDQDBaiV963lBBtGhXqEVkDjbcU3pYT%2Fv1UGzYF386bAiASN4Fta8OsieBuuP3Dj1konLl6qSFqCCAPeAPo5DP57iqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5uVwQD1Fe0%2BAAW2xKtwDDkAD6ncg11w7Wo5zfpcXv2dBLLU21HJlQnwaiStWueMX6mYBfAsOMTNcuyKoqvyyP6o8CR3iyniatkaO9hbfmC2K1O6ybXI85UvTq%2Bl0X1ZnT%2Bwig9n%2FVL%2FOJxVwo5VHnQSg%2Bq1xYwWOYis4sXDFpgzxR6a5NKTBgZXZCaV7ezzOQIrRIHoutFSasgu7KHraqfJc%2BszG7ncsZWx6LUBca4kPIAbsvcwIbcLH0ILbluQ2103fJQWJqpoPZh2rKbtZ%2FIC6ZMprBE33ywX68n2B6HIWwetJ7Ehic7Vi6UUhpyJy0GAV0kBwG57V8vDTp3GvV25KfyEL%2BYVP%2BVjWthrKKoSW4ORhWwlKEp0GwrcX8LtSEgImH%2FZ7JsoUSB9z95B4%2B06762K3VkslVWweU0ruV9%2Bw9f9YIiW71Od8FkBzvE2ujGGkG%2F2uraPlwXeg1skxs%2BmTP68JeWcbx%2B51FW%2Fl4wzWlMf1f%2FmlW1UEdI0y6tMHbaVDmEPEAHBLKgaPCDKQwqvu662mwbNLv4btAr6TjjErA0uzggbxkDaV6P7wDrIFCTMQP3hktEZMgrnyBHRJYrGmsJuowTtAXsdEVgNSOGN1JMtMxL41ctSCiCeTXgZYJ9ZKOzjrfg215uYwyJ%2B2zwY6pgG2%2BTkx3affCwAlCGPUXsDVaUFyqHJ0AYPiiew7TRhDThUAxHuJvA11x0SpkzAd9qe9ne3TL58d21hdWvx%2BsII2wHi%2F%2FOH1r0QMyE9HUPB5Xr%2BfciTR%2FZ6frah6Lc0gmlB7P7pd4cCDTOl1VXShO4d%2BvF9sXv0pn8uSVc6ddL%2BJ%2F6Xz5n36zihuRIIly495Dephg6WZjkFQZKb3VK%2Ff36Q6FqXZU2NI&X-Amz-Signature=a2e6f7088d560032a156b36a4367f2acf6a2a06facede9cf1be75bdc61353c81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4L63EXI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCq3Bml0Hn8Kf4J2OwJOAhSzfyhsHpZu9z33Xne49D3ogIhAP4mvzaHOmgCUJxV9SBu7yB0rc54zaBvLUT3nixpnaFyKogECKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxMIpsoa9KdhhbTD7Eq3AN0CSajbUM56WjjmY3o85WfvUWLIVF%2BBCZvaEd35o8TL%2FPQR71H2ga4ijAvqPNYZx%2BCDvajMxRvUIXACrfNaavRuxhqgUh5uKyFfJIoN7RQOPnMjwdIIYDrG%2FkyGuHt8gAF9HzTF3pCsXMQ%2BrFt81oIuozm1cskakzawIln3cSr7dyClm6KzNl64UPXp%2FZDaE3XysqghS2vUyJCcbJf8qjI5evfUpeJGpAEpO7N%2Fhrc2AP%2F98J4wxME04w7n0JhzcRzDPtAvsGwI6mg56buUmjq1zBmSZjfiT7yIBIcKrzChQ9lnEr4Lvwv37xofJLTJZL6fTmjZPDbR0nnymtRVNi0nNwAUO%2B8516xjBS13hvQ%2F5kiYadoXVLVVqV%2B45AZnRDKd%2Bm1TZqx0QvQKnKtjaoQtzAC%2FvAGYV9gzP4MHVGo3Yzif8tQ%2BoBCmE0REraNEuMp9fzvSFF7jU8u6EFmlYnneWtii7tshxtrrHQfKEJMrR8%2BzaOEM08NV1wud5gUZwzDMzLBpqxSvvDFyYcM1IP6IGj30lKlxq626KoQ9ExL6%2B0aZaHEnPl7ZppoK8Eh28RTihuJoVl0vGSNkKFvrYujJp5SxYCrfYdAjiCJ7VM6OyVxrMd%2BVGFbiAaW9TCCmrbPBjqkAYgko113YWJVyJB7nbyNmCqE%2FkxcN4SiMhKvm5eXY5e3wm5rBUPSr3Yp99GKvxatCtfzgGtHBsWB681hLhyKlrYa2VAbJbxOgHV3FZQO02qQeznWzKWZEP%2FS7ydbeHPnzWmGD%2BvXiBWTsV%2BB4AhuAL48xJYVmi0Snbf4kxe%2Fvit0C650FX%2FGf70MDySD%2FJXlJVn3Cpz6pJAsNTg0Gq3IwditqS5k&X-Amz-Signature=510eb34df81bd531025eff1d160c4fb9d5385264cfb448c927ee575be756391e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4L63EXI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCq3Bml0Hn8Kf4J2OwJOAhSzfyhsHpZu9z33Xne49D3ogIhAP4mvzaHOmgCUJxV9SBu7yB0rc54zaBvLUT3nixpnaFyKogECKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxMIpsoa9KdhhbTD7Eq3AN0CSajbUM56WjjmY3o85WfvUWLIVF%2BBCZvaEd35o8TL%2FPQR71H2ga4ijAvqPNYZx%2BCDvajMxRvUIXACrfNaavRuxhqgUh5uKyFfJIoN7RQOPnMjwdIIYDrG%2FkyGuHt8gAF9HzTF3pCsXMQ%2BrFt81oIuozm1cskakzawIln3cSr7dyClm6KzNl64UPXp%2FZDaE3XysqghS2vUyJCcbJf8qjI5evfUpeJGpAEpO7N%2Fhrc2AP%2F98J4wxME04w7n0JhzcRzDPtAvsGwI6mg56buUmjq1zBmSZjfiT7yIBIcKrzChQ9lnEr4Lvwv37xofJLTJZL6fTmjZPDbR0nnymtRVNi0nNwAUO%2B8516xjBS13hvQ%2F5kiYadoXVLVVqV%2B45AZnRDKd%2Bm1TZqx0QvQKnKtjaoQtzAC%2FvAGYV9gzP4MHVGo3Yzif8tQ%2BoBCmE0REraNEuMp9fzvSFF7jU8u6EFmlYnneWtii7tshxtrrHQfKEJMrR8%2BzaOEM08NV1wud5gUZwzDMzLBpqxSvvDFyYcM1IP6IGj30lKlxq626KoQ9ExL6%2B0aZaHEnPl7ZppoK8Eh28RTihuJoVl0vGSNkKFvrYujJp5SxYCrfYdAjiCJ7VM6OyVxrMd%2BVGFbiAaW9TCCmrbPBjqkAYgko113YWJVyJB7nbyNmCqE%2FkxcN4SiMhKvm5eXY5e3wm5rBUPSr3Yp99GKvxatCtfzgGtHBsWB681hLhyKlrYa2VAbJbxOgHV3FZQO02qQeznWzKWZEP%2FS7ydbeHPnzWmGD%2BvXiBWTsV%2BB4AhuAL48xJYVmi0Snbf4kxe%2Fvit0C650FX%2FGf70MDySD%2FJXlJVn3Cpz6pJAsNTg0Gq3IwditqS5k&X-Amz-Signature=510eb34df81bd531025eff1d160c4fb9d5385264cfb448c927ee575be756391e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIBNF427%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T044728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCIIXMzOKPdFgala7q2Z31SXw1hmVn8Dd38hPif%2BATqpwIgM1HCQ%2FoH0tW1qvF4wFqIHA7hFVDc5mPd6K9fS0mVswkqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDU%2FpzDXb4eA1Y2vwyrcA22OBYpKKVtePbm2QsUxf4GfeOhCld49NmTHRo%2FOMt4vu9MsRBJGaxaf8qVQ%2FDuDppge0Mvvuewu%2BhSw13JwMc508%2F2nHVvSNsZCnrO2JLgey9%2F5NPU%2B9t3e1Zh5iVqPui00JdDD0Nu36CXOUxRlIluWRuql%2BcHHsbwRRPmLgEKS6CKb3SaLuwFMtPTF5k%2B9Ex3htIo86uUUtT5iXrgLw4%2B6l0YwUhr1SFqXTPqPbrBVx%2B0E59sraJYE6ffnPjxAApdXAIq8eT6uGHbFmNkEaG1QD6M2rYLH2n%2BIgGPaoD0Isj%2B0dM1i5oia2%2BL%2FrlxxzZxRi9w1IH0xc%2FEFG5g%2BDmtoI1qVnHBMsJl9m6VzPhBRTgMaWGqWXgK5LOXBflFKQZWPp3HpSpzqo963UTPdg03Y4Xpul%2FWvN8jdWXGe0PVXyZIXswChxgeGCOY%2BH%2BGl4KfQ6HxWf2gMHoLiuuNu8bAy7rz1%2BA3YQk3F6K%2BSnOnJrqDK2KRkwy3IV2Wuj7mjApPMmIxTZC3tAD1Vv9Orkb56juTuKN4WffHbj%2BqKa6XjG2Se00bAYNDcG6eBcrAWdMFIVPdhRoGPeI7n2mNFngYd12Dt4x24heaCAfIqkfIUUW4l2oPtSQglBT%2FRMIyZts8GOqUBwuKZo0K%2Fku6FwWVkW3e1Tr%2B2qzbena3%2F36DFFOqxVbf1w0MtDyjneXwznBr80jze2Iu%2FpDkRi%2BU3gP8wXwpJ4HsNv4%2BDp7wpPucfiGv89u5PQGkqAq%2FOtXrO9ENc%2BUz6nx9VWNwdqnCZmvX384aVImI6waaFYaHPzWJKgPtJtz%2Be1X8kxt9OX4EbaccWat6clpBfWrqIHc7PXF9TvdXC2%2FCJNuS8&X-Amz-Signature=6018efcbce40c0117055db3308204e9104c862f7630efde9721e0bc3e245cd71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

