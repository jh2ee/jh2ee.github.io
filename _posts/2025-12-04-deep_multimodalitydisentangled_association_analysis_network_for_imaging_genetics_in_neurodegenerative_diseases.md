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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PSYCXXA%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEE9s0jnvYy1mRNE795YPwqz1bvsmLowPOJlOm0NW4pKAiEAq9moRddHqL4qaLgKLJ8PTUT3lOiaQ56q4i%2B51yFTa0wqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLjSgI3WrH%2BFaAhNPyrcAx6aydKzQOR7irdG9q%2FkXjZVjifE1XcosuhDhg7eBO6PDo6escKBbjAQm%2Fe4vL%2F5i4cHRqLNmeS2bvbiKiTkwAaIKJe4K%2FRQFLuqL24TqfVf2R1tm9S2l%2BQFFutZ0l50ynlYS2pHHRSATBVNFT%2F4qTe7A05BXkopjCKTqj3kDHP%2FvkuBOF7w7d4CutI%2Fg6aVylLsTfODMcf6RxzLFZwL9kyvXFhfUHn3e1KQpOWzrcY%2BL%2F%2FdQd8D%2FXB9rxm5Dh%2BuLxDBBjR6h852ipFdAy73EXsez8Y7m48GGPm63fWePUk0PK6VYEgW5fM5A6PClkysYsd7Hudst%2BI0i4pyAPmlKGprchjebYCkt7d9hzCcljTz8rm%2B3tKMqEEBGlK2rduXaH94a6EGAPrubPGknD3nbm8qnb94ZkLE%2B3HZCbKAmwMhwKAv1x6zxdC%2BqSdlsIxidGQJsU6aVU37k3phqjfs6WmHRZEQPZOOfwV%2FP%2B%2BNvk8CaCVHPwJTqRHQsMtC5CFrv9F09ZuO9pRLb1zUL2kHJNqEOvWK%2Bpax%2F4gnMgzU%2F2iFvnRwH9%2FfOTOyh5ZWfaRLvISBtWOjaJ6vVmC42HwH2MBaEh6Jj7xmA43fmPNuBwqbEWN3sctxEgfYKJYmMMnC2c0GOqUBsMZnSKveohcCX9GJzu1pIrn5ldNld5usTbN4Yg9rXAb37uhiaXE8IflYaax86DCfoFZdKgiMyKDpoXs0mAXZ5oeu8ceOZiMNADr7yCkiLTsTVIeBUgaAPtSiE6op0Z6dUc99UPCJ4HI9iueb1d%2F1xX4GtuoWwkm1pIqjt0PeG0ZYKsfCJbFFXn5Ageywbo9437IV2W5a3Q50TGLd%2FbQIHqZD4Bka&X-Amz-Signature=c6b24162737c72ba8bd69018707e118545cdf0961141e53288740259a9757771&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PSYCXXA%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEE9s0jnvYy1mRNE795YPwqz1bvsmLowPOJlOm0NW4pKAiEAq9moRddHqL4qaLgKLJ8PTUT3lOiaQ56q4i%2B51yFTa0wqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLjSgI3WrH%2BFaAhNPyrcAx6aydKzQOR7irdG9q%2FkXjZVjifE1XcosuhDhg7eBO6PDo6escKBbjAQm%2Fe4vL%2F5i4cHRqLNmeS2bvbiKiTkwAaIKJe4K%2FRQFLuqL24TqfVf2R1tm9S2l%2BQFFutZ0l50ynlYS2pHHRSATBVNFT%2F4qTe7A05BXkopjCKTqj3kDHP%2FvkuBOF7w7d4CutI%2Fg6aVylLsTfODMcf6RxzLFZwL9kyvXFhfUHn3e1KQpOWzrcY%2BL%2F%2FdQd8D%2FXB9rxm5Dh%2BuLxDBBjR6h852ipFdAy73EXsez8Y7m48GGPm63fWePUk0PK6VYEgW5fM5A6PClkysYsd7Hudst%2BI0i4pyAPmlKGprchjebYCkt7d9hzCcljTz8rm%2B3tKMqEEBGlK2rduXaH94a6EGAPrubPGknD3nbm8qnb94ZkLE%2B3HZCbKAmwMhwKAv1x6zxdC%2BqSdlsIxidGQJsU6aVU37k3phqjfs6WmHRZEQPZOOfwV%2FP%2B%2BNvk8CaCVHPwJTqRHQsMtC5CFrv9F09ZuO9pRLb1zUL2kHJNqEOvWK%2Bpax%2F4gnMgzU%2F2iFvnRwH9%2FfOTOyh5ZWfaRLvISBtWOjaJ6vVmC42HwH2MBaEh6Jj7xmA43fmPNuBwqbEWN3sctxEgfYKJYmMMnC2c0GOqUBsMZnSKveohcCX9GJzu1pIrn5ldNld5usTbN4Yg9rXAb37uhiaXE8IflYaax86DCfoFZdKgiMyKDpoXs0mAXZ5oeu8ceOZiMNADr7yCkiLTsTVIeBUgaAPtSiE6op0Z6dUc99UPCJ4HI9iueb1d%2F1xX4GtuoWwkm1pIqjt0PeG0ZYKsfCJbFFXn5Ageywbo9437IV2W5a3Q50TGLd%2FbQIHqZD4Bka&X-Amz-Signature=c6b24162737c72ba8bd69018707e118545cdf0961141e53288740259a9757771&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YA6DV3YD%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD2PXDotqQHWkeFvWHsmf7WwAYq3xnDNDAOkUFi2D5FwQIgDQz1V2DAr8wtCePOzo%2BmTtiJ1KImkRC8rlVBYl2Lo7gqiAQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF0az2%2FtnIHff1nutyrcA61PqnYXFTYSdSbAGAQJo2wpP06HvFWFB1VjhAPaIWC3RpfbfCFjXYxVLelClm4eLVGCJ%2BHMwLAMrdgfsi9xJYyKzzhqZjL7QiXhMbzk6zTxH8c5ahAXfHQ1%2F4zeQ30PQRRNIzAb9srVJIiW39oV3VCpQV8QJNYuKTMYtNewEqBxr0KIjAtSSqMMsgGrPB5OqBLfINwXNoBpZ0faAgzVQzEw4dJOYBIsyRLVyExJQDAzeu38krWaP5dvBkIg0AZJFl3amnd8f6M6TLtTG6IOvg3Esv0pIvneV1YEl8cU9ZxpIzSSk0ADvk8x9U20YkPPgz879%2FbfHbpvwccF5VOGGerQL0bnaPRUp%2B4TQ1RiYlJrQRH8Rgbz74nBM9zBYV6TkP7SSbXOKdFDlZel0wSBcA248pYOl%2BPmWerddCiMSZ%2BlTii5FFgeVw2lfyV01hOXDo5zUIhAd2iu3QzjY3uKZws715oYVfxXFJUl5qoH8OiYItJp32qfj6aUFYjICy%2BiydzqQDuxwlzfdcobIQf%2F5OQ7i13htI7BqfGcYhW6b2A6oU1su64nhmZKrZzuVXfzDrd8BI0f8j3oFp8XuPJBGxi4RbsWLwKG6Ocw0ih4GBit%2Fh%2BE042d%2FmU6pN81MNGe2s0GOqUBZ5jx%2Brxi%2Bfz5nzvEUAfhqKowC2luNHI9yVSFeC6dBgv2KfHax45La6VznumXOESkSJduJ24lNOPdZGR50Tmor0ySoscv98Ysq8hyfpAOubjhWHijjucg%2BT72%2FRV5P7yIeey1HXPXl8VAr5DcGfbUvdNqQlYnFJ2rxHbkM927mVG76cR3yrfOV3k%2B9AFB%2Bgs6cZNzs%2Bd9zhmmWqa58L3B%2F%2FvaLfsA&X-Amz-Signature=fd64173ccd17d5d8abeab5f288db0f7bafa95cd4b0f919b325a0fc50986d477d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDFDW3NU%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEbDvpVRIZoBJrzcuZU75kPQBPJNVbODbPiURkfAWiXAAiAKmUQrcniRDxGudrh8k0n2WqCdchV7cOYRXaNGMx9BAyqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRNOtOwERtTV8sGjfKtwDO4viju4ABJ8tq%2Ffm4meuJw%2FfbgPUZ5cAhX48bJR0TKvwBWIYz7pLvTXoN%2Bt%2FAGJ8B4Qc5vbF%2FnV%2F%2BV3OeS8IKVKqS0z%2B8Gr%2FolwdVztJzDBDAZYbv6SR4Ea7ynmHmZvzo4WSt09OQ6sHw7K%2F8y%2FazIjk679gmUm%2BiKAY9%2FSK3M7UL5dYs%2FaFBzMwGOPewyG2ENcgBcuUdJktvaMLy8QdffsZ7gdJByUkzVsiMM0zgXfsL2B1hJ%2F3RFNZExKo9c4CN3Llr5%2BSM9yLOKx0oj7eJML%2FjhUEwarvcg%2FGECfZ3%2FgOx8ggYJAAGF%2FdJi8vFL2Li%2BrR2nXQcCM4%2BgIRfnlXiLAS4ngs0q16D5mhM8jsq3asZZJwK8uK8kFx7KrmyHrX55ICCAA%2BhzsAUF6xtfbjfWI9BibUP1WYacUSw8emfEe6CF%2FZUSFyGxeAG2%2F7ks%2BfEFsKmoh6ZEZ17eu3VgpTv%2B89n6n%2BgJrUA5Ix%2BcJ11tVFa3IEx2qlNI2Qjrz09AwdYErjGwuduP%2BtU2PwSnfgraQbWe5H6mhnF5ZBrMvBfX%2B86UOtFsoltyIiRGarMb7cN042vPv1wrwBm6wZ4CJ7RkWYlFO0EqcYW69ffteTao2RDZn6Z7MC85dDUn8wsMPZzQY6pgHeTSS7CMmw3qJktciBNEPNAAYn1NcNJ4XtOknz%2Bnj799W4Ci%2BwoZLsstbqZu85J2BZJllWXCWojKQXSw6Iufb1eNaQZR7SDllu%2Bi0QbS5OcrPlaAZjQ%2BDh0ptozz%2BZ%2Bb5XTqdrJUxJ0XjNwOn%2BSZOogS6KetAsow36xqs8mF64ehSyhmYBmFBrjF5VRulDqRn5Go9%2FMeO2pSzRwI0ZP1get%2F2eMX9i&X-Amz-Signature=3d58db95d22b6d78020016b7004a392eb17c9aa12419ad12da8f78640ab75530&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDFDW3NU%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEbDvpVRIZoBJrzcuZU75kPQBPJNVbODbPiURkfAWiXAAiAKmUQrcniRDxGudrh8k0n2WqCdchV7cOYRXaNGMx9BAyqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRNOtOwERtTV8sGjfKtwDO4viju4ABJ8tq%2Ffm4meuJw%2FfbgPUZ5cAhX48bJR0TKvwBWIYz7pLvTXoN%2Bt%2FAGJ8B4Qc5vbF%2FnV%2F%2BV3OeS8IKVKqS0z%2B8Gr%2FolwdVztJzDBDAZYbv6SR4Ea7ynmHmZvzo4WSt09OQ6sHw7K%2F8y%2FazIjk679gmUm%2BiKAY9%2FSK3M7UL5dYs%2FaFBzMwGOPewyG2ENcgBcuUdJktvaMLy8QdffsZ7gdJByUkzVsiMM0zgXfsL2B1hJ%2F3RFNZExKo9c4CN3Llr5%2BSM9yLOKx0oj7eJML%2FjhUEwarvcg%2FGECfZ3%2FgOx8ggYJAAGF%2FdJi8vFL2Li%2BrR2nXQcCM4%2BgIRfnlXiLAS4ngs0q16D5mhM8jsq3asZZJwK8uK8kFx7KrmyHrX55ICCAA%2BhzsAUF6xtfbjfWI9BibUP1WYacUSw8emfEe6CF%2FZUSFyGxeAG2%2F7ks%2BfEFsKmoh6ZEZ17eu3VgpTv%2B89n6n%2BgJrUA5Ix%2BcJ11tVFa3IEx2qlNI2Qjrz09AwdYErjGwuduP%2BtU2PwSnfgraQbWe5H6mhnF5ZBrMvBfX%2B86UOtFsoltyIiRGarMb7cN042vPv1wrwBm6wZ4CJ7RkWYlFO0EqcYW69ffteTao2RDZn6Z7MC85dDUn8wsMPZzQY6pgHeTSS7CMmw3qJktciBNEPNAAYn1NcNJ4XtOknz%2Bnj799W4Ci%2BwoZLsstbqZu85J2BZJllWXCWojKQXSw6Iufb1eNaQZR7SDllu%2Bi0QbS5OcrPlaAZjQ%2BDh0ptozz%2BZ%2Bb5XTqdrJUxJ0XjNwOn%2BSZOogS6KetAsow36xqs8mF64ehSyhmYBmFBrjF5VRulDqRn5Go9%2FMeO2pSzRwI0ZP1get%2F2eMX9i&X-Amz-Signature=ee4de2b6cf0d74e68ee91c5c79b80dd8af2b6fd13670346f9fb724fd994708bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS2JGQ6I%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCdQ7M8CM5VPV%2FKyAecEdvCC%2BxpLhlt7w6f7TlS0Hc8lgIhAPgWuKumGcvUMmmH7TgvO8ThUiOaOeqRtrGcQkOaqNgNKogECLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwS8rTJFy96ycbemUEq3AMb%2FxzZJd00KFGHdpRQ54B3VIk6HBQRsuOq75%2FUwj8VTQTBtVkBWuI81Ok1ozhtIXoLTjvi8IXL7P%2BPWRshfsEN2PpjugyyMhSnzJIMyBk5sy0WJsxHb1JvC2ip7nJMXER90V%2BqNZloTeOHYJBbopZGHCxBRfmW%2Ft9xFtBQmn9rElKmWeiVE37sARg9mSVqbRYARUoSqo1gto16Xvm34999XHRmeSTA25mDQ6BNXTBgmqD01KZ0NJG%2BgY6Noh1OvPDSej4gZzv%2BnZAJhlPsCJoLYTcngjioTZbWCTVIZyGRA30%2BLOHcc0ejPekPDF6e6%2BuS7t8EptPoUbUxYc8vpogliVBAuJgWlFMHL97BNkuJsen1PUCP8bGIdzxG6%2Fv1C8IYPkne6ejwHI1P5pjiA5Z9u4aMlqbyDt1dOfRRPH7ASVLhSUNqIZzfbe7Zd8Qvpnvo6ylIi8PLSNdfC5F%2BlrF6iUBHWHVf8mCo6Eqwq2qg%2FxZvu2vr%2BY9paLCN0fiX5VsHm%2FgjZ7%2B34xDcMTXPlFSylnfnHUf0u%2BHZGCa61EvzaQX7AAlwIlrSIA1wAr%2FMpFxXify%2BdkEkN3tiRdlVGWGNAXLhflkKnw3TRdxHdEtoCcePPSNSdtcn06yk%2BjCBwtnNBjqkAYHm%2B39yWgRdNs7QMSc1FBNVXppDjOQOYMlsz3vAf9B1suiosdg60sex8wVyFpjWHwU5GVsy6NRhbhCIhCs702kMUk%2Fs9FOYCwR56V7z21sR6GvRKOh3iARdO5mcw2WisbZO%2BtxWzx0mHJa71ah2UnQRXOaxFFGLimUj%2BE40wnTl9zTd9DcYygUuXWMUyBWtFdyHx3IaMMC3zOu%2FfufRamMBDg81&X-Amz-Signature=c7d8a259336c6a3339383c3ea457b8724d0b780a85ad2b8ac4262f1d78ab0653&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FB4WDCU%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCO0RR6eVgFUum2mOfYJG0iDNxdL4LA2hKjIdIYE%2Bpp8gIgItXvlb0WKD%2FDh7r%2FSxUR2MgiVwdN%2BtP5jhGTyjSok4UqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLE8ZnS5ZoH6oRVgNircAxHjVSOdJyLNg4EO0WXPRJrGG1FyTA3NSkI7hUyBm9tCUINOjUlX6KIW6hRMDmmkMO4yL%2FXUhvIFUs35Wsi0b1UqXzgXzqfTe3fj7tVVPiQ4ebPPALxxP4vXaXNgXNJExr0UcK2eJyPdH16snfiNkP97QFMkagY%2BTWm6CTgyhMNtnAGevmpxGlNigjNGNfhpWr5EjVMaCvRpDLli6UYA8NU2b9txQnW9VMDOBfLEhBm6Qsk0qJEq132SXi81zB72Y6KTn5Lq1jebNgmUYSW1ebJqjFJZhfBEihDfYI%2BJHiPIAj0LVTzTnG3Nw9E2RXxQmAjhDVwe16FSe57V5ITEJgxIn5uxqdetoW2W3mvG8gOwZ1%2FqCkjLhNy07a7X4AgB%2BmGnLen4B1p5or%2BuB5GBjDWO0aQCXdy6k%2F2ekxIMJt3nIabCPDtRvr6%2F0Yafpqv0tNkx92XHsoSRsxM4%2FQ5Hh1musqiQPVkpvvLnhMwbjqD53nY%2BRAJ9knRmW54yVrjLzWDJyJIT4U2cvgKCVs%2FVH5NdSFMM3HNpPZSNA2ckEQopoX0fKBrVarVAfAkw%2FxGC2%2BiCLwNvSR193EHVx8Xw7Vn47sTR9kn7GUl6Zcgf82o%2F0aMI5JTnKaTm%2BsEcMPvC2c0GOqUBP%2BySnPtrxT4%2BxiYa2HiaYp%2FFiR4hRRA1sgemQ77pEgjXFeworf5L%2BAwVG6lalBLLcsS28tM27492YEe1AF89x5q6MmtgpQZoeqi8Bugmg7G1NAjGLNLIm7NK8PQRXLfKBYJFHG%2ByFePlGp9bDqtFmgLq4cPqgej4Qwv%2F%2BE%2FvyHeTUVNswtzaaYbM3POcGzLQdTWwxzjJxRNXdZPfnGAChGOxWvi7&X-Amz-Signature=de96c1508df7fdec0644610d4e7854c1d8e17094de89dab63307a1a949ee663f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBKHCDOB%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFi%2BTKEgB6JGoz%2BRzAks%2B7gOe5lju0qMYnHuZvolIhIqAiAhBj%2FfmnB1UhNGv0Sb1H4Nmz1ED%2FKpgZg93oYJ6L5jwSqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9dpnXD2tk%2FnqWlTtKtwD7KigCRUSMiRv1DKj6Hl58p5VYJ5mxbfIGXamU6Zsg%2BBGx4k8thfZNej1hGvT41tRnGiYrJ0zbq1gv1taahVKTfURxZJ%2Bi9jjIzelMQQWyfi%2FqIOx2riBJqxs5IMQ0EkY0DuVfd3RUl01VD1xNH4ce29XNgY0vpzuwvK2tmuTZLc7qWRUz7LKkEkU%2FxhW5DfQeU8BQuOQ0rDbr1Lsn53vExZBwEGtpUPDQLCKnHvL6QWIs5WMp4TPHy8omt1hCVER0do2cQJj3qiF28BeBxryTzhYCO2l%2FJmrdyCO%2BWQW0sYJnrIpIlg6M1A0AzvMmc5pnFfpjRHJEJqjqES%2Bm%2Behvs60MaVBQksptQ9mzsBZdt%2FjjPos4OzfEAzKtj%2BQkP9D4jUgwiTLpitv5lHOKD2LV6NWGh2L2PwPBfYBeb1HXOjkyqTAx9ffFM5gRLhDBmGe%2FSCTFgn2R9hvmz48jsURThcbGRbWZT37ftQl9yKxYCHmYVInmmkqmRBRAYcvSC94B9P0a9mWeHL0%2FvJdYzKIgX7HFeaRemhZf4Gb0vnnzcx8ATj7%2BFroiUMn33fqM0wdwmoTxKyPeatNdLRsFoFg%2Fx69G1ytYMG1BaNjiV%2BkMohx3Ql9j5xhWa7CXigwmsLZzQY6pgHNM%2FO15J4oQPeyHTnZXTZBWgs1VWYUVxFzflJomFn7qyWH3NYuWfdYdJ8VR1Nsh3M1KEq8piPNEP5RDaUYrqJwaBuZG2t8Z377EyXerULYmMLtANvhG0VMhM409YYziMDD8eshmOnnNF63lNUqY4ZeucfBARYpe%2Fbm6B5ehXdmonMULirCpk17ToyXaIUVDxL5O0oYoJOf8zQQsyyqwyOYhIPfGnF8&X-Amz-Signature=6a3725b6191200b6ffceaf79c4fc624f9f76ea4c18768ed9471ecb882c75dc24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6Z3UJGT%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICS8b28iOjQG8pF%2BnICaKO0LXJ8NCvZsCyT%2FWIJfZ%2BitAiA6owmSXnAk3Duqja8gQ6Ra%2BcLVi09IyF8zu%2BOgowxdFSqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWZutjdwKf6C%2BenvwKtwDQwYLd6fZ%2B7qdD1I7tKKvp9%2Bfhv646Bjp2tQHaULJdbi%2FThC9EAHJ6rVom2Jxd8R5klGvdFYY4fYmi8FKUwAyiQ8kOdipdB37ta3O25GU1h4pErFZVDu9%2FF6s%2BSylSaZpbslsr2y%2BB2Yk2ZMd5KRYtUYjX4gC2z9j3lRXqfOaCA9Wmt%2BnRWi9ltBWzk95Ib2LOOsx16EwtUzfpMs7lkl2mdRpLsxmdHc2cPWVDSW8QiVyiQ1mt2AM%2FlIsawHEbYko2%2BCkFwr3awAVL7AY%2BxmcJtF3C8BgI5XpKdhaAFwq5ili7R%2BELliPdvwTWgcMdlaeaviq9iS9mLUE9KBtjJk7DduSkrDc%2FKeyEQ5HROoCcjQ%2BA3IxTqEJPznT3omA4RlqsNM%2Fi3SVm7IN%2BieP181scK4hEw9SzmbRvbbiF9asuFMwqXCGBjPAgbSJha7GU7P%2BYpyNQmAX1l8%2BgdTIWKTJhux34WMiold752YQWoLibDozJgX4E6ZvpRup1IVKrREnVIvdBoD2C3FhNBCHPW6VN5%2B08aWmCrtpMD8Y9VKdEX86nsE5DNMcL8DlDXN9xF3D%2Bj7SD3XBfRfOHgJtMAucAC%2FIRbO6JTL4AEiQ3OsA4QeP7Oqk3hSPgpsHXO8wscLZzQY6pgF2ZOiFOL3gw3uwlL2YPoZ%2Bw9xS4n0fhUg%2Bn%2FbO%2Bxuo6F7lDv8t%2FX7DxfU6gMBfwM9iyhhyYjS%2FBiKgvac%2FKf%2BwaD0gyyE4gAEoQdCYXAhPjTUhr7sK%2B8xoO%2BB%2BoMeWXmDy0KDnT2Ju24OjdJRlqJnfmqgValjqJy9HOX0BkY238E77VnPh2CESdpR4MqHM37aXqPBnWw8nYiePRg0xbVTfrwdO8Yex&X-Amz-Signature=341e6c54b7e4fadcda5deaf2b69a5c79c6be6632b40fcc891542fcd9cdacd8b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6Z3UJGT%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICS8b28iOjQG8pF%2BnICaKO0LXJ8NCvZsCyT%2FWIJfZ%2BitAiA6owmSXnAk3Duqja8gQ6Ra%2BcLVi09IyF8zu%2BOgowxdFSqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWZutjdwKf6C%2BenvwKtwDQwYLd6fZ%2B7qdD1I7tKKvp9%2Bfhv646Bjp2tQHaULJdbi%2FThC9EAHJ6rVom2Jxd8R5klGvdFYY4fYmi8FKUwAyiQ8kOdipdB37ta3O25GU1h4pErFZVDu9%2FF6s%2BSylSaZpbslsr2y%2BB2Yk2ZMd5KRYtUYjX4gC2z9j3lRXqfOaCA9Wmt%2BnRWi9ltBWzk95Ib2LOOsx16EwtUzfpMs7lkl2mdRpLsxmdHc2cPWVDSW8QiVyiQ1mt2AM%2FlIsawHEbYko2%2BCkFwr3awAVL7AY%2BxmcJtF3C8BgI5XpKdhaAFwq5ili7R%2BELliPdvwTWgcMdlaeaviq9iS9mLUE9KBtjJk7DduSkrDc%2FKeyEQ5HROoCcjQ%2BA3IxTqEJPznT3omA4RlqsNM%2Fi3SVm7IN%2BieP181scK4hEw9SzmbRvbbiF9asuFMwqXCGBjPAgbSJha7GU7P%2BYpyNQmAX1l8%2BgdTIWKTJhux34WMiold752YQWoLibDozJgX4E6ZvpRup1IVKrREnVIvdBoD2C3FhNBCHPW6VN5%2B08aWmCrtpMD8Y9VKdEX86nsE5DNMcL8DlDXN9xF3D%2Bj7SD3XBfRfOHgJtMAucAC%2FIRbO6JTL4AEiQ3OsA4QeP7Oqk3hSPgpsHXO8wscLZzQY6pgF2ZOiFOL3gw3uwlL2YPoZ%2Bw9xS4n0fhUg%2Bn%2FbO%2Bxuo6F7lDv8t%2FX7DxfU6gMBfwM9iyhhyYjS%2FBiKgvac%2FKf%2BwaD0gyyE4gAEoQdCYXAhPjTUhr7sK%2B8xoO%2BB%2BoMeWXmDy0KDnT2Ju24OjdJRlqJnfmqgValjqJy9HOX0BkY238E77VnPh2CESdpR4MqHM37aXqPBnWw8nYiePRg0xbVTfrwdO8Yex&X-Amz-Signature=893255de4e068ee27bd28aff0fcba7e4279c35d23a6b567222a62a73bd50f8de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466562CNKGF%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDfo2AN8uI%2FcgLXgDY7N1mQfh%2FRx2%2BVu42YckGkYe8pOAIhALJ2DiAZ3KAAKOe6tEybPifQiQXU%2FTd1sGjfV%2FV5Dab6KogECLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxyBAg%2B7RHFr8Osn%2BIq3AOgFospTfEFbeiR36oGGya0QPYuKGtprY0W4%2FLaSXdmUBnLN73bwEmqrP9HbBiwxFDC2BSVoctUrgqxDo24SEWJZedNQ5aPKrcZexTEOnRv1xObEpgPpDsi6%2B3NQcDvIGoyBagaCxMKjpz%2FtNgEi7GQLssACtBzDXQld8g%2BBYAdZIa8ZcxIhrDHNXMRmIT9D4chyIdGAC1SbFWkJrB4X381Pe4lpVHCu5oFtFduQ5Mv4migcqhLVte63mdFQTbqnMLMHJau5Gf3II8FhY3%2BVIgnJcCipCLqqgc6YvrP0anm4GD1ZLWTOYHIKroPa%2FDuR0PNZcCUUyJcvuflkqDetoQLHEgW8wj326yBDh1PLjHS5sB7tEtDx7f0bOyQgNwV4VWeFSIi0tIgSrRtNGrm3N25%2FIaH6rme1LLJtAj7F21692nsjZE0RN0%2BY%2F8Bzl8w95o%2FVqqsUf4EPH676JqDuN0oRnKjsZR6MYaiUeb43DhM1SoqPy5vEQarH2VecjoIEqEQC7hi%2B4mRCvgPFJmtEvOS30ZND2NOtkWJhH93w0WhjGvkmU0vmsOmjkjhmhjQfuLtHrH0mjAFi4k1mSXv%2B4F4VLzpF%2FQk7AEBzQVxMOTYA5NZNaEkZBeGXFnc3DDawtnNBjqkAQOBRhsAwayHm2W7251tYolGzMR183J18iLtju%2Fsz7jEt%2BMQLIL%2BHk5ZqoE%2Bl9Igb60EI0tVnJbU5ceETQ15O8R3cvzsy5xTlTC2%2BSZKr%2FRNimqY%2BHKhzbFZIeWq8bhAZAY9nqcJsFmg3nM3vWNqEFxc4F3iIcfy%2FVxqdqSAurTLhybvEGh%2Bl%2Fkm%2F2DHwbM8AyGk8fzbHcwmWFn2HUADfY3rWniW&X-Amz-Signature=e06be244f912ff39b742494be84e30deb2fd098f9544d3581390b21e620a10b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNAC3FFD%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDP1lWKpQ2PRdb0fk880%2Fs1%2Bn%2BwMkdss%2BaRr2BGaHaxmAIhAOqmJUgtpL7e7zzMHw8ymAstofLMweAfaqMFSKpxYpqjKogECLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz81hdJ4SvWrFKc%2FHAq3ANcRuq2D4KlWyFrZwT673IkN2afPX3A%2BIYTFzI23pLe098O5CACb6JYUqUnpcm5wgVk%2FQRQZw70qtBGabCl9AuIvf2BxbeL7cW6RJbeP67oogJOooLZ4VnTPrjLQ6xijdjukE8pIHSLO2z0uoFgT%2Fra0nH13ZcKV9ktOWs5P%2FFXktVT8EH1tjxvIpuw7kmZSgm4fVddYSDe1mMEkP%2F3pFwFFexwxswwRZs0Oq5CFE0IDs4xxpbKdPTbQ2izRKElpPUCxiPfveUsRVUvIOC2jXh%2Ford9xjHmfqkjv84yCvyFAUq9SEaX6ghIsXd%2FWjwrw4jy4rcd63vnfGSw6r0dL1qQ2oqARshQQWWYgVJ02%2Fg0lSeubYi7PvdmLC7Lvr4VCImJ0sqFLLdUdpoEiP418RmgIqyXgZRMd2NKn7oMRWv%2BOU9w%2B4LHqdep5iH%2FkmJNDleXUpt6rx8kn5VP3GL0T2175hHY3OX%2FnG6lev%2BHTqH2AmrUXPbrgVGER%2FNuBvlAvbXtGADQarEPlA4Hq0g4Ix5LWozwn%2FONkmdT%2B%2Bq1pZkouR0RkHvWK03VgvGZUY%2BwoJXxUhxwMLxA2y%2F3iRWlcF%2Bw7ZJoOCBKbyF4hOVjj%2BS%2B9ln3Xr4RtV06gliodDCyw9nNBjqkATIr6e2ies9W7OWCqRWwGv92y0cv2V07A6vqoZdqv7eaxrzZMVE7298Kvuy08ZjzBfDb%2BdAoDWR6Vouo%2FluT%2BkgUn5u1ebIu6KUsz6v6A3icVej471l29bSAhPAGTMswj7YS1RjoWRTVoDXeQWbGAQuruIU7dmxI3AvJiS171CyYvgxT4ZyME9MStsKf14YCbN9tTgACRtZIKdIs2jm1sDMx1sp2&X-Amz-Signature=3995b4e05d9f420c66395c7ec32f7ed2fe86bea5f1e0123331f91f08be3f8a52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNAC3FFD%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDP1lWKpQ2PRdb0fk880%2Fs1%2Bn%2BwMkdss%2BaRr2BGaHaxmAIhAOqmJUgtpL7e7zzMHw8ymAstofLMweAfaqMFSKpxYpqjKogECLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz81hdJ4SvWrFKc%2FHAq3ANcRuq2D4KlWyFrZwT673IkN2afPX3A%2BIYTFzI23pLe098O5CACb6JYUqUnpcm5wgVk%2FQRQZw70qtBGabCl9AuIvf2BxbeL7cW6RJbeP67oogJOooLZ4VnTPrjLQ6xijdjukE8pIHSLO2z0uoFgT%2Fra0nH13ZcKV9ktOWs5P%2FFXktVT8EH1tjxvIpuw7kmZSgm4fVddYSDe1mMEkP%2F3pFwFFexwxswwRZs0Oq5CFE0IDs4xxpbKdPTbQ2izRKElpPUCxiPfveUsRVUvIOC2jXh%2Ford9xjHmfqkjv84yCvyFAUq9SEaX6ghIsXd%2FWjwrw4jy4rcd63vnfGSw6r0dL1qQ2oqARshQQWWYgVJ02%2Fg0lSeubYi7PvdmLC7Lvr4VCImJ0sqFLLdUdpoEiP418RmgIqyXgZRMd2NKn7oMRWv%2BOU9w%2B4LHqdep5iH%2FkmJNDleXUpt6rx8kn5VP3GL0T2175hHY3OX%2FnG6lev%2BHTqH2AmrUXPbrgVGER%2FNuBvlAvbXtGADQarEPlA4Hq0g4Ix5LWozwn%2FONkmdT%2B%2Bq1pZkouR0RkHvWK03VgvGZUY%2BwoJXxUhxwMLxA2y%2F3iRWlcF%2Bw7ZJoOCBKbyF4hOVjj%2BS%2B9ln3Xr4RtV06gliodDCyw9nNBjqkATIr6e2ies9W7OWCqRWwGv92y0cv2V07A6vqoZdqv7eaxrzZMVE7298Kvuy08ZjzBfDb%2BdAoDWR6Vouo%2FluT%2BkgUn5u1ebIu6KUsz6v6A3icVej471l29bSAhPAGTMswj7YS1RjoWRTVoDXeQWbGAQuruIU7dmxI3AvJiS171CyYvgxT4ZyME9MStsKf14YCbN9tTgACRtZIKdIs2jm1sDMx1sp2&X-Amz-Signature=3995b4e05d9f420c66395c7ec32f7ed2fe86bea5f1e0123331f91f08be3f8a52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NPSEBT6%2F20260315%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260315T122231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA%2Fv2z8vO%2BlP7XkDGjiLh%2BwLiXW0vcV6I5OekUbWYVQJAiEA8%2B1pQwG45CCgKtcHLpMsLVCOBl4eL0fz3cfoIhI9%2FBIqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLjhy9aBvbSQ4%2BPsmSrcA2A4pjHHg8%2FDZqxOrlfk5c88b80bU3hbBq1OpFiUhI8rJkhVeMJHbmnPvRhJ%2BaQnUtuRvwz0qPqwZ%2FUO5ILCI%2BRGqcdP8B6%2BeGZDQPzlLbgPOVIAdfUd2KEw0xkKJzB57x1Cevs9MnTFOonw67RvXzpxFbXSyUx0nF9ji9E7vS1f%2FdGdqLp4VYBw4IycZ2GxMzB9k%2F8k7iTIEyOXXlY8px9qZ67na%2FpwYDHGbiL8qUfZl7X88cYtLelgyb1mWKQE86cMNpirk4AuufVvREwuVVMOoCHjatcMCQl2vTseMfrfL2uRtG1wEDVDcrLsl5E8jblXL44%2Fxq26UkHcHGV0mnp9mXQzLf6GWmKDNuXXXltMpBuSIw%2Fvgzd7Ccse1bfop%2Folz1G7f3LJeeqvAE2jWl17WAJ%2FEBNX9uKFU47PqaiySMrZM1ERim45uPZpLuTsNpFiIVD5C%2BBU%2FswXsZo5fkWOZRyczUZinlQnr%2FaIQlZ802J1PtK4Mh0vMcFF9r0QR18cPApDR5gZJ2GWl8N8cZCvnk8Y7nz9c3saBcH04clQzuF%2BD%2Fo%2B%2FyABB2QG6v1DkPPUA7txq7dsCv1R8CveQ4aG7PJXRu5eG7C6nYfvzrsI3JlQn24m2f1EDXYrMMvD2c0GOqUB%2BsIB0B6VdzjWVUsVisrEyDLL0BgxbmTQpGaThAYtjm%2FhWcKPZ2rUdIsUoS4BaBQCZCdd9gvA%2BCwC2ZQ1c%2B%2FzEC6sjOL%2BOpTnnHPU1QAAscHIzuyhe8mLGhUTpMoMsRxVojof8mOb0VokU9cvjhoMtDSjaqA%2FDNyHqUiWhNwNdHTNAl4hDZJEoLQJ3lwmJIK7xEvWa7d9XW4xQdtezbSl8DcuzRHN&X-Amz-Signature=265b960eef3ffe9db5fec052f2084e079b21aa4e00607ebf91b5742dc4fd84ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

