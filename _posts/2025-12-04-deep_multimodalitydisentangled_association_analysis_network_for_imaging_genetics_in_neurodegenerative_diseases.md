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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USK6ZLFK%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDc%2F63kJnI5wW4cuzLKueOS8RwBbSjJHzB9G4zhVUw2NwIhAI1Iz7MLBdt8H1jTAnmnBO4nulXUuIoxxTHyyoshY%2BOvKv8DCBAQABoMNjM3NDIzMTgzODA1IgxjMYzFbOeFudGLJ1Eq3AO3eJBoOth6nFcNpYhb2h5Rr7Pken1xqTlkCIcRmDhgQavTTgxi5LtpJH91AWVjsFwm7LLQKVJKMD6GWuQNatU0xzTaNFuJFYDfe%2Fb5l6sn5RdKZPparzOEIfQW38m0AwOaKm%2Fxofm0GI4Lhbz%2BVJ7FnxF6IgGy7LuZ3bqTDSfASbQhcJuppp8vkOY%2BZFgHERRQPBGgwk7HfwBgN0w0VyD8nz3VO1phsfGoGVZUNe3MlORHQbqaZu4DBGEx4En0xE%2BBKkK7%2BUEj%2BI5waUJlCUBWou%2FSrGrX2rRD6kU1XYRRP1QzKWNE7f2xDTAnGQ8wY9p7x71QkrnwwbiHf%2BpkEDnZQIQtGcO76WwzuOHia9X8G9Yo2dNdSJ7cd8PMvjGIzyECYGqBD2slq8kl6%2BohGJGB6aO96UqZAzKwJ5Gi1cRvYyjrpB%2FJUKDWc1LiBEKuHeyBij9NEK0lPDc%2BC06yH2SLm5bscX0P4blovV0O4%2BxHvYVR5PNqoTHBO5Ayy7jq6eCRmbdM%2BtPJDjcGUNOMo0rZYa6Lmv2ZjzrlDgO7YFdKiGqIArO7n8suVGLrH2tj0K3Qtj%2FJsjsjL4efsF7gcHSkUmCI1FWeQfzc72f3kB7oEdDqxe6PWsdt%2FYzXkjCdtbTNBjqkARfuaUXh%2Fdtt2W5xLiZ0K9y0olluAaOyySvtiH9bup%2Fml9erJXKCmPNTl4iCpCFkC4w7rFD0SSWB0uBe78L0Z2%2BRqnP%2BRD%2BWb1go%2BtbuDlowRSoE%2BZkmR662OPOR7m%2FzwkLnV9Adql%2B1tKSvX5voAATvRt1W2TGEzhR7A8%2Bf5%2Be4lYb2eYk9EyFsubGAv9b5CtOMXEIY%2BCAY2Ty3gKMuhDiL2qeV&X-Amz-Signature=5a56a75251ebf9bc551b3745d818981321348506721c943d6acb52a8a30c39e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USK6ZLFK%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDc%2F63kJnI5wW4cuzLKueOS8RwBbSjJHzB9G4zhVUw2NwIhAI1Iz7MLBdt8H1jTAnmnBO4nulXUuIoxxTHyyoshY%2BOvKv8DCBAQABoMNjM3NDIzMTgzODA1IgxjMYzFbOeFudGLJ1Eq3AO3eJBoOth6nFcNpYhb2h5Rr7Pken1xqTlkCIcRmDhgQavTTgxi5LtpJH91AWVjsFwm7LLQKVJKMD6GWuQNatU0xzTaNFuJFYDfe%2Fb5l6sn5RdKZPparzOEIfQW38m0AwOaKm%2Fxofm0GI4Lhbz%2BVJ7FnxF6IgGy7LuZ3bqTDSfASbQhcJuppp8vkOY%2BZFgHERRQPBGgwk7HfwBgN0w0VyD8nz3VO1phsfGoGVZUNe3MlORHQbqaZu4DBGEx4En0xE%2BBKkK7%2BUEj%2BI5waUJlCUBWou%2FSrGrX2rRD6kU1XYRRP1QzKWNE7f2xDTAnGQ8wY9p7x71QkrnwwbiHf%2BpkEDnZQIQtGcO76WwzuOHia9X8G9Yo2dNdSJ7cd8PMvjGIzyECYGqBD2slq8kl6%2BohGJGB6aO96UqZAzKwJ5Gi1cRvYyjrpB%2FJUKDWc1LiBEKuHeyBij9NEK0lPDc%2BC06yH2SLm5bscX0P4blovV0O4%2BxHvYVR5PNqoTHBO5Ayy7jq6eCRmbdM%2BtPJDjcGUNOMo0rZYa6Lmv2ZjzrlDgO7YFdKiGqIArO7n8suVGLrH2tj0K3Qtj%2FJsjsjL4efsF7gcHSkUmCI1FWeQfzc72f3kB7oEdDqxe6PWsdt%2FYzXkjCdtbTNBjqkARfuaUXh%2Fdtt2W5xLiZ0K9y0olluAaOyySvtiH9bup%2Fml9erJXKCmPNTl4iCpCFkC4w7rFD0SSWB0uBe78L0Z2%2BRqnP%2BRD%2BWb1go%2BtbuDlowRSoE%2BZkmR662OPOR7m%2FzwkLnV9Adql%2B1tKSvX5voAATvRt1W2TGEzhR7A8%2Bf5%2Be4lYb2eYk9EyFsubGAv9b5CtOMXEIY%2BCAY2Ty3gKMuhDiL2qeV&X-Amz-Signature=5a56a75251ebf9bc551b3745d818981321348506721c943d6acb52a8a30c39e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS63W42A%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDgbAmeR%2BAptii6bdp3h7wltDSQFUA0a8YqkQxWY7GLogIhAIkrrDCDmy80rORV91w4%2B0x7CQNJzje%2F%2Fww2aYTpY7sfKv8DCBAQABoMNjM3NDIzMTgzODA1IgzjC%2FFVCCPMx%2B9wuKUq3AM5VYZ80gAtK8u3OBPGfrzTEvPgc0Zx7nbI7NqW5JzcJvnIspPsIsOwIYOXbqGuTa3pOHb%2BgkNjMILgYaDBDNBwvfQXXEKerhSTuiH6vUYo8mwNrvMV68HGzpnQn%2BxO3CBBiFD7yOYG9odlw1CqpF80t2nfPXqigMZ6WtPKedzrc1wwA5KlkPrT7vMLc4rIQOnlO71XFchXaKIlFXh0a%2Btf%2Bz3T9BhED8ohakxHBm9mOjIWfFYthqUv2hhf3S%2BV5yx2ZSbaEQeqJjiPDOe%2F9YS5YR1%2BzePKn0PDusIXDkLMf6y8l%2Bg0x9wndIWMqlDs%2BjrLjUQsV9ZLVcpZ5jXTC8YN14PA8jCe9hintOP2xJi01uCTVqLCxRV%2Fd3B0or9O%2FEaBg150pI0PyH0oYD1%2F6PCa%2F36YtM4ipBNNftV1iLpVqNAlF7kOVuJ%2BuPjwFwe8rq2uc40wPy6poed8cSGQc9dqhdKHBvHj%2BrcS3sUmc8q0zBdEA9nTyyYGiX7h6vHVv3jl5aE8BqizY3IMIh86JIBT8Wr1Yc2bDIQqnRhMSPEDnQTaX6iFHSg30Szi9JlADJmomAUOd1VfslhUBF%2FFUSp57nyOZA7tTZtmyi7ZwluGCqVVO7MvLG4ZIpS14zDCtLTNBjqkAVc7%2BXLTbRQQlB%2BOeYHHyGWdhRvsxfElTNVSRAFM6LBHqaF0qeNrMMqkettGrI0FajTfWuLV69gyYKx8B1ggy%2BiKHPxC8XOBB3CmHlAs7QqEmMDXouolxzJJU0qryXIB%2FTrIyXQMBVIRHQ0xidE5KfFny3yETXPF91JQY0HN46Ki%2FSan%2BXvJWVDMNe37PUk4q1OiwKou0xDAP2iTNd%2Bx4tZ8elHM&X-Amz-Signature=a047eda844fdc3846da10dc2c0b672874431e226c3230db36bd83d4ac9e299e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQRG6V3F%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIHpGWXwyAw0IsMZkAuUXfsisYLaRoMZ%2BLPaVA122otWnAiEAqbaHPoqgqYzZ9rRlu8vGxAE1giGogyqehbP1mj06SvEq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDE9uVomOGDmtSZyn0ircA6yQp3QHwoU3t%2BI1K7d22xSienjTjCwcKzGTbZ%2BbD5gvcWtszy5%2FNAVetso7QgVADHH%2FiXUvnzQZX%2BZ49GPxgzZLGnUbq50UFsAxA6UGlOTkt47n2Ph5t3P%2BUnLxP9aVp%2F%2FztgKAmHolyJoaDx2RjYOZQV%2FaMJoNqCcx%2Bw3oEdJREiCNz3dG%2Fq1ZLCsDj0PwHWl2niMKLq20wDdV3ojyALG20h%2B45v3aP01S3sbwgW8UUXalzhOJivT4Vybaj2C6GCf6XI%2FjHPPDHye0RCHj2k6B8F2MTDLu17998gPSOAU5fDsxwUyiE5fG7vGRF6f5NboauAHP997nytDMLCb4Gn%2BC5OpiEcggMpVfiFH18sltKgDvQfCxaBv0tOA7UBhacDwM%2F%2BbQu%2BD0A57s6awcmwkxocXVpzds2UYBJooBBidbIfcOhEhD2au7nm%2BIhZmFO6oCu%2BfdmFD0vNxlXXd11sKZIUXFjjrnQyq8aSpg2KxERzHZsbQaFDPKhTP%2FfTXiDJAz8oXySBsxxZiijCtNpV0ghIBSJsKVIpQ1QDDf%2FzAUXXdlITJWRfMXCYbKJvVdCFcl00n1u32ioXmTJi5z%2FXaZ1jKk%2BTm6Qs5oDB7Sx2Sh128OzxHNY6jlUutcMK61tM0GOqUB7MRuno%2BDLIdXyeSIK156AKpLwPsCCxnVUItQOX5vX0jhhiD2Aw26COXTxxqUYmalLWcn93hJzWyIyAgF8TD5EK9EyNCQJbl23rFTJl%2Fcf1Uwg2W3ptr%2F1GnTTpwrCEvSaDuRsrmG5fy34Gh2L30FaWh4r7jem8HTqyXwbovYkfsnML9HqDezkIvW9qhbgGV6ITSlUJbB4Itc8p2r6ISnO1LhLx1T&X-Amz-Signature=def500ea86b6594810790955ef1cb0f2427c0cead04a9e95f22269a688675991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQRG6V3F%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIHpGWXwyAw0IsMZkAuUXfsisYLaRoMZ%2BLPaVA122otWnAiEAqbaHPoqgqYzZ9rRlu8vGxAE1giGogyqehbP1mj06SvEq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDE9uVomOGDmtSZyn0ircA6yQp3QHwoU3t%2BI1K7d22xSienjTjCwcKzGTbZ%2BbD5gvcWtszy5%2FNAVetso7QgVADHH%2FiXUvnzQZX%2BZ49GPxgzZLGnUbq50UFsAxA6UGlOTkt47n2Ph5t3P%2BUnLxP9aVp%2F%2FztgKAmHolyJoaDx2RjYOZQV%2FaMJoNqCcx%2Bw3oEdJREiCNz3dG%2Fq1ZLCsDj0PwHWl2niMKLq20wDdV3ojyALG20h%2B45v3aP01S3sbwgW8UUXalzhOJivT4Vybaj2C6GCf6XI%2FjHPPDHye0RCHj2k6B8F2MTDLu17998gPSOAU5fDsxwUyiE5fG7vGRF6f5NboauAHP997nytDMLCb4Gn%2BC5OpiEcggMpVfiFH18sltKgDvQfCxaBv0tOA7UBhacDwM%2F%2BbQu%2BD0A57s6awcmwkxocXVpzds2UYBJooBBidbIfcOhEhD2au7nm%2BIhZmFO6oCu%2BfdmFD0vNxlXXd11sKZIUXFjjrnQyq8aSpg2KxERzHZsbQaFDPKhTP%2FfTXiDJAz8oXySBsxxZiijCtNpV0ghIBSJsKVIpQ1QDDf%2FzAUXXdlITJWRfMXCYbKJvVdCFcl00n1u32ioXmTJi5z%2FXaZ1jKk%2BTm6Qs5oDB7Sx2Sh128OzxHNY6jlUutcMK61tM0GOqUB7MRuno%2BDLIdXyeSIK156AKpLwPsCCxnVUItQOX5vX0jhhiD2Aw26COXTxxqUYmalLWcn93hJzWyIyAgF8TD5EK9EyNCQJbl23rFTJl%2Fcf1Uwg2W3ptr%2F1GnTTpwrCEvSaDuRsrmG5fy34Gh2L30FaWh4r7jem8HTqyXwbovYkfsnML9HqDezkIvW9qhbgGV6ITSlUJbB4Itc8p2r6ISnO1LhLx1T&X-Amz-Signature=2d6a94eb23d0fac2e0906c8026f3c90d73afffdf95a5f5ef165dc51e011705d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMOX4H6A%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDngM7YIqxd0Ht0AP3DorxpWHIY3A059WwTfL5Rgwk7UAIhAO%2B4yo7x9mMXHW1V%2F9LorOAhJUAqkp1I6tHl7OO9KkPfKv8DCBAQABoMNjM3NDIzMTgzODA1IgzmBmQrt5ndYFMobnAq3APKlNa07wTJHba3MzvNzWJFS%2FlmyOnQ4JiSsxx%2BdlrWrSgvKBamN%2B2gIdhKEPIPupkiAedNTMr6bgzK%2BWDYYz9yJJ5zPF9Tu%2FVVs4p6ytPi8JuPK2VwHztMAZLnDFGYNXbTdCrXwyU4y%2BN9gmgRadifP2%2FB3Mhr83nIAy%2FppmS5kjdi2kh332w7BnJ%2Fyoxz6jUvpYCBnasWVA6znoW5ZxD6mL8WxslYXDQT16jaVXO5lFaXxD%2B0oActfp6vdIYHY9HP30%2F6%2B6vsNTq2eI9suxSox3Vh1RlzfbQs%2BxW3C%2F%2BMf%2FH0vpowzJ%2FPOVGfSmdBy601e9zHtBzwH8Yb9ABt7ijB1xrRjH1hf5Ao9lJaC3fA5oPs6Laf7%2BOL32id82G2vhZlhpiHB9IdPteDwHZkTCAzJfQjfZ2K7dcHw%2B9XV1zEYBM2VC3GUyNosNtzlwYmWUDlACRI%2BAral9XnwH3UO1RoZjGuM8NnPxDAQYcd3fM8navTwdafT9gWv1GouHjwycPB93JDtpt0iSUMgg4Mx60zednh7jP9FaY3NHSeWUYV74qmpz%2BjX%2FxMPWOKwu9k9p0MOOnjKWzDYS0f7sQD0KJJ%2BR9DH0G2jzSd967n38Ne36QB%2B1VNecveiZD1azCwtbTNBjqkAclph9MEqPfHORT%2BMM%2F92Svw1kheTUtsEZC18FgGg1kRAsEW5YtWpcW%2B0nrU6uXOvHo35SbFCcUUatAgslhR6YrDTK6BDg7PaBetYaqx2Mj6%2BEhBk7CedxUtmJewxLQBYkNJirsWFACjncRPfUNNEUbYrwiO8fdIWa2v3Z5yXQZoShrh6qTZ7jbhPkS%2BIZpZMKEuXGWL00I7i6Cs8ZQpZgjrZuoA&X-Amz-Signature=f79675361d196f136f5cf5100faec9fe8b017a96060b0bc9fcc896e7529e9ea6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6VE66X7%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDWeTt4x1iThnoGWFqOiMt%2FnXul%2Fw%2F5cqtRaa4C9oVEQQIhALh6zFvm%2FqWzOIVs4FcdIzbcWJvW4Yro9ew15jib9HkbKv8DCBAQABoMNjM3NDIzMTgzODA1IgxIAGH1VVdsuHwg%2FbYq3AMi7UY1GDuEyCO4EClY3o1WUqynQINWSZld9Wd0CnwoLefxgH7qsNu4wNnT02OKFWF4OZEvvUFaaPhMG1vXeCViL0N31M5nnHwSnjUffu%2Bt%2BlaJ%2F3EOMiikif7HhrVIown2a7QfcJxyQUDcOQ8XgSwZS0a9KrMtl%2F0YLgkzw635wXvZQPb83OAEg0TXiZYBwmjP1ywMnW4OoEkpbvXaf7t6Oqy9ppl6a9VQB4H%2F9K9A2UY4mTudx%2BGg9z1MMJaNp%2BGH%2B1H8LiG90bp0plLZvyuT0BNfPx2ObkYV4ae9Iea1Q%2Fiwqx4f7dH4HdDlr4V%2BLgh%2Bx4jr3zvmeyukRWQs0rJLuB%2FjQAtIQTA0xdnZBIc9V9YMhBTrhz5IlNzc3wj76dd8v4lbagN0Z5kdzkRijmkt1LbEe4BR7racWKs%2FGUxEjbfWdOQhtDZ5EVBIEZtyzgUcuSrBnxofr%2BVlm9UFycuNR%2FqSv1jh3PYTdiuFHDbCSklOYsuyq7YXXCYrvGNV1SAi8HUsGTKr9aFdKGMWUkD2wfGFCBIyIKNk5BYG3RAM0j32E%2BSL0EdXlhoXBPyKgXWzLF%2BKD0njlf7GQB4f7sWJBD2T8lZMQnKlh%2BcyNRva6CD54tckZ8nEK9fsbzDutLTNBjqkAfGHJM%2B0jppB5vTeHY08MF4x5ryYbOnsncWrxFGZVxblSbrrvMYgstEjgXn4M9lBqufhTKwCa6MT6iiZtFjun%2BGIw516bpODt9MdiOiU4TVZZT0Q4iTBfwiHBGjwDe0OLaTQAm1qSSiwLuNIBe802bitbTm255q0Ei0eXWfZ8NhorqCXkZpJJx8UToIAud%2FbnIxqirN%2BGgOF2zXiAJH3n36zwEaF&X-Amz-Signature=277bfe1a9fa0eb06854afb3b7362188b1de8b8f44c35bbf40c69af8a1ee870b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLSGEF4H%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQD22EDJdpvVXE5cmpx4lOHxrFIUoPPJGds1%2Bhc%2FWO62EQIhAN7JHX9fIyWvne3NvjxIeMj5B1I7u6LmaZF2KoH2sIO6Kv8DCBAQABoMNjM3NDIzMTgzODA1IgyUEQgnsO9ZM3saougq3AND8GUR6Yw8rvMcdPacZ5v%2B6nR%2Fs385ipdCSnoyu7gVOChKXBDXAVX7q9Etq%2B2fNZYsDMT9ZQd%2FH04FYvxLnu81VwWSxw2uvnM7QLDMS2vYcYBohlZFN%2BL0m9Dgm1kT7tNnx9ItvrcJJijJmnyMSSygnxmPBEAXlrqTJ7d%2FQlpKBAFCUS6YgudqBTJMu3%2BZsmnbS9VpV3TcpkYEah1gR5JEKtW3kRG7eHAV2FlgM1F69dBBQf4M2zd73N1SNgKD9uGVxmysqqFRQXTr2qg2aaEeGejeWDkGiY6paRLnSsSacWmerDMvuqIgnrafP%2FtitAfcqwAWh6wOOLHHkvJvBsbKhdALmVS6R7nbbT07CeVtBO6t15CbkmJW2QyT%2BGBO98%2FlpK6GlAecxuBnUxC7gXGXQekvQ%2F0xUpcUufQc7LMvABq%2BZEHXSeuyUkBe6tZNX6vovl9eh74McESrzb0E%2Fc3l1MldInWobC6B%2FP4860tly9V7t4cOJQ9RQ87hN%2FcUUhItRA63KfwjmnoCwMKKg4RCSrq9B7Ty4%2BamwfU7n4DmPqpvY%2BL7ht1fJ%2BGCSjW%2FoAJBq%2BPQit9k3YJsBqx8LDdK8HZOga%2Bm0NTitTZMkbFuX6mQJST1lw1YZd0vezCwtLTNBjqkATDVFvwGQHeZAr557McaOk%2BFnriM3df1n%2FNKPz%2FR3fO6lP%2BoQDlQiStwkpPZB1JzEIyEjJnc9cQCRQVvD3Yhg79xTsea%2FVDtiTAiyQFUGIkgBvWATabcLGfAU04MM2UZ%2FtPV8RWdt5jmrsNDR29RC2uAvs2AbMireCiR4JY5Ap%2BlA4ENWBXaWstxEFp%2FcGY%2F5zH3KrLr7dkGBrC5ockHHEP4s8SM&X-Amz-Signature=81aadda05f43c57c436f2adce4b39a0157c0f0be3a680202f4516d05ba1371b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRDDG57Q%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIBln0V3xhEOKf6HI6lRw%2F5c5yGgnhmV2HHZxNBviXt3jAiBBl9GYpv5SmBvpDCQ8JwHBeT5A10CE3gDXmZLhzEsM2yr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMdeFlKsoZwSprD7MMKtwDfyat%2Ftaa%2FQ1Sg%2F5Y7kAY1a0xoFIeUS6Sg1IdWDFyxM7IxKRzHbW%2BCjVz1zxeH3AIHDAcmDPU6PG4UJ9m4XW0nz4V%2FtNfO%2Bocy1E5U8BfirD7tU3DNtPlWJNGeZrFD3uX4cUmVhB%2Btv18KELzcx6d%2BvI3YX0oy0G7rCwfygGLh5pdEV1paWyvcH7ZswY1qOoCHJorTY4IjCE3PlOsEaWZw5kjtvGMXTmLmvkB9pZHzVRX2ZfdsYoFGYVQyk90WWbEy3L7cV55embgzOv0XD1Sodo2Op8gUt8o96ti1aqQLFulloUj3943xfEQ8HDBP7Z1vvCZkLSGZaIW9SkIHizr9xxNh19%2BinM3eqk0kubRorGls0fW7FEqHDLgJn2UJNExKb3sC3nYZvmiUt0%2F%2FL0XZwJSjwWKSzjFXVPYT186z5czHdUJOtVkC2PbZMdBrcXjzpu6V5T1ij0YQOD42fJs%2BQFfYWz32RfidXg9ZWfMTLxuMgggBeAKoY6Q2MQKoNCMG1E8Yilz8zK7VuXKy8sRuU26RMizm2D%2F8yKzm2Q0nyb3nIxaa9WxAmvmtbE66Keeu78xQoHU3rd%2F2%2BH%2F1LYGTQzyaablk4PN6tfEJ1VkRDV2eFnlIsi2mA6cZe4w4bS0zQY6pgHVeRDxTac%2F00GMZyv%2FWgTYc2sQzZmo68D2SFAtYQqMqBd6DWxUlZIXpvXPuPEfCmRv004fOeCQWkgu3WdaxJ7zi3O0rVaVg8xiQ%2BWDCDxnVwlkV%2BoGbUowSA%2BYjuX3tVni6AmEK5seusp30ogKqKwoDYOCN2OSMajkRxnFnBAq4j95TNnn66Iu3Vo9HkNA5BBtPzoD5dpm0PBvhU0hKV841upn45s8&X-Amz-Signature=3a13c98e1ef170d62e1b0850f5593267ec377fb4d827e888ad17e433dbda78c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRDDG57Q%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIBln0V3xhEOKf6HI6lRw%2F5c5yGgnhmV2HHZxNBviXt3jAiBBl9GYpv5SmBvpDCQ8JwHBeT5A10CE3gDXmZLhzEsM2yr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMdeFlKsoZwSprD7MMKtwDfyat%2Ftaa%2FQ1Sg%2F5Y7kAY1a0xoFIeUS6Sg1IdWDFyxM7IxKRzHbW%2BCjVz1zxeH3AIHDAcmDPU6PG4UJ9m4XW0nz4V%2FtNfO%2Bocy1E5U8BfirD7tU3DNtPlWJNGeZrFD3uX4cUmVhB%2Btv18KELzcx6d%2BvI3YX0oy0G7rCwfygGLh5pdEV1paWyvcH7ZswY1qOoCHJorTY4IjCE3PlOsEaWZw5kjtvGMXTmLmvkB9pZHzVRX2ZfdsYoFGYVQyk90WWbEy3L7cV55embgzOv0XD1Sodo2Op8gUt8o96ti1aqQLFulloUj3943xfEQ8HDBP7Z1vvCZkLSGZaIW9SkIHizr9xxNh19%2BinM3eqk0kubRorGls0fW7FEqHDLgJn2UJNExKb3sC3nYZvmiUt0%2F%2FL0XZwJSjwWKSzjFXVPYT186z5czHdUJOtVkC2PbZMdBrcXjzpu6V5T1ij0YQOD42fJs%2BQFfYWz32RfidXg9ZWfMTLxuMgggBeAKoY6Q2MQKoNCMG1E8Yilz8zK7VuXKy8sRuU26RMizm2D%2F8yKzm2Q0nyb3nIxaa9WxAmvmtbE66Keeu78xQoHU3rd%2F2%2BH%2F1LYGTQzyaablk4PN6tfEJ1VkRDV2eFnlIsi2mA6cZe4w4bS0zQY6pgHVeRDxTac%2F00GMZyv%2FWgTYc2sQzZmo68D2SFAtYQqMqBd6DWxUlZIXpvXPuPEfCmRv004fOeCQWkgu3WdaxJ7zi3O0rVaVg8xiQ%2BWDCDxnVwlkV%2BoGbUowSA%2BYjuX3tVni6AmEK5seusp30ogKqKwoDYOCN2OSMajkRxnFnBAq4j95TNnn66Iu3Vo9HkNA5BBtPzoD5dpm0PBvhU0hKV841upn45s8&X-Amz-Signature=b42512337ab2a23491af7b5120cdeab3711637fc16b651706e4ce4684d2a01f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGBUAKRR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIB%2F%2FcIj8Bl0yJxddlTcqvood3QK%2FTj2xDmrq8MMWabtMAiBuqlNjgEupbgVA7RSBg%2FQZcHbchJzgWpDWO2Kuq8DAhyr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMXDtUTUZCp5SYfak5KtwD9iQcLPED6uiTdtZrBdzcoV5olhNZYDyKll7mnHBWslEbiuqydC5Z4HlRi0fsP06tZGTlDbHlPWiwkz9nyvX%2FMa1NEbnY0x5OCDuYTj2uP72B1ZdbJRHwxknfD5arF8FuCK9R1j%2FkjBvR1a8095RrjM6J9KCM%2BSd%2Fx8jL%2BXLN4B1k%2FLCJvvvHQK1HmoCeLMT%2BEXlcMwsu74s46zJm9cKAVql7WEzpzkxoyJriYgAYZ7Tykk8PMvxTIv%2F0OdvXVHe8tZfcbaswXNRqPEVXcuzyVWKBEqRiNsTFTc0tGZ%2Fm0QxBs%2F%2Bc8lFTa%2BT1pt9mE0tWIvz2YFBQjgRrLGTHLe7zLf%2Bcygh0H9HbvKDVyH7f4zayzouUNcvHyboZP4jrlGuC8fc0q7XXnl8xvcg9lNHHbw1%2BhGFs0sjpiiCNfZ9UXcM42%2B0PHa%2FGVFhk7%2BBduB3kvtkeXxiyrk1YWKM%2FSF%2F5zgOU6%2FChPdGi2q2rGHW9Uj9aG%2FNatFriTYS7hj8HhkMcgKho1lPHkxglEkE5HP6jLUW%2Bc%2FKu%2F28wR2%2BRgK0%2Bfb31lk4iSTnwWswvWGb2DU4jFo7uO7qA39MzaNnXyS1L2QK7AzYBht8U659COPb9k%2Fp%2BeNKiHUkrKuJEgbAw5rS0zQY6pgH4HD252zmy62CvWyflJuOjMAt3FQGt4n3xI9jj%2FTOfWMdvFWkuovG7MCvhU4G0w%2F7J0l6X3Lh%2Ba78fa8Rp7RbjXihGdsx4S%2FeqzZjmW%2B%2F1FIT2pTmTQtKoZciVnihGqF8qLPbU0EfuCPy7MugAODtBlmZ9up24O%2FGqK3wcwdoY0lIGHWA2D5AOz0UH8QbZ8%2FJMKIU0FNmqLLESCqr0rC4AfJZGmGJH&X-Amz-Signature=31d156689e5da2d3cf4d84f29dfd044b77a3592e2a91e83e598e146f2b0c2431&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F73INAB%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIAffSFBpjz6KdtcJQZOjLSNQUeNUMuRiTskPc%2FHLU2zkAiBPcNelHF0cggLvAXE74trGt4oHdeDOCvmEhnVAVz3Ijir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMTeP52dTAL6x9mBuzKtwDiVoB4vh%2BDH9kI0nc%2BfDcvFHTT9IBnwFZEtExXN%2FJ6JB86hvLxTYhE11cxDLEEPM3PQQHl5OtuC%2F705nQ%2FBBLrBP7jthSPf7LMH%2BZMKNE3rX1V6AePPbKaC%2F0P1vWDJggXBszOQ4Z7uZdpHlmofWFy3lE8cjXYGpgPtXvOLgLYGER6pswu3OUnYmHY7zIzEFcsxE%2F20xe%2FGwfScD8mvKNKPwI0sMUIt0GwlFtwYhY%2BkJjo0jeHyhYNNpUJIfhXQhBwAsevQDGpJNjOnOcFmEzi%2FGFjJjvZbO2QwBYikXkS8v6Llbo5bk9m8nLLeXa%2FMJvNe4B%2BCcOCeaStVdz5BzmAt8SOTtNOJN6odzKuijMY4WcXJVmaMyp%2Bp3opQo0sO1lRsreQAK%2BtfbY7w%2BjOBly0VxQ2Uyr49vbf%2BiP50%2F4kDQWxRJlqhzz0XjsnpbVbYLElsad9GdqQI0Nd7ZKw8dxP0aOM6%2F%2BWVnZU9EUdBO7MRsE%2FeYB662nYz47cU%2Fu8ChJhDNAG3%2B5Y9t9aW%2FtCDnDg7Nb2zBYsAtRjm%2FMLXWm1%2BK3AwkpM7ppXwiXi9GdieCjIzz%2FVtt5j2yvgY9fKbtiHhh1w1y8KKzjKGPYW0UcOlyiyRTK52SyaUHiAA4wsbW0zQY6pgHOBZQDXfgnF8j0cQJisKj2QFaq1DOuY7fj7%2Fa3vAFxZP9QqqmEBD7YCLi0TQAcO%2Bvd6MswPVfHFyvuHswWBCjRylyWFGYTUKkwLdRZYaEuyW9TVP9EDsh5sVHXUAiKCqlsEjymP92UQDGaFsiqkiqYQGB1o%2B2q0am6YTPQ%2BJGQlcSKsDFkPS4GWPO2EcEVMlnZ4YASPflgiVb%2FRTn55rSN790uYZIv&X-Amz-Signature=48bbe6dae41606b832df05f57012822656b12be805ce1d7b52efbeb0feef4375&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F73INAB%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIAffSFBpjz6KdtcJQZOjLSNQUeNUMuRiTskPc%2FHLU2zkAiBPcNelHF0cggLvAXE74trGt4oHdeDOCvmEhnVAVz3Ijir%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMTeP52dTAL6x9mBuzKtwDiVoB4vh%2BDH9kI0nc%2BfDcvFHTT9IBnwFZEtExXN%2FJ6JB86hvLxTYhE11cxDLEEPM3PQQHl5OtuC%2F705nQ%2FBBLrBP7jthSPf7LMH%2BZMKNE3rX1V6AePPbKaC%2F0P1vWDJggXBszOQ4Z7uZdpHlmofWFy3lE8cjXYGpgPtXvOLgLYGER6pswu3OUnYmHY7zIzEFcsxE%2F20xe%2FGwfScD8mvKNKPwI0sMUIt0GwlFtwYhY%2BkJjo0jeHyhYNNpUJIfhXQhBwAsevQDGpJNjOnOcFmEzi%2FGFjJjvZbO2QwBYikXkS8v6Llbo5bk9m8nLLeXa%2FMJvNe4B%2BCcOCeaStVdz5BzmAt8SOTtNOJN6odzKuijMY4WcXJVmaMyp%2Bp3opQo0sO1lRsreQAK%2BtfbY7w%2BjOBly0VxQ2Uyr49vbf%2BiP50%2F4kDQWxRJlqhzz0XjsnpbVbYLElsad9GdqQI0Nd7ZKw8dxP0aOM6%2F%2BWVnZU9EUdBO7MRsE%2FeYB662nYz47cU%2Fu8ChJhDNAG3%2B5Y9t9aW%2FtCDnDg7Nb2zBYsAtRjm%2FMLXWm1%2BK3AwkpM7ppXwiXi9GdieCjIzz%2FVtt5j2yvgY9fKbtiHhh1w1y8KKzjKGPYW0UcOlyiyRTK52SyaUHiAA4wsbW0zQY6pgHOBZQDXfgnF8j0cQJisKj2QFaq1DOuY7fj7%2Fa3vAFxZP9QqqmEBD7YCLi0TQAcO%2Bvd6MswPVfHFyvuHswWBCjRylyWFGYTUKkwLdRZYaEuyW9TVP9EDsh5sVHXUAiKCqlsEjymP92UQDGaFsiqkiqYQGB1o%2B2q0am6YTPQ%2BJGQlcSKsDFkPS4GWPO2EcEVMlnZ4YASPflgiVb%2FRTn55rSN790uYZIv&X-Amz-Signature=48bbe6dae41606b832df05f57012822656b12be805ce1d7b52efbeb0feef4375&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4FSFB2C%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T072224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIEcW7Ct9YAlQeHdRMLweW23uC9QyzVmJH3Md0zPRuqadAiB5yuobt42w%2BoVuLIk9E4fuQYLElCnkqPOoEKrShGz00yr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMoH6IWV9OtgtZnBHUKtwDaiztlXhPUmmcUmazEE8mrNNTIKtDszBeKeD%2Bv6oO9JYMmfsm8HpzPg9FGwSa8Mp%2BL1L1fIW%2BX17V3i7S3WbWUjOE1F8M%2BQe8zGFfUJt5N8eqPEszx%2F6BggWIZ356LfORfJlnB0MOoj37FsoZAAf%2BrD5XWzBb747vmC0ZgIK5JnaM06dwGFPajTtg8YlMFgKtvpHdoo9Ja5j0tB7NqDd7bEqp4zbirE%2FFpEblRXfRAnig2sKpzqVZei%2B4TB8g%2Bpo4BXSqKP3Cyxa3VkywfsRxAGhvPSQlUqQncnF0BCxS6UlYq0Za0H2vYBf94%2FJj9Ixgi1Rb81t0YQcRm7cY%2B0bYBEc9%2FD9GxrCXUfag0oFNv2ZyNqcmstrV4YLgvE6OLtE%2BkdvaPDe78ud8u23djXkXv1al0D%2FvZcA2%2F%2BAZ2av%2BZICZ2i013f3vxxo2fB8fbPM%2BwyphHFzwSCI6%2F6kyud32xVNpwZ64gq49%2F7mnbwW1wzloSN07qmXbbLThRXS%2BBlUP2gHQ7wRRv0E12nsGcJhIFv0lR3cOtClZ347o3v4tdZ0eyrDVFbSTScxDGVdLRtV5ir967MAvUdi75gBZ0ukYcRDCxGnScbafbyioqyqrHmdaZdlke3gWgKyriCIwlbS0zQY6pgHKJL9aeBwNH8W5r0pozgF01lNbLLwxh15uD8kjJIflTOc14S5MqkfQ%2FAhyNjPcwhC6tlIGh7TqQun2QBZ7ruuHZQQ1ALtYjB9dbSyMBHikRauVzGQwTt%2B9qDZkmFzDtONY%2FBFHMkJeJobP7KhuhrqLeAjkHMrG7WjiWfWSVFB19Vb%2FTBDn6m234YtWD68gOkY%2Frwej1sDHKy3WuOCPhNHd8WpG15eC&X-Amz-Signature=b924b7b10ebb1a0ae2af708601c47838ab3867f96f5f6abdc7da4f2b91ffec14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

