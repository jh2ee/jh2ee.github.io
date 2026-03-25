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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKFJZMN5%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC23pP0PZr%2FvR7NuXwVMsvPZUnFXCY%2FlvfXXvGrBFoBBAIgJCIv83zAQ9Bn0qzeRm5cyjBDzIayoH9Ppksc1aLs80wqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE%2Fo2XOGpjQIPzdZ8CrcAygNiBfk26gRnp9%2BES7NSYhqZfdDDiduo9QYU6W%2FF6pjoa1M8H1LGiQbCmcZzDxpPTd%2BN%2FX3fvgpPFYmW2TcmvHkD00VlcHnZRq3EuXB63KjaHLOEPnoW0k8nZkZi7CbIOxnlC3CYy8JT6Ny%2Ffr%2FcJOEYivuAIoGC9zs14D3ONHg3ufIfupId8lQJnknhF6WBOHkIWiPb%2BW2lcK0fjLIMylQCJXbaQyr27%2BLnAHz%2BjDpMoZDmB5eQOYOuNsSSsqI%2BvZGXuNjlY2nRQrsKVErcl9U2zDxhHa6xVOzGRDsytQBmW4LZZdEq%2FL1l%2FwrTHMATkmCpzlRqRoraYTI83zUDqKpGbHcrxdZ76QnVdrrQD3tRDAoN8WuXDCDEuz4tbIkBXmiEVEFowW0Mao7jz9pOJrOO5b0UiapVEkUgspG%2F95JvylNXmOKtpnDKpqP9nfIpp2zha9SkvPrXkQNJ2XUuFaR2AnR1Xba2eZZsFSA50hQX5HfZNLdS%2Bm70yQm4j6ykbvCqVp5QSYGnmr10H8TOJsOnzIcELrL1zyx2%2Bl%2Fn63ptlFpDd%2Bl6yIO98GowfW9oD0dGPUu05nuNg2L6isLQj4vSmiGNsxoqpgYaTnjRhU7NtdrBd2DYPJjjXT3MJGNj84GOqUBUNqmAA%2BT7XkZaC6p88LL4tJvOXOZF42lQjAvWqCD5prXRIjpxEFvZfiyvf09Ri6jSmuiQnnmgp6BFoblI6Tk8v8i4y1vH3s7lbTEiSuVRxMKYkQI8sFcQ9MPuVX%2BgdVg%2Fa9W8Pi8sXjEPJRH1p2GbQGBBFi2s9AkpGZ5rK%2BKjOu34ynJa1aPMc0qCkTrfy%2Bljt0idIcNSsEC1AbRHb0t6E1ym8%2FK&X-Amz-Signature=9a04abef9c982cadd8b7c37d7316264e31feff38419eeac481af188b66194e20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKFJZMN5%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC23pP0PZr%2FvR7NuXwVMsvPZUnFXCY%2FlvfXXvGrBFoBBAIgJCIv83zAQ9Bn0qzeRm5cyjBDzIayoH9Ppksc1aLs80wqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE%2Fo2XOGpjQIPzdZ8CrcAygNiBfk26gRnp9%2BES7NSYhqZfdDDiduo9QYU6W%2FF6pjoa1M8H1LGiQbCmcZzDxpPTd%2BN%2FX3fvgpPFYmW2TcmvHkD00VlcHnZRq3EuXB63KjaHLOEPnoW0k8nZkZi7CbIOxnlC3CYy8JT6Ny%2Ffr%2FcJOEYivuAIoGC9zs14D3ONHg3ufIfupId8lQJnknhF6WBOHkIWiPb%2BW2lcK0fjLIMylQCJXbaQyr27%2BLnAHz%2BjDpMoZDmB5eQOYOuNsSSsqI%2BvZGXuNjlY2nRQrsKVErcl9U2zDxhHa6xVOzGRDsytQBmW4LZZdEq%2FL1l%2FwrTHMATkmCpzlRqRoraYTI83zUDqKpGbHcrxdZ76QnVdrrQD3tRDAoN8WuXDCDEuz4tbIkBXmiEVEFowW0Mao7jz9pOJrOO5b0UiapVEkUgspG%2F95JvylNXmOKtpnDKpqP9nfIpp2zha9SkvPrXkQNJ2XUuFaR2AnR1Xba2eZZsFSA50hQX5HfZNLdS%2Bm70yQm4j6ykbvCqVp5QSYGnmr10H8TOJsOnzIcELrL1zyx2%2Bl%2Fn63ptlFpDd%2Bl6yIO98GowfW9oD0dGPUu05nuNg2L6isLQj4vSmiGNsxoqpgYaTnjRhU7NtdrBd2DYPJjjXT3MJGNj84GOqUBUNqmAA%2BT7XkZaC6p88LL4tJvOXOZF42lQjAvWqCD5prXRIjpxEFvZfiyvf09Ri6jSmuiQnnmgp6BFoblI6Tk8v8i4y1vH3s7lbTEiSuVRxMKYkQI8sFcQ9MPuVX%2BgdVg%2Fa9W8Pi8sXjEPJRH1p2GbQGBBFi2s9AkpGZ5rK%2BKjOu34ynJa1aPMc0qCkTrfy%2Bljt0idIcNSsEC1AbRHb0t6E1ym8%2FK&X-Amz-Signature=9a04abef9c982cadd8b7c37d7316264e31feff38419eeac481af188b66194e20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YARZBVE%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICvPLih01TcjpTyiuD%2FpEjYJgl3qvkStL5Jf3aI5%2Bum6AiEA%2Ba2vqKs%2FlGcMiVmAFFewOi2YHpglylELUc7U29WtYLQqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDtPomWhxQMwdCkM3CrcA9hH3CrqWlJZWZpA2jZ7aE90FkwUfWBAvXUhR2FSvONqN2GObcYXIckKNxOs9tb8EA3OmY0qpyycoLiJnxkavFclXwoWnDWpbVUytjNpG6DQlWQycEclR0zYwiKDkv4Wrbk%2B6Uc9NiCiFeq2LFVBPh6DXA7p6rlHWurEZksrj71SvQhCOBUwrKk44hHiyD9Ol3LzpBNgTpbbXlQk67F1OTuB6suEuC0Tl1nx1uWi5DO02zQsSdEFD3oK7FHcC5m5sDji0manXN6FKUOVYn4WWjUIJIzy98f%2Fro7Viw5NVhzY4EWxWv1ai1TCcFOy564fLsVDUqowHLC9y1GLLjsUVPdhl1AimVE7DbTcQtFvNUvMM%2F28p0FhZCfrp5nKRGZdud63HFiaImz5HLFTZ6sSdlXuWuB%2BoSKHz%2F16UTfxKMpvVdRvsaQkgE%2BPxqxQL%2BBYaMket3ZVGMMd3To3k6KjfmkalFxRMPjj401i7VR1tXqcssrJuUY4mR%2BXodwfFWau9%2FHSuWz9SSNe5E2huEf1h1Lh6OSa9BUtwIghXIXoqo3rIp87chJzvZRf4pCcqwp3sYxP9MnhUbcyiJGaqJN%2FlM1pqReQvuQF%2FrG736fRRirWHTZIJ6rkt3B0qcPdMJmNj84GOqUBdyAHLi03PfJ%2BdP%2BkJxwk%2B7VZKaUNY35UtWqMk%2BE9amfN34KZ63BQTDWTwXaFxoCYCppG3wI1cYrfKYB8Ol98apeOBko26vO7terdJ6YeyAEeDJ9vzeeys0Ru0UVzqFSmE%2Bf6Z95x5oUV9dhsYf4BoewniLTpgY1X9IOAKRfFDPK5tao92ae82dLgeA8cWfPBoaTQdgeC%2FK48km34Cn2YzayfCb1p&X-Amz-Signature=9fc40351cff632c3042eed20fb5447dc0d00656033c7307455de40c0bde54550&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQEVRHO2%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBG6Rbcht7O4bqa31SZnosgDykeqRop4nmrudhoLFwwUAiEA%2FoGS3bp%2BlZU08FjuAs%2FG4ZV3YexLiICJrH6LjQTdEvEqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKWH2jttWbs%2FoHPcwCrcA%2BT8Lyutx9FmANmqRrBtQRHfYS%2BzkMJJv1LCXT6zBe%2B9GBtiINXeSlsD8strCYR%2BzZQ5Ol1kw90U5N5lYjJLhjgGyED8kGi58qy74vuW2WqV1n7SmkgMU4LxcoKaM3TJsh9BBHzXoewzs7jeQwo6ox55a8J57ZyhOn%2FTI3q8oTim4FJdTRu9rEj79NalRM3G8uRcpurqwF7HNSf5R3xwDVDavFLeNy7QEe0pW6i4Q%2BqKIz9LiIruP9awmMRj%2BLFfUHpBlH5lhYZWKo%2ByJOgfSy37RbBkIDzNVraKzs%2BApb2XrTE6tNUK9XdPnN43RCtpaPu9DcN%2BDbI5IIc7U7%2F%2FiAby46k0fjCqQbvQOpxCK9osjNplT5DdE7ucqZrIHqIXrU7MSfiyju4FD3JjXhkdQGrmdB8%2BJDSLTNitvSTBwAZQ9kols1M%2BR60dqzJM91CSfBU%2BpfrnLURRY4ErES5pqffvAMk0gu8dcGOC2%2BKBqXEHt2%2FRGfNt1xSKZAYQcuEVDYQeo27pfetnd5oiPIHsrVUlKdVPP4cAbYZPWeK7aIE0oCoXwhXWNA1rfR%2BbXzwgbU8MuIgg6KpMb2VAn44LBCypSglizBRbVOECKyI6tcAh%2FazoA4INeFW5R3UwMLaNj84GOqUBBqRtz%2BlaRyeVYXKsdWpzVsyL1ymL2VnKAn5Wbdq6ls79ncwSB1eUPFl3JfY%2FTyt42zuXwLKR53HT%2FQScH0qgUJmqif7kxq5ri5eVBCcyWlwYWmzEDzDe4J%2FxQ7xyPpBWW5FFKeWi5zTPS%2FB05jeGHOlrB5Vl7c%2Bme6fkxwfC8Fv8NhAsmMgMnZllpHeC4H3vv0Vzu%2F1kMEUI94wgd2YBGymjSJrC&X-Amz-Signature=6b19318e99c8574534cadd345cd809ee3de8c8d2b208fb0cbd7b2812257b36f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQEVRHO2%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBG6Rbcht7O4bqa31SZnosgDykeqRop4nmrudhoLFwwUAiEA%2FoGS3bp%2BlZU08FjuAs%2FG4ZV3YexLiICJrH6LjQTdEvEqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKWH2jttWbs%2FoHPcwCrcA%2BT8Lyutx9FmANmqRrBtQRHfYS%2BzkMJJv1LCXT6zBe%2B9GBtiINXeSlsD8strCYR%2BzZQ5Ol1kw90U5N5lYjJLhjgGyED8kGi58qy74vuW2WqV1n7SmkgMU4LxcoKaM3TJsh9BBHzXoewzs7jeQwo6ox55a8J57ZyhOn%2FTI3q8oTim4FJdTRu9rEj79NalRM3G8uRcpurqwF7HNSf5R3xwDVDavFLeNy7QEe0pW6i4Q%2BqKIz9LiIruP9awmMRj%2BLFfUHpBlH5lhYZWKo%2ByJOgfSy37RbBkIDzNVraKzs%2BApb2XrTE6tNUK9XdPnN43RCtpaPu9DcN%2BDbI5IIc7U7%2F%2FiAby46k0fjCqQbvQOpxCK9osjNplT5DdE7ucqZrIHqIXrU7MSfiyju4FD3JjXhkdQGrmdB8%2BJDSLTNitvSTBwAZQ9kols1M%2BR60dqzJM91CSfBU%2BpfrnLURRY4ErES5pqffvAMk0gu8dcGOC2%2BKBqXEHt2%2FRGfNt1xSKZAYQcuEVDYQeo27pfetnd5oiPIHsrVUlKdVPP4cAbYZPWeK7aIE0oCoXwhXWNA1rfR%2BbXzwgbU8MuIgg6KpMb2VAn44LBCypSglizBRbVOECKyI6tcAh%2FazoA4INeFW5R3UwMLaNj84GOqUBBqRtz%2BlaRyeVYXKsdWpzVsyL1ymL2VnKAn5Wbdq6ls79ncwSB1eUPFl3JfY%2FTyt42zuXwLKR53HT%2FQScH0qgUJmqif7kxq5ri5eVBCcyWlwYWmzEDzDe4J%2FxQ7xyPpBWW5FFKeWi5zTPS%2FB05jeGHOlrB5Vl7c%2Bme6fkxwfC8Fv8NhAsmMgMnZllpHeC4H3vv0Vzu%2F1kMEUI94wgd2YBGymjSJrC&X-Amz-Signature=c422703d83d90b60f8050291591352312ee7cbe97ac2d5a90d97283784e5aae8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634KLMLTG%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRuBH5MqSLVp%2F6wwdpdXm8j2KRhKyNxZpsjgZ%2FRHYCRgIhAI6YpINbhBgFurUee0HJew21aJmxvX4b8I1F6VpZDeSNKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxjNE9Zm7%2Fm7T9MyJAq3AMyJlUMd%2BFnKIpCtJ6VptTYl%2BgIr0b5qJvjM%2Fiz9LtzeS5CfvrUlZ2OjetbQXQzGrtdQ7nlG9v1YVDUJwARHswL6uxGR5fCqnalBFnxBKNyc%2BOYGKJjIWySw1DXo3gO4FcKEiqZmRkdNlybSUFa6L3gUcVQicRQvg1r3wlCtt0%2BtyCyWXWG59tWbBW2Eok0U9CYFndGy1WyYRNX1jctu1tpnxgyTrbxOEnbTSkoIrFxgIKBfX5L%2BuUkOCTAxtDDI1fZCpacMpYbnymY5STO4e4tEVm231u9NpBmlGdAXZviBsk61subkskUNDViC%2B5YAokAkF86ROtbsbdhvGD163YsoNO1nCBLouax0mInPtU2%2BwHACjvrgX%2Bv5bU6ZqHN%2FJxBBf3W7E9646zHuHXLiC69uonwKk%2B4R%2BFnqgfj09YPz%2BqiVFKnkDtoxiMgp0QK%2BMn1U%2F%2BbLJLsX7O%2BtJSuefhmpBzbB6ot4rLJf6%2FfPgwc2MZbAKm%2Bjye%2Fhfc7bJe%2FFWNCHXM8Vp5bMqQVBxVOV59iN8iLetJgOo8YFuh7srXm2NCUZf4PXXhurt20DZ%2B%2BhRykjK7fySL%2BXYWJb1hqogau7J2SrIGQ1ifEHC%2BC%2FhX0rUC8Ib3wxV%2Bua56t1zCmjY%2FOBjqkARw0pKB%2BLA0g6BSJhaviJEsXLkrLf%2BBK7fv28uSJr%2FnUPCF3PhqVs%2B6Tpvmed3E5LAeUMlv09svO0mQjjCyaN%2B%2FJKKz1LciFwWy0gwL76drMN4jGEgbn2vrRl8ZgiCOe%2Bm0s4MFXUsZsUVTPVHHuBCf0U%2B3%2Bq8Sp7zc0alDRc%2BmgLINqfL7v2o0QnxxHAlfovxdcoZoyi5Rx%2FqeK9Ylhk5htfPGD&X-Amz-Signature=91ee6b0c64ddcf9da542c5e82f8367040cfabdbae4bc6b5d127e3937cd27ca85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VUOEX52%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHFs%2FXeNrl2i2Gr1esJyaLuN5tALORNcKV1pmub60jELAiEAidjTb%2Bi8hbaqgByWKngYs9TenG2%2FzryoXjvKftL8KlEqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPDBYnykTI%2B2E7mNaCrcA5MSR28DQ0F114MW60inrRMgh8Q%2Bw3qZ25jHx3A1KDV4HSEAc6QKI70A62BuvqX%2Bs0eoKAG3uywLnGG%2B5vpUHbt1wXh%2FtOkcaobtZBEJRPDQVbL6F1x%2BkN2eYwh7iu0XQBl089xM9bzipeGL7MqFAnEUsFwrUOG7ONmtHUvFcmqLjqe5%2Bti0eTl4OYj3clh2DWNoGK3gVyIVa6wZ39mclJbA2uQn2vXxH7YOC3vb%2FhsFsaU6yL%2BFvr9zKfb9Zud2bFZOped7XSxRsb1ZuyUP4WbHeiXl1CQGsnuDeso8gi50eWlxO2kOCUtrPQ8Gu%2BVvXpYW7MKrZu0hHXw9fRnnJ%2BrKByt9Q%2B2xnZpMVaMea%2FDn38zK3ySecES2W0PMyrGoo6EGU06cLmQjeYSy6oCFHywIEn9%2FSSw%2FyCK4xjdl3g4nviKWie3MmORJUh2%2FJ7DV%2Fz5VYtIXosOs0%2F5K4lZb9V3pSgHG6HPvkO6ULKc%2F4bbWdkKDLa2HaJIXoemmKgKSgtwLiwra2YiAzT6lfxik%2BYMqt8T64R3Ej2K937HGS9SxP7%2FABBKe88SAx2lF0ml5bBH%2Bmb0SD94nt%2Bw8F62FZrI9vNSf%2F85zf5RNdqmwXS9z0C8TxfbnbGnj15qBMN2Mj84GOqUBMsPxnAbB%2FS4bP5fdTY%2BJur8O87tElnI%2BohJXCjiQaC%2FtKEguEYXWcvKVDGdtRFitP%2BCm4Gge9fZUSDEvPCfQ2vGVXZVs40P%2FYEqSJK1fhgHH7WoCqus0zDX8KpE0NxVv9b5PeKElp9qGuBI%2BmzpuXsBPd9cFFaJXCa9bFHU4it60Jv6lewcOaJ7sCcqn7lekJnSQPzsyRweCvTzTQ5byuLEdWE9w&X-Amz-Signature=52c1c8cd7a1fefec17d7537c087bce23279ad64b2930617381d5cebbff9f8b60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXN6QGWW%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDgZ1KUNCr7vLiaxBeETyfPIJwbpNNV3bZnJqaJvS9ntAIhAKOzTaOFiq6A3AfpL6OZr%2FYT%2Bla3jV4OeP4M16hE31VfKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzpvGinxSGmepWFuQ8q3APGuBiBPZhnOQZeWi0fUFAD8N3XNqttKJ3m5qzRlq6DYq9kgc1oC1b2bNrJ%2BeaRr68YTw9ibywNwYB8ixdKI0FcrswrCDcueBStMpP%2FaLWmG2gj3nI7DfArVfLlghNvxg9Lzma9XaKk52Fbt2AhMbN0HW6oUhu84gcrfuSCPOxz2rV9Em7oHyESJ506RgMz2vHpujFDej8LXsfds5cGiTSzOcmNtZBJRAU1Y%2F6lz4MKjnOnTC7c2xK1Ra3rdTt0u7XG75Yf2WtD%2BYGCJ77j22janvzHH%2B3DLq1%2BtANXojchtKqFgvNzMAhHO6uRbK6OY0GS8sgTgkRGU16eRxsHtyLiEi91KmnLlP4n7SQ15XvNnfxkyWHZgejlc0oncbSgqN5N39wRALgmWVJUVRnnGzdhG2B81nL4HDO3JCeXHqb%2FmXnDV0E1Kd%2FHWL0tg6BydYx9JqmMz6W2NKa1u2abi0TvjursmLSVZ6DTMMj82FTeexgA2Em8I%2BrDIOrGVnyYqgJOklzv4YTjPqe%2Bfp7YRsKJPtQ9vJA4hxrff0PsBRIYGN9SLrr3ybsxu5nGd6y3meN6ewAipiedUtVTSr%2FHUDMDlT7el4f2fEIHhkAltAptuuZGaqTj57pNSxWlGTC4uY7OBjqkAarwWNE7iiIVfw0AAkWUCc%2FQ3GRkDdgOWCaegj7Osa7CntB5bJwojsFLUeNSLdY1pzE6KjU4wqNcTGlk1nU%2FxmrGiTggUnLZPwUfAnoGcGuQfuduovkoCs6mhPzq0IYlCSgvNqQvAAuTHG5s4NFeHXvzL1Dnrft6rqpj%2FsKMgA3oo3rstzlgS6SSS7clg0k3dlg08vTF91vwKy7d2hgdQUwlwaSD&X-Amz-Signature=defbac7d85e7f7891cffc717aa8a5b8ead0a53667ba446e31836cf7984ba5324&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHD2CQVT%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDRvcXRcuh7BSZ%2Bl8uEEjAJ3i5WioEuNpYregliNw9U3AiEA2VvT%2FG%2BEvUerNfRIzP7HNvwBbDBitrrl3WF3CZ6jJeAqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNzdP6ZuY6iUansg5yrcA%2FCdrn0KDT0oYZZkwVkdKMmZ1MskpWGYoj3Fn9sSKrPa2Jpf2Nv7B98L0nIIpfaggY6hrpfY85JJiHE3YSGH0ljOhXraQqxoJOG0z52ki2fOpD2qig0btV4km9%2FDoNoSLvbmsCaJT9XOlEIcd9wYPOeZq05JT2PgNnW%2FKJ9vfL11Lo6YFO0CcOB2tGNa%2BjMeA%2BKjLL1y47tQbuUG%2BpXb0y7TBer9jhlThcZRpgv0BJRkpHCQEybCCVx%2FGhoPBT%2BPUmlMnXLGeU3jhVZSn%2B%2FGPYCpf%2BmgDHtQz3uqkBPQ%2FZ5B7hL2Kh3kvRZHIn%2BmrInfg3y1JD3oXiu2gOfNC6kQMAtFz0YkL%2BP45m2be7H2FJNOq%2Bji2vOa%2B9nxxACUHatrnVHPnRFOCXDXG%2FcX%2Bg6A1qERRN6feh99D6c4FRoSXOP8TQTOOQvjV6oPrAjw5CSvjsnZyYKEi4WLr9lWJoOBdSvMe2rrdVdZgP39jhg%2BvqPzzzpYlL8xoXTdp8YLu65JpjkB%2B7ttGwLMBiRxb3btHpQ%2Fuy9zKf%2FiXahDmYYbkmGQTNT12T2WXWXFYzN8Tw9V5gFq8f1F6wN4CYhf9sr7xp6tZAiCM8T%2BehNdlpammMNUcpVX37i%2FewbfR80MMMaNj84GOqUBW4cD6DsqfVQrFoj%2Bw%2FKcjbsYibgMlRTCYBnX7gUWpP9fnoPP28XtIxhBRvAdr1%2BaXwoKPXDmRqOaBIY61ZFltXwWvbPaAXasvBSBqHqtwR1zhYzqjyf6evYbBgJRpokREJ0Zrl2Fxkkju0HyEN%2Fvj2%2FHJ7Ml%2BWqWZxOnfHcqwV%2FvxbugbD9ocP2Oenk7c9EvkW64Jdy9iX2cOSd8FxllA8AxJF%2B3&X-Amz-Signature=353e24f1d9a4e05256c0d6a2d8567ad3f2f7878ccedbcfdcf3c157e1289c2e6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHD2CQVT%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDRvcXRcuh7BSZ%2Bl8uEEjAJ3i5WioEuNpYregliNw9U3AiEA2VvT%2FG%2BEvUerNfRIzP7HNvwBbDBitrrl3WF3CZ6jJeAqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNzdP6ZuY6iUansg5yrcA%2FCdrn0KDT0oYZZkwVkdKMmZ1MskpWGYoj3Fn9sSKrPa2Jpf2Nv7B98L0nIIpfaggY6hrpfY85JJiHE3YSGH0ljOhXraQqxoJOG0z52ki2fOpD2qig0btV4km9%2FDoNoSLvbmsCaJT9XOlEIcd9wYPOeZq05JT2PgNnW%2FKJ9vfL11Lo6YFO0CcOB2tGNa%2BjMeA%2BKjLL1y47tQbuUG%2BpXb0y7TBer9jhlThcZRpgv0BJRkpHCQEybCCVx%2FGhoPBT%2BPUmlMnXLGeU3jhVZSn%2B%2FGPYCpf%2BmgDHtQz3uqkBPQ%2FZ5B7hL2Kh3kvRZHIn%2BmrInfg3y1JD3oXiu2gOfNC6kQMAtFz0YkL%2BP45m2be7H2FJNOq%2Bji2vOa%2B9nxxACUHatrnVHPnRFOCXDXG%2FcX%2Bg6A1qERRN6feh99D6c4FRoSXOP8TQTOOQvjV6oPrAjw5CSvjsnZyYKEi4WLr9lWJoOBdSvMe2rrdVdZgP39jhg%2BvqPzzzpYlL8xoXTdp8YLu65JpjkB%2B7ttGwLMBiRxb3btHpQ%2Fuy9zKf%2FiXahDmYYbkmGQTNT12T2WXWXFYzN8Tw9V5gFq8f1F6wN4CYhf9sr7xp6tZAiCM8T%2BehNdlpammMNUcpVX37i%2FewbfR80MMMaNj84GOqUBW4cD6DsqfVQrFoj%2Bw%2FKcjbsYibgMlRTCYBnX7gUWpP9fnoPP28XtIxhBRvAdr1%2BaXwoKPXDmRqOaBIY61ZFltXwWvbPaAXasvBSBqHqtwR1zhYzqjyf6evYbBgJRpokREJ0Zrl2Fxkkju0HyEN%2Fvj2%2FHJ7Ml%2BWqWZxOnfHcqwV%2FvxbugbD9ocP2Oenk7c9EvkW64Jdy9iX2cOSd8FxllA8AxJF%2B3&X-Amz-Signature=14c2b195a4e555e9274961c59c700a9d3af435e879cdf2468232743810843076&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLCY6OEI%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD4vjQ8%2Fah4erDV9lvvrG6E9JqO14FXbl556yPrzEXfAgIhAOIy4zbtqWASvCsu2LuOkQ%2BU4%2BkeKpOF1tZEo0qut6l2KogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzB7pVDd%2Fz2S9LtQPkq3AM415Cps4HuqCFcATGfOt983EOVFVGCCuJoLHFP%2FRjluIMS7Fd4Eaxo7%2FP1sW8u3FZqHwQHkBP4OmwAZ0cwYXQdQ4LVKOX2B%2BMhsdiNh8RnOEjXJ6KVcscpWBFIpyH1DsY0lRYP2WpAXjmXNwgKa48fvd00dEJMTg87yT3iDS9a7yjAG79wIBj%2BMRivi33dMHNY9SADYuwUnzVJlvUG%2B6QuJo5eyRvedJQhHCzEuyMV1Wq3UhQ4%2BhaYtmJc%2BcpeOsKTJzf9ObQnVJjYHeAUGNiPtwGcy0cW3uWp6RqnPQCP5hYoBC8Z5%2Focun0eYvJmC2zcTYB6RsNV3YPli9xz%2BQCJqxDZLcwQ1HyWSKLrAgQLatuBEWxKnxOwE%2BGUc8QkN3%2BYxB1harH9O4rGti7opSSymvY7VIzv7Xyryw1FNLgHFaj%2FoFu7EdXj8XSE4cpseOejJyxx0BwXisEjwscm%2BtBXbnKxdOoPZABJQ3Nkue9zkrpXWDF1I%2BCXODOAFHCfjlMCWX6V7CzZY5vDFtYkHu0yTtEZURqRF1W4Jyw8HQnF6Fu4CPzRTWpzbXSyI7gMRynjQjAgstVHFjSZuDNr3%2FF%2Bd1jD96UlWgUl6AzFAGX7PPK9GRtNULwVigxq0jCCjY%2FOBjqkAbHkOPMx5GORcCXgelCRLJox3dSzzVCo7FfGJF2V06OGNFqBc%2Bq3zo6RGZYBmD5H67rkWcgCEu0ar71LAasO8zA5BisK%2BOu3LuvDPjZ9y92LfaTOiM2nOSHgUuh2ehu0rPIVex%2FBNPD8U2qpPRFCkn7Cn4ZVVvkUht%2BCBJqk1q4vbBIDDXScM9JT1w0Q8aFg1Tmox%2BhPjwGnhbtr9qpeyx5ylqV8&X-Amz-Signature=9dd54d147aa4a9dc8a5f71a3b53a5ea24bd62ebea33391889b00c76f5cae8375&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZMWRSFY%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCg0crS%2FYspQ87M1JYJFQISd5K%2B16EqqJpvgjsjlQPUOwIgdELWVF%2BeGudsCIiK5HwgMytbudIZ%2BfMlPcSei%2Bs526sqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPZNhqEDi%2F4jXWNTDircA2q%2BXiLjANd75gy8UMmiHW5NVLM%2B26CT0VpaVvW32FtenPM01M3BhYwL40DwE8D6TIALM6%2Bs4zHeLi54st0PolnKjBeGhvbAtiWpd2J8QtwwJyOsWO2xco1cljZg0nxAzYqYk9gp7IXk7rIC6iBD0wKAu%2Buy9ADSrezYIfMnbsFKmXnwHBwYo3hw5%2BjoLZBnAbfWZOw9rsLKal0LoVPrFGj%2BrrrhYnOwVRRGgwakITD0LABauDfvnaAaJXJXgD7rz6gF%2F6OlbTkPhsFXLPS2iam1rh6GCKFpnIS%2BLm8YHGhGNtkDEGzmmdUFE2DQnxf%2BK7GjfAtg9YpoBfArEdH%2FcUNvwlrAQ%2BmmvkDmmwB3O0FeoSe%2BuLJNoqpzI1saehWMZTcFRCLwfFn809TZ%2BcqgK0D4Ws9RIRvEBXoQL8UcwbP1Lq7mKYpuCzcTTTZmbxOIQQnTQfs0pNc1jjl08JIeBX2RGWDgMGC9XiWvxyrPdMPtIUr1L65kmoo%2Fbnp13upFD6UHM4DuwUsEnColLq2Is3ogX7A4vwIu9fMpFRbL6lRUpKY%2FgQeTroU3RK8Vs%2FVQaIapyp6wrbA6Y0SItKxXtrSuHolfcTS2TmTk0vFiCff4PR%2BwfQGq24myZK9XMPCNj84GOqUBxpCwiFIeL8zCWVR7Cns4hk%2FVnCrP1NS0ryqWBAyeb0b4HYu5n%2B8cL1zzNybTFsukJD9Sy6S%2FkoIStuNNmUSzoTTVcUapizgLP6W7KS4xLQTC3Vxgu8aJ8WZ7wxbeP5Vk%2Br65IdRy6P61I0BICvVWWtcQ5g5UKdCX%2FxWZ3c6U3atg8ZBgbAizeUGuI2qSiZ2bkicRQJKZuXfr2h%2BL27hLxIxn2p3Y&X-Amz-Signature=aee56af547a9aec9b30b3cf5442599434674a7805194ae829e1592a03dc5566e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZMWRSFY%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCg0crS%2FYspQ87M1JYJFQISd5K%2B16EqqJpvgjsjlQPUOwIgdELWVF%2BeGudsCIiK5HwgMytbudIZ%2BfMlPcSei%2Bs526sqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPZNhqEDi%2F4jXWNTDircA2q%2BXiLjANd75gy8UMmiHW5NVLM%2B26CT0VpaVvW32FtenPM01M3BhYwL40DwE8D6TIALM6%2Bs4zHeLi54st0PolnKjBeGhvbAtiWpd2J8QtwwJyOsWO2xco1cljZg0nxAzYqYk9gp7IXk7rIC6iBD0wKAu%2Buy9ADSrezYIfMnbsFKmXnwHBwYo3hw5%2BjoLZBnAbfWZOw9rsLKal0LoVPrFGj%2BrrrhYnOwVRRGgwakITD0LABauDfvnaAaJXJXgD7rz6gF%2F6OlbTkPhsFXLPS2iam1rh6GCKFpnIS%2BLm8YHGhGNtkDEGzmmdUFE2DQnxf%2BK7GjfAtg9YpoBfArEdH%2FcUNvwlrAQ%2BmmvkDmmwB3O0FeoSe%2BuLJNoqpzI1saehWMZTcFRCLwfFn809TZ%2BcqgK0D4Ws9RIRvEBXoQL8UcwbP1Lq7mKYpuCzcTTTZmbxOIQQnTQfs0pNc1jjl08JIeBX2RGWDgMGC9XiWvxyrPdMPtIUr1L65kmoo%2Fbnp13upFD6UHM4DuwUsEnColLq2Is3ogX7A4vwIu9fMpFRbL6lRUpKY%2FgQeTroU3RK8Vs%2FVQaIapyp6wrbA6Y0SItKxXtrSuHolfcTS2TmTk0vFiCff4PR%2BwfQGq24myZK9XMPCNj84GOqUBxpCwiFIeL8zCWVR7Cns4hk%2FVnCrP1NS0ryqWBAyeb0b4HYu5n%2B8cL1zzNybTFsukJD9Sy6S%2FkoIStuNNmUSzoTTVcUapizgLP6W7KS4xLQTC3Vxgu8aJ8WZ7wxbeP5Vk%2Br65IdRy6P61I0BICvVWWtcQ5g5UKdCX%2FxWZ3c6U3atg8ZBgbAizeUGuI2qSiZ2bkicRQJKZuXfr2h%2BL27hLxIxn2p3Y&X-Amz-Signature=aee56af547a9aec9b30b3cf5442599434674a7805194ae829e1592a03dc5566e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655Q33VNG%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T113146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAPh5sGu571PcogO8PEdj2azPpsevfAkjSEB91EmF1NIAiEAsaxF5A1WB%2Bd6GERvUkoDKMVX6%2B3sKnBvMKBnsFK78DYqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNQOugII1SFCe0qAISrcA%2FX0p3JUmDW2Uv14K%2BTmbERoasskdnjgtljlAHw44vb4J2LhgWQgNzedgGrgeGfZ0%2FC90vuk6Iz7icdDvTSXK0wAut7KJxe2HBBZ3kf4Hg5SpkXIal64GY5r6SVCjcKUzo1719lBhG0v%2BZUhx7be%2FRmW3lwhcx%2BLjxB6WUTVLeBRDegF8ivctalYXiKVQbCcGsFaPi7nxK0k2mKkxuwvutm15zZGayUo3LXok1kz8TYhxDrQ3zIrS18INdoIjD92bk1RX6leFemP0re9Ssa%2FUW7spIB85DnViqFdg3OGjsxkumJm3IyIiNGE2YTnmK8utudkOAq5YOWaDkKylgENiDgjIOJbHEg1wEiUjAaO97c6c4ptQ2FQp6SN4V3%2FTyhD1E7ZKBieFHQtvc%2FF5zXcZnz2Q9eQSx9GEIsM1nG7GFApaQTIL3CojxQJ%2FKkD6gHSzw83%2BRhpEt3T%2BBh4oXW7IO8AnD7Xmeo3Zlsm8R3pk1swWwF5oevC9VrzIa86EOmZRWgmpP89AXpHNJtSPt9P0SG9I9YOs24bbPZ0YT8LyjFp2cThYzBPha2S0apMe4KZgzd6mFwgoJDSEGLhQEVNWF5FvN6iQfl7EFMiEq8K68DJivq42zQ1DdlOliu4MOi5js4GOqUBujzKuBkr7ZM2oCBIWHFYnoMfF4uGq73yjfrNmGhGtALbvrpfBO01ptDICzaCQaAJLrauvw6ipcyLMky9f%2BJi2xNqSGMyYq7%2B9p74DxLP%2BS4cdGnJEgiQ8cvY%2Fz2De6ssJxaT8CZthIZtCWHzMK3%2FW91ZjfSPHCfcoHghcbn2kgJ2iTr3dk8Eb45nBHJ0HJwdhGpWYYXyri86mGFlQ%2BcdOg6Wiq6P&X-Amz-Signature=d3f99019c3847f10003251770759b5a5a3b9ecbc8900437becb5d1fc3938a579&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

