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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R36WWRH%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCRGqgxQxuMPX7CJDdj3gHLVAw6JQmZlJMzd88ZjJGIoQIgCF6O%2ByxT%2BNaY7Zzse0vHv5jg7TDqSWtOjxQFO94SNFYq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDMAtFECrwwnKgAgh2CrcA9Y%2BdJkDsUUM6MSRCN4fJZxydLvQqNYQHblW27MJuc7ZQtpV6rmUh02ANxydHtKrFP04YXSy6Iv0EH3n6GclK0sIl1iU4CuFYQfd5fyrecq5xDbsMHVDbBa7x3K4g8rvZE6MRPNfOUmZJD283mkJvEddsaFnZcJqXfyR49vlSFlwym%2BLYG171qMvr1wVSN7MRoD4KpjjbzLXXJFjrS6VS1SMs3ir9HPhWfer%2BbORl50qjbhPvd8kWfy01dRjJst2QmBhGxckGso8TFsA8%2FAHEubjkGax2%2BdkuSiO%2BqKzHZZ1qHh6pBoYJ%2FLP%2BIteTd60Vs%2BeMEsqljxxU9KYBRE6TDC70iwq5B2BWr%2FBJA17TDh7B1IqmF7WzQz%2BFjGrBDTyA%2BR8A4OuRvapRZnNxjArXL%2F9D7xif0R3t%2BALqgUoGpJdFEVcZFifJdNkXr6H4yqacGTlpbkFMuMYvy6oZ%2BqugZRL%2BUlqZy4Kja7RSBVqFeKUCchmh0enJym4i2nLEBaQwMcX%2B65cTGoHektse2nbURihgtTZl%2FOTyujDrnXjyS6pKWYHM6LSwMEIjKryiWuhnTp71%2BUQafDtXTs%2BuMtqoyReV4MXmpbioRkCl1ZkvURLp6CrLCBQTzqeN44tMKSjqM8GOqUBH%2FdFijx2wK5hKMZg6yiKzsJkoTYPMtXtIsMhkRQXcLqtTiomO9G9a2Mi9Gn5OazXAg4qm1KI2Gq1JrIeiKdtGugcL8xaX6M0fyO3Ymvb0IvoA1StNYfzP8tAgkeAj1UI%2BjNoiLZ%2Bb6cFxjJKhwpy%2F7W2NQCF9ui8WBasn%2BmTbDUNYmZ6pEW7flW0KxbZKSOOTfcaw8lSNwJFgS9gYLZ02IKTEOWW&X-Amz-Signature=b7a6fbc8cf091b4dd86f56cf8f9dd5e9041fdc73a6828bd91451a286f335e76e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R36WWRH%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCRGqgxQxuMPX7CJDdj3gHLVAw6JQmZlJMzd88ZjJGIoQIgCF6O%2ByxT%2BNaY7Zzse0vHv5jg7TDqSWtOjxQFO94SNFYq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDMAtFECrwwnKgAgh2CrcA9Y%2BdJkDsUUM6MSRCN4fJZxydLvQqNYQHblW27MJuc7ZQtpV6rmUh02ANxydHtKrFP04YXSy6Iv0EH3n6GclK0sIl1iU4CuFYQfd5fyrecq5xDbsMHVDbBa7x3K4g8rvZE6MRPNfOUmZJD283mkJvEddsaFnZcJqXfyR49vlSFlwym%2BLYG171qMvr1wVSN7MRoD4KpjjbzLXXJFjrS6VS1SMs3ir9HPhWfer%2BbORl50qjbhPvd8kWfy01dRjJst2QmBhGxckGso8TFsA8%2FAHEubjkGax2%2BdkuSiO%2BqKzHZZ1qHh6pBoYJ%2FLP%2BIteTd60Vs%2BeMEsqljxxU9KYBRE6TDC70iwq5B2BWr%2FBJA17TDh7B1IqmF7WzQz%2BFjGrBDTyA%2BR8A4OuRvapRZnNxjArXL%2F9D7xif0R3t%2BALqgUoGpJdFEVcZFifJdNkXr6H4yqacGTlpbkFMuMYvy6oZ%2BqugZRL%2BUlqZy4Kja7RSBVqFeKUCchmh0enJym4i2nLEBaQwMcX%2B65cTGoHektse2nbURihgtTZl%2FOTyujDrnXjyS6pKWYHM6LSwMEIjKryiWuhnTp71%2BUQafDtXTs%2BuMtqoyReV4MXmpbioRkCl1ZkvURLp6CrLCBQTzqeN44tMKSjqM8GOqUBH%2FdFijx2wK5hKMZg6yiKzsJkoTYPMtXtIsMhkRQXcLqtTiomO9G9a2Mi9Gn5OazXAg4qm1KI2Gq1JrIeiKdtGugcL8xaX6M0fyO3Ymvb0IvoA1StNYfzP8tAgkeAj1UI%2BjNoiLZ%2Bb6cFxjJKhwpy%2F7W2NQCF9ui8WBasn%2BmTbDUNYmZ6pEW7flW0KxbZKSOOTfcaw8lSNwJFgS9gYLZ02IKTEOWW&X-Amz-Signature=b7a6fbc8cf091b4dd86f56cf8f9dd5e9041fdc73a6828bd91451a286f335e76e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WT2JWU2M%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB6hfkBiyq4jfBN1TBV4DQtsoebgopTxuSJRqbxA23OoAiBsHIXAAZ3KaOmqyMYAIblE5FzePkiUsxGxd0iZbCAjWCr%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIMJZVuYx6cag7Zqv5CKtwDtsi%2BrOXYH9vOc8D0iVlA4D%2F1hWCOjIJl4mLdGVZMbTUKy%2BR0kAJnyjM2V4JbO6oxU%2FUaet5vGVOU3Pgod4MpUT1wOsEzncUin7sA9Jv426wlOF%2BzmUd4e26XSWuHt0E64KS4VXdZJNDjvKdixRwFu3YqX3WYiayV1ERCrqSbp%2BebfM9KEvOnG71Jx5c0upg%2Bhjo4bT7VANgBNBdv6HNogjt4QyfKUzcv%2FYy3QSW%2BOMKQoJX5N%2B3N1YAh0Jq9E3JfSLJIMzGkz8O4YpKzppFM7oHVut5XbL0DWA34jkfqueOnWQUGkq2Htbwl8TN6Ps0d0easCRyeYyXQW3Rtu3wRBUw%2Bk48R9CIzQBB%2F6JAGqmkD3kQ4GF6mUlnSFKP03dcg8tbxrSDffPf4BM3f%2BTl3PIYOYqpWN0kJaKtu83uHndK4JVtJ2bieHnKWcRt6Hs%2F1lt5iYtF2Hvs7b7H8JvCLprWVkX55l7aL7fV077ckM9BysZaefgwDDpwUYbWogPiaozEu27T%2BZBIkqXTYfhwdMUranqxa01OOPEbZnXMQOV3HriVczD7WnlZKsBnAlvhEWBp8VHtXBrIMB1vTJG9l9etuBPF5Bd2am2BbGIUgEZFFJUYLg%2FoJa94kJRcwxaGozwY6pgEhRiE3bjEjJpgxX23f3372M1nQZJlzbGnspVAGpGaqv2wC0Ks9cGIelbq6Laux9WWccDUlbCcAEfAc3jGA%2FmRri0yoi%2B8kUahma9ayrM4c3Uq5vnx%2BBSuxr%2B9yuHRpUljRhUhESQPztMhqN477jjCSwC2eNwlWWvctLh2vmgfSrgJmchUZcXBP%2Faq36buBcCzOFiJCYARBXAhlIeYP%2BL0RtI6B5nh3&X-Amz-Signature=f0761c128dff63906424ab2378d429479bee9ca456fc1a9b21bdc8f0f27bb5a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK7ASJPH%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICSEXWG07Uk4U%2FR7bfB4alieyKP6xydW8cYldCEXAKlTAiEAnYz%2BeoLbLUjDbS6jlSbsjXj3e5nsZjNqT%2FH%2BPHGLrwMq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDB5RVNzbFW%2FKs6Sm9CrcA2pyTyRkMMTyoBvebLMF%2FCdLm5U4zJwpRLgtbFy6GQWsDItYD83i7U0qEfmYBvnTcEcOJAz1ZK3VWp%2Fs0A41cuLOwmUvjYuMN%2BFHOWoVWcZ37d3W%2BN2fKEkXN46jsJX4xHAK7wsss%2BHq8xqO5U1g5umwYdTIwFlNTNQawtNtQLYc%2BlOJvqMrsNTy1B%2F5wa5vgLsaOrXH0F8yLc7MxW%2BOoVVYpIblccBt8yVUSrx47G9SPT9RA3k16heA07ag7X%2FwhNXhpoj8JQ%2F0q1XKvTYfQkJMTdrbANFOuuDj8LpdkJW578IKQGcDv53Bh%2B5tqpU%2BBLe84lD2waouiwk5Zx%2F%2FPY6c%2BpDtYo7zb19F366B694VwfpZIgfsWCetoV2qHz2dye2b32%2FoXgVta0Eyb8A0YdIE0oORItFQewndaJodRbEFB%2BkBM2gtrkp%2FnJQsUnHc%2FC46DYpGr06TsKFHLL3pR6a9%2FBqxsjcrEgIHMGJwr%2BNkl3Wc45i7Oee5bitVgxec2Th81LfeS5Ki6WxDSd5y4uN8P%2BzOuKY7bIJLDAorWm75OycTWwu3QTZXc99QJ08RmkiypzazBS1Pg4w8EODpSLGJfS2I%2FcpEJBhz8WLBwWT6P8JS56WrYxg9mqtxMNajqM8GOqUBzs0kFis59L4gFXRnDDUqv5NGLQPGKzt1NT5ZYwznACFzzCxPJnw8AgYuaWdex2LrNZfqfTTvi%2BXHn2mmKM1SswM6QQWwxUKt4XRiXzwshPgkvu76hL7iM2A6%2FteHfNG5pFq4lkgL3563dd6gwWf6TWK6xJ%2BFJ6zTnc1fqzb4LZ4PNMM0CIHqsjJi8z5FSiDBCfuW0y9O6N%2F59M9Yy4KK5g6dliMC&X-Amz-Signature=93f27a7eb816079bcac846e0ac2a9109a2cbfb484e19cb893125a3b487c4198a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK7ASJPH%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICSEXWG07Uk4U%2FR7bfB4alieyKP6xydW8cYldCEXAKlTAiEAnYz%2BeoLbLUjDbS6jlSbsjXj3e5nsZjNqT%2FH%2BPHGLrwMq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDB5RVNzbFW%2FKs6Sm9CrcA2pyTyRkMMTyoBvebLMF%2FCdLm5U4zJwpRLgtbFy6GQWsDItYD83i7U0qEfmYBvnTcEcOJAz1ZK3VWp%2Fs0A41cuLOwmUvjYuMN%2BFHOWoVWcZ37d3W%2BN2fKEkXN46jsJX4xHAK7wsss%2BHq8xqO5U1g5umwYdTIwFlNTNQawtNtQLYc%2BlOJvqMrsNTy1B%2F5wa5vgLsaOrXH0F8yLc7MxW%2BOoVVYpIblccBt8yVUSrx47G9SPT9RA3k16heA07ag7X%2FwhNXhpoj8JQ%2F0q1XKvTYfQkJMTdrbANFOuuDj8LpdkJW578IKQGcDv53Bh%2B5tqpU%2BBLe84lD2waouiwk5Zx%2F%2FPY6c%2BpDtYo7zb19F366B694VwfpZIgfsWCetoV2qHz2dye2b32%2FoXgVta0Eyb8A0YdIE0oORItFQewndaJodRbEFB%2BkBM2gtrkp%2FnJQsUnHc%2FC46DYpGr06TsKFHLL3pR6a9%2FBqxsjcrEgIHMGJwr%2BNkl3Wc45i7Oee5bitVgxec2Th81LfeS5Ki6WxDSd5y4uN8P%2BzOuKY7bIJLDAorWm75OycTWwu3QTZXc99QJ08RmkiypzazBS1Pg4w8EODpSLGJfS2I%2FcpEJBhz8WLBwWT6P8JS56WrYxg9mqtxMNajqM8GOqUBzs0kFis59L4gFXRnDDUqv5NGLQPGKzt1NT5ZYwznACFzzCxPJnw8AgYuaWdex2LrNZfqfTTvi%2BXHn2mmKM1SswM6QQWwxUKt4XRiXzwshPgkvu76hL7iM2A6%2FteHfNG5pFq4lkgL3563dd6gwWf6TWK6xJ%2BFJ6zTnc1fqzb4LZ4PNMM0CIHqsjJi8z5FSiDBCfuW0y9O6N%2F59M9Yy4KK5g6dliMC&X-Amz-Signature=60616ed96666284b12e6141c46249ea036bced12d9fe87eab79e9421c5c4732b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXJM7MSD%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGyRboJ9RN4xPXOsggV1wtb3oD2hEo5r6RIFB7hsTyuYAiEAtmYHqckkbLbaebmmW%2FtYyYKEUojcSnBpgfqisdKaeoUq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDOR%2BStjX51ajjY0AtSrcAz%2Fh1farYVK24%2FxJ8civbKvbSnalg87QBuGoNhNilUdOKEV7FZTIQtS45M%2BKgdoD4szqoS7%2BFegAYoA2mcYgPdVML6jcNmQ%2FnHH0tXoWjQSjq%2F03qnSedBmqG6GE2h1Q6adm1gB7vefERn%2FIu0bmjKzpcHbnOf1SPeuamSKJhS784HYvwMwAyofiOMMsXw9omS0nTFVlOILxOKFwjY7h2Cs2g7LdUZpjSMqOEUAEAg6Oc5woAWxty4N5nSwv2kolPDneJWWRoLlARxWf6d1LGuKBJ5MRIT%2F8%2BqmdtD9nqT2In13hdztycq%2BExrhVSqplraPysGZup0UoF3igKiHaNtwrTRTQcn4p3li9mQTlKh0QyAZEj3VwaorfIpP2ZNd08pb1DooXeEoWifQbZqbvIqq2Gv6dKrLxKwdd%2Bp9W5PrREl8K9%2B%2Fq2KnFJrThTYiznUYWLNLPZdUWOQHYvR%2BYOO5LmD4brX5BfiBLnxIGjF6xgYrN97QMxZm5YpPXYTfftSRoXcbioNSvO50s94kiVdt%2BuMUIBAp%2F3gG7Zc23EzO7Dp67I%2BIYu58fqBz%2FOCHWyNDFI%2BMkDhG3070eJnOGQZ3TGT8THafh6hOzmu1mXvhjUGJOZnwjKNA8wfsBMKKjqM8GOqUB9AX9ieVUgBmoY18qlONxB7%2BMcKtJFtrhHFYA9SQWGNpAc%2FhmnSuhXUS%2ByvCW44P0tTXYwE8PjzeKto1DrmC%2FbniXZUqyvARkh93KxwxQW0xpaMRq6H5u4Bj5weOQdDj7MseARef2lNTWg1NAdfEdsGlGzY5OjFNuFBJWOkqvmOD72PXt4LJ7N9YTQ57nSXOXdL8sxr9%2BRZUWl4WJETVPRd5BsPyF&X-Amz-Signature=06922c0cc9afe620aa32731fa22f388079e7f899274e68ac9f9d7c0ba8952612&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7DIAUTI%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6WzJZLCwQ10QpHZ96ssQPpjeMSt3NDSz0fS9j1XqKPQIhAPsz%2FKxdTQ0Nn22sDL6Bs2qWufmoo6aUfKadKSClE00vKv8DCGYQABoMNjM3NDIzMTgzODA1IgxJCZJj1HuNL5yaN5Uq3AOmXxPDo%2BbbMmf12Dir%2FJ187b8PJzvWF%2FFYhy5MHBXs7VLKcoJBa2IdPeFq1byRKXUJOvO0siLhc8dA%2B2Seuakz9voolpHPc%2FHHoPm%2BMkY%2BJDc%2FTtuf03L8k8s1IO8y3coThiqHrOgDvU01lAXKaDEp6rrprvi57TCuzZ5MsdoUkk9j4LZGr1B7Un8k1eatzK%2BNPW7DfbAtoyjk10xyV5xK%2BN6Q2OV81WYHzUsHYhA2MpqfRuLq8vfxwe3gba4%2Fg7MgXcikXJWWz9SKpepupGu355yZtncl91Bj5cZ0d0z30UjlgaXLChB1qioM%2By46w43OudVRZ2riMSyr7akOXo9wlce9nPgHecHOr%2BAYvEW48UeSIiV%2FX3%2BV%2BLjc5q9Ue3t5sDdOXTZyMokJHO7vFDQKg8pYOy4kFuU3GzYA%2BcPB6fZ%2B2XoC1bHCkLARudz58n6fzdAEOHK9cw6%2FAozzlOy8hf0Vj0CZCJ7JJjogd5hZ%2B9%2Bx3%2B0ELVGtnX%2BngLEQ3zjPQE2wrmuz1w8Mr545ZxzUUAMmNmGAJPS5j7Zm4Onz7zm4MmrnblDFjKrsm7snFx6hJuQvYAe73TA1b%2FFvfB2bGWcnFpBg1tOSAmrjwlBADqiyg0gCdhtY3eLFGTDMoqjPBjqkAbnuNtBXVDfwy1y5H%2FSKclVY%2BdlU%2BG9XFIhhcPcKiQWixds%2Bgm6Jbe3SNId5E4967GB3pihFfcsld%2Ff%2BQkz%2FkxAbuL3kaTGVXQ8GV3iDGkOsssLqWraqRhNUq%2B0xwXJ51uW95HHGyyU%2Bo9r3rKHxm50guYhhOoPq%2BIYkyy1PfbuZFYo1YAuzB81mPnul9Uddl0KVZB0D5OSmFqOhacr5cPPtgSPI&X-Amz-Signature=9fb0b8f71076588a9c2197b236034d77adfad4d303e63a4026224880c32be017&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675H26XVW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF4yKbjDYhW8hCz2tkOqW1zUwXp7xkpEJDdXPOS0dwA2AiARL1Y3Cf9Fv%2B65jNqnZsRiVUdSXpjeMzhCgkwWamlZdyr%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIMXkcT4gPBt489Nw4QKtwDGZr4U2f3bBaLILwTiJ%2B%2FtrgFfspQA8iY%2BJFRTz1K3uxj70GjqVgImAFNKpTRgoVTcQ94B8iYLB%2FCMNr8tXrhiWC7nzU53o7%2BKY8oZyJRna1vLqPHV3Z9VWgLMs5rd%2BkIpN%2FMkkGXz5IzsS%2FG%2FVl8D3P%2FBBM7xOmSct9bx5HMc71M9n0tyOlwrHEAL%2FTJGMVgcMwrVVndDzxNm28izsykZgU0twOti554gAkG%2F3mxBaTXF1IR1lxAGXKNKUQk4JHB2jpLcqjr0cHmXUnxzrfEIL4OL6REwIIEGVlS%2FIrID9NWQ4vgVDwvU3Mi1kHteeM4YTqRSCMd3eOi4R%2BvNnd4vxgiBBHqXcnp%2BqxQV5OusdfC6acqf9qLWoRALjwhWNSfpc0VCIRKBuiqLEHKZIE%2FXJLulRfWQ45qK8ZIjwgxurTUVf30qfkUhoq2W3aPa5zbXtmFI8cglwsB%2FAqQsmcspwfPSBERbnrSh8AQzJJBhzfZOWYaZBZjfHENgVF32A3C1T8%2FnB19XUkFBKoR73jqvl7IftOltUJs3FjOOXOvVIvZjSsOnNPw%2F8mV8fLbdq%2BxjZcYq%2FeKqlj0L2CMSyYL2EePwSYQmanfrJJIunuRUOyiGe71UINEqkSDQscwrqSozwY6pgGKrmaAzdQiLFiXDdmt1I0vgJ9YJakvGOVy7VCAQBMUK56PhzHrcxkincn0mp2B7u8yZvaJAT5JvPzit%2FJNMGT7I8LZiLcw%2FwLUCT0E9uAfG3Vh9N%2FF3Bksvb%2BeRwcotqwa2gKjZTIfpy9z9yfkgNDr%2B%2FPd8R4vxeRN4%2FvLw9aTzfwqrvrsL51Zv1%2FysWvvB7YZvRGj8O%2BAq8eR8T7jZ2M0kuTP96AM&X-Amz-Signature=af8f8dd53f0933b105fbeb7911b95b7c86bf62caae957115ffe339ad22977bbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQM6DU77%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDKfEJtOS3tcyFNiqsA4mxzePrCBcehHNxII1NbPr3ioAiAy3kLvoCl3hFr9MD7rm%2BflELjVYuaHZMzbdY3ytB6Nlir%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIMkuDCW66wKZi82EfjKtwD%2B8XLWwvxIUadWyuOg4JL9%2BabgpHlbgRPSWXqR%2FeFfmZu2Lz7ePp1g768KkgZw4tw4K131zYQWS0Y3aC6yO0XMpF0BQHV27%2F3WaMksfMrleWsuiG5DEvJIThZ6Tp0v6tQAy6GeKRDa8wmbmuZxBDyhuCNrjlFXHJxrTS%2BUqS5ExetLchgGiAeO%2Bn4r3MaSH%2FKhr4o5Oe13beEOixXIjKceLOmx13imoMe6gtDPhAxPU0UrrLJzVp5xyT78gzwahMQQ1t5rXEOHp7s%2BvmTSToforBjza9NJ32R7%2BPYu5%2FBEv9YQNKQY8ifkGgvSktAWTds9ZknFY7Y%2FXXUkqQVHDhXut2E%2BLZHVJf2o%2FC0kezNk7WCXP%2Fgnx42pRkeg9%2FCM3O8in5hhksBY683AdhtmGIvfnORY7%2B0TQS0cNRPMdagJnqd89PmQBiZoQ50K%2Fu%2B4iuXacBoFz3fPbdryRueBpx%2FKypuSBRjKNw3ArmbHvzsbOVv4ShqGzMWIdC9rzrdR8F6Wl5TBaqZCgPj5BNuDKO6cqdCU%2BPHWmuFOhbtGz0JhF5rjde9ONw6cagQtm1Br7y7M8s26zaf%2FNUJ8WT5enmc6mctbK1rEZPAvMbesNnFP2n2gJ1ZGqLPLN6fi1kw7KGozwY6pgENQVQ6IKxYbRCW6%2BoJt78frREb4Hr8fQJ0IhEg7k9fd0BmQD2QhN%2BolxaiCu7atoUDFx5LYdPdhQmmz%2FZpcEHm2eNOJkqZXdUxo09Akg6rFQwXW4YJFzVDN4WYzAjsHrvopQUxZr3YYzZpcu8oIO6Pah%2BySmMi8NXcuaL5nzCA15lrz%2FHCQhQ%2BdaUw7lMNpTwY4My3uXnrx8hnRUKRUu1N1ApRZzWn&X-Amz-Signature=2debac0fdd278c4bb90c7b813ac14d1f318a6a5dee6c1a8b0b4bd3fc6eeb1ef7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQM6DU77%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDKfEJtOS3tcyFNiqsA4mxzePrCBcehHNxII1NbPr3ioAiAy3kLvoCl3hFr9MD7rm%2BflELjVYuaHZMzbdY3ytB6Nlir%2FAwhmEAAaDDYzNzQyMzE4MzgwNSIMkuDCW66wKZi82EfjKtwD%2B8XLWwvxIUadWyuOg4JL9%2BabgpHlbgRPSWXqR%2FeFfmZu2Lz7ePp1g768KkgZw4tw4K131zYQWS0Y3aC6yO0XMpF0BQHV27%2F3WaMksfMrleWsuiG5DEvJIThZ6Tp0v6tQAy6GeKRDa8wmbmuZxBDyhuCNrjlFXHJxrTS%2BUqS5ExetLchgGiAeO%2Bn4r3MaSH%2FKhr4o5Oe13beEOixXIjKceLOmx13imoMe6gtDPhAxPU0UrrLJzVp5xyT78gzwahMQQ1t5rXEOHp7s%2BvmTSToforBjza9NJ32R7%2BPYu5%2FBEv9YQNKQY8ifkGgvSktAWTds9ZknFY7Y%2FXXUkqQVHDhXut2E%2BLZHVJf2o%2FC0kezNk7WCXP%2Fgnx42pRkeg9%2FCM3O8in5hhksBY683AdhtmGIvfnORY7%2B0TQS0cNRPMdagJnqd89PmQBiZoQ50K%2Fu%2B4iuXacBoFz3fPbdryRueBpx%2FKypuSBRjKNw3ArmbHvzsbOVv4ShqGzMWIdC9rzrdR8F6Wl5TBaqZCgPj5BNuDKO6cqdCU%2BPHWmuFOhbtGz0JhF5rjde9ONw6cagQtm1Br7y7M8s26zaf%2FNUJ8WT5enmc6mctbK1rEZPAvMbesNnFP2n2gJ1ZGqLPLN6fi1kw7KGozwY6pgENQVQ6IKxYbRCW6%2BoJt78frREb4Hr8fQJ0IhEg7k9fd0BmQD2QhN%2BolxaiCu7atoUDFx5LYdPdhQmmz%2FZpcEHm2eNOJkqZXdUxo09Akg6rFQwXW4YJFzVDN4WYzAjsHrvopQUxZr3YYzZpcu8oIO6Pah%2BySmMi8NXcuaL5nzCA15lrz%2FHCQhQ%2BdaUw7lMNpTwY4My3uXnrx8hnRUKRUu1N1ApRZzWn&X-Amz-Signature=53de35f07c49663c40fe6f19087d2e322302dd76d972e970633d91c0762837b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626O7JBBA%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGUZuvWef10N0%2FdO7X2HnyDnoKu8AHY5nG3gX73ZPgqDAiEAhF8iiN69o9UKCpCYsaFQgoOR%2FHCGCOJkng0avJHDXSMq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDAyiAOMk5t0snivc3SrcA2SmepFbrzwwDv8dX0ZIfB74Ss3K%2BJEJ39YOVSZ9wDiA2XixdsPXV%2FYoKiYR5Qjya9xXI6NiLmzkW8NHn7H6QWTB9lFHDHDdQArlIqQUKtcqbJ9ji4GbLgKt%2B2uOhDbeH38UAahIUkuJS3Zdz9A45w9Z4kIzHp6vTAyqf%2BwgfT%2B2YCXaa63rOKXoK%2F5dLkwGnLaRV9dm9w%2FPVvWtDG7DpDRWC831mKX6SQZmmhX5G47VIyotqUnoDENhjsXspMl08Aptp52dEMoErfKWYpMFx9IQp9s6IvSmM1SS4quTFUvvhHd8%2F0K%2FbH2EB5WRzgp3T2bpCzRxqf2teZ5gjcD18LgT8Vcr7NfEzwjPnw1yp46jFaG393qTk0gC8uylDOET5oJ8iEm0w2uXAAdyeoWPEeRWKy3lSUfx8h9FGysOSO0lLPQKKqv53fI0SLN03BLKpP3Lp6kILtcTJKMhOkzHd5Qq98CTzJGkU%2BlAvtUFMcczN6wrQcpd3nLoKopmn%2FulOVaswVOSXN7gSm0nbu%2FSncDqKVA4Zl9sJoQ3XYAoEsxrLsXenRPvUzRRxzvelS7rrxfQw3YhbBAzB70Du4n%2FJJ%2BgVlTPvzUDy4e2B9mpTRNuhYY1fKz5AlvtuCqcMOGiqM8GOqUBUjRrpz82FaR3Gc5KjEvDGU1ry%2BmnzK9IkKKfN0RsOJE24H%2F2g5QiYwe2FwT8tfbWJ2ViDIHw%2FuJmgB4uL%2BwlnlP1flKEP4RBMLgCPIJDuAGaixFFaJpNyfgYGLWWsviU8BlmWIzrpkluY1a4JapCzbxdQYOY76hIXU7MBbcB0Uo6iK9sscbIXOg8%2FVHSSl4bWO%2FMFY5KWFnmiqf9muulJeaLWsA2&X-Amz-Signature=fa1f9afba3359bac64f869cd367b50252b53b4775cf8e55a8e00ab66d9886e56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMU3V5GD%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCR1gyKlMafCCgIYRIjenvbrcsQDIjouYhCggks9aaOpgIgaNaIoQ2DOzV%2FJ%2FwNcKP7VZXhkiNKVUQ2mV0Uf%2Fx1VmYq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDM0S%2BVxrkMtqcKnTKyrcA7jsFzew%2BeBEGbKyGyoiYW%2BIxKDS4YleOtFKLEuVIOYLwswdeNHo1XHYIpCjt2mxMBxt98hB834Lfu1wzpoMVPHx2fkWVtzVqnEBDg4QdOAWkWbJpts%2BYWvMmrJxloUJOcDYWJsxwvrCiuRuj6yFdVkxtLUn1bPEyhd%2FOeDDxL7pgRrx7v97bSpMtGe80CZB8WV5n8QzeqE5%2BeZu%2Bmzyz2WX3dEduvBkS7mJcSGqVhgkY3pcX7hTSsx0fjw3XgEoycYDMZoNyP4K4VwpUrb1kPBpdZ6MuhfidZxQ6VK%2FO8RKPkVlsVRSdAT7ObfpAqdz1qmd0onz0rueOa6J9zB1XXQe28%2BLISDFJ43C3ppQVV64FsGJVTPE4Lk6wecXrX6GMWlLcOBgcedvv7IFwPPTKod6hgZTT0gnciFXYD2pwKWZ2G1It4Y82AMhZf0o6nv9oZjQWPjIsZ0huI%2ByhUxkwdPwtVbJn%2BJ3BK%2FIKQTLiGbhA7ewgJbsXsMysWPhY%2FFGADTE1SGk7M%2FFO6UZksdZ3ejBY1xoIcI7A4qBjTmLPh%2BrJUS2qTOVpH5QDLC0m3%2Bmok13nbv%2F03H%2BPu4I86Xigl4YhsY9SSMI67IzmrfaprWofmaBLaWBBVm7kYsxMKWiqM8GOqUBy51huqtosqjjBD%2FTtb86XJO3qvh2ybFeZo6PVFnklHaiaRaXe%2Fqke5eDgr8R7deElU%2Fk76XKd1%2FC8KyyBnIGRYKaBOgy0mnd1o4Jga3ZDJ%2BhMtqDYDOpjKBkT33a7J7LktMGjHc%2FqEu4drlmEox29Ly3YXKz0txDUzIWCLKs%2Ffldgp8QwHLjHRVL6Jj%2F4Vp43VFoIBiQcT8NQgh0l%2FIKSimxtFyL&X-Amz-Signature=630a6ef29d149ccc64b4098ffeaddfd7fd2c022e8383c418f631557d6a39d843&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMU3V5GD%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCR1gyKlMafCCgIYRIjenvbrcsQDIjouYhCggks9aaOpgIgaNaIoQ2DOzV%2FJ%2FwNcKP7VZXhkiNKVUQ2mV0Uf%2Fx1VmYq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDM0S%2BVxrkMtqcKnTKyrcA7jsFzew%2BeBEGbKyGyoiYW%2BIxKDS4YleOtFKLEuVIOYLwswdeNHo1XHYIpCjt2mxMBxt98hB834Lfu1wzpoMVPHx2fkWVtzVqnEBDg4QdOAWkWbJpts%2BYWvMmrJxloUJOcDYWJsxwvrCiuRuj6yFdVkxtLUn1bPEyhd%2FOeDDxL7pgRrx7v97bSpMtGe80CZB8WV5n8QzeqE5%2BeZu%2Bmzyz2WX3dEduvBkS7mJcSGqVhgkY3pcX7hTSsx0fjw3XgEoycYDMZoNyP4K4VwpUrb1kPBpdZ6MuhfidZxQ6VK%2FO8RKPkVlsVRSdAT7ObfpAqdz1qmd0onz0rueOa6J9zB1XXQe28%2BLISDFJ43C3ppQVV64FsGJVTPE4Lk6wecXrX6GMWlLcOBgcedvv7IFwPPTKod6hgZTT0gnciFXYD2pwKWZ2G1It4Y82AMhZf0o6nv9oZjQWPjIsZ0huI%2ByhUxkwdPwtVbJn%2BJ3BK%2FIKQTLiGbhA7ewgJbsXsMysWPhY%2FFGADTE1SGk7M%2FFO6UZksdZ3ejBY1xoIcI7A4qBjTmLPh%2BrJUS2qTOVpH5QDLC0m3%2Bmok13nbv%2F03H%2BPu4I86Xigl4YhsY9SSMI67IzmrfaprWofmaBLaWBBVm7kYsxMKWiqM8GOqUBy51huqtosqjjBD%2FTtb86XJO3qvh2ybFeZo6PVFnklHaiaRaXe%2Fqke5eDgr8R7deElU%2Fk76XKd1%2FC8KyyBnIGRYKaBOgy0mnd1o4Jga3ZDJ%2BhMtqDYDOpjKBkT33a7J7LktMGjHc%2FqEu4drlmEox29Ly3YXKz0txDUzIWCLKs%2Ffldgp8QwHLjHRVL6Jj%2F4Vp43VFoIBiQcT8NQgh0l%2FIKSimxtFyL&X-Amz-Signature=630a6ef29d149ccc64b4098ffeaddfd7fd2c022e8383c418f631557d6a39d843&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RWPQ5OH%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T125244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnyJ%2Fl%2F69LrijFEBmeYeBtCNawL4RifwyZrw%2BslrPeGwIgVkriwYvLA2YtQd1VgMJ5TvXfSYZ5kXWYWyFmq0y2kWgq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDIb0x8c3SdmDjBwlcSrcA1sLUJwIzXQTiVR5RCegAnH4T917%2FPT%2FCXeZSuOSjfgzIaoJL5ka6o84AApOmFyOBh4ZXL7Lu9Ql536gD%2FGKtyyFONVRK6B9vehfXhHJH5GTfOuHO%2FI8SDE9z7V5urDg4IrMVMrhXR0zYiqo%2FeLMaA%2BXenhNI7s%2BAuL7qCtwW2fBUf4Cq2zcb10LJbUNdWW9FCmS21sxsO0leh3GIm2QN10FD4wD7jgE1K9mHeNP6gcjWkuewJwALsUgwLKcf9iFVCKVmz%2F8N1iqFbxKJOwl4MHOm%2BiGmabc%2Fe148qB98kH%2FYvywtVRFw9XYHiAJcRZdoZn0SaDNGvY24u0u9tl7OlOIOOB3c%2Bb%2FrpG%2FtBME2TKp9zUbVfAV6tOhKgEsJ9FlMEoKJdS%2FF%2Fg9D%2BujHil37x%2BMs7aCWscvl6IYS5GVZYINvIOthNkMyO8MOiV4BA2fna2q2AmpL1GyZGKFVVig43w0MuyYkIt446gIxvJ1tbiU%2BmUbQXhOR2n4scta%2BllQJKzsRQ%2FX564RVYTR%2BDpQNKmKOrf9GkHEKm%2BraSYhLS3pWLMUOwxIyBxQrnzsPZvfl516KUG9Qtsa4OszjaCFKJKUXQ%2BpYrI7wB9w6MZ5n7MY9zfvjuupWqASdYy%2BMOmhqM8GOqUB7uXdZ%2Bfok6Ks92R%2B%2BqaVTve9MsBsYu%2Bh9HBjhwQQVxzsmpTLloOzI5WONgg0%2Brno1KfDCsZBixzPjvUZmtBlh9RIuvZH0GYTQQsehxO%2BaFi1YAmv9x20UsJSAq%2BEvGCo3X%2BYupqabreVtjIKA1N9hvMakE3ylSc0hfyh6m6qffQQZ9ikjp%2BWEPO0nhYpDlDJ3kkItpsLmkXQyZAkrX99FtcI0WzE&X-Amz-Signature=25bc310a4b52ace8b05296643cb5440a6717c28c2d0231cf55d696beb1e8e09d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

