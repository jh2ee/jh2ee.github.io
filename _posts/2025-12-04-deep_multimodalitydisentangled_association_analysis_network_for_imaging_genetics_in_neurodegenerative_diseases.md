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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMBFTQXG%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCcuo4%2FF3zOFMw%2B2O%2BOLssaZkuKAsOF2As1txQQ%2FDdOvAIgdpKGvQ7TjlapXJyOWxUT8LaCE2uDOANdIK%2B%2FEGISNhEq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDGp6aN72hsswKsvBCCrcA1HajKKq5Xru907oa%2FrU1MOZbGT2nN3rT170CKHJrvst4mYA4wfJJH7ZR13j%2B%2FqlW7uvpw%2B7vOECIJI1yYrHWEMYsJQm4B2rrniJcB6AT4TuxNiLPBPnlQJR2o6R%2FFQzllKKnZ6PFhJ36pJE4lAJAm5AIYfjGEC6jsSJrdANj5hK7DV4sowfPNiLaFpraedSost%2BYHMw1alW0UxOnqIYSQxH7ucnp50TxZqvWA%2BSqy7iFqmqXW0xAjJc7BLKlRYaExZK3p%2FtfKtGPF0%2FgsC3HNHwwOgfJR4OFPk8c7cM3KuAQFE8CPqtHJxwnopUzJHAVWitdM9wJOcd46P%2Boaftji1pp5C2deshnjb0hsAv%2FJ7J%2B7azx%2FZ7zXIdkdk5Pqt9fd2VMzzlECz5aXsq5vYYF5LoKCQ1hxFwbJNZ%2BjrXXNwLpM4fo50AyX4I87XLCR15bnmJ9MZL9KEwytKOF3Vh%2FqoeHty6X3kTF7Mxf1m7bWq2xUy%2BDeZ%2Flbe3E3aIpJipWzxIVuv18knrXX0raumAI3B5nhX3Mc%2FLnmEiHAKBW4apaYrwUoXSHNqW6P%2B73S5Xl6izDMIFscOK9l7OphFwKPM5c1RCzeptFfO9E7afndW4y6FDNWWw8acTO1zxMMK8hM0GOqUBY8zYAyUNr5%2FfJAh6ilyMdHTqSL7ErnFSFKeVohzDufZRO9taOoOT3b6MW440i%2BZUZagKSWWNHRXl%2FFA8YTWn9UxXnI%2FB9PGM2a1iUuzwpbGjYi0gDQ0Sp4cqfh9jy6d4sBDGRy7ZwJp%2BOlJCoGnI3lR2Fnp4ER1ek%2FPgmecdiT3B4Pi7b03%2F17v9mjnbzzZssOiHgDz0FKyKpkmDmxr8ydeK0uth&X-Amz-Signature=d3fcebb122fc60b08982bcb76a55dc5de531ae9a747a14c4fe7977ea3f30c636&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMBFTQXG%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCcuo4%2FF3zOFMw%2B2O%2BOLssaZkuKAsOF2As1txQQ%2FDdOvAIgdpKGvQ7TjlapXJyOWxUT8LaCE2uDOANdIK%2B%2FEGISNhEq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDGp6aN72hsswKsvBCCrcA1HajKKq5Xru907oa%2FrU1MOZbGT2nN3rT170CKHJrvst4mYA4wfJJH7ZR13j%2B%2FqlW7uvpw%2B7vOECIJI1yYrHWEMYsJQm4B2rrniJcB6AT4TuxNiLPBPnlQJR2o6R%2FFQzllKKnZ6PFhJ36pJE4lAJAm5AIYfjGEC6jsSJrdANj5hK7DV4sowfPNiLaFpraedSost%2BYHMw1alW0UxOnqIYSQxH7ucnp50TxZqvWA%2BSqy7iFqmqXW0xAjJc7BLKlRYaExZK3p%2FtfKtGPF0%2FgsC3HNHwwOgfJR4OFPk8c7cM3KuAQFE8CPqtHJxwnopUzJHAVWitdM9wJOcd46P%2Boaftji1pp5C2deshnjb0hsAv%2FJ7J%2B7azx%2FZ7zXIdkdk5Pqt9fd2VMzzlECz5aXsq5vYYF5LoKCQ1hxFwbJNZ%2BjrXXNwLpM4fo50AyX4I87XLCR15bnmJ9MZL9KEwytKOF3Vh%2FqoeHty6X3kTF7Mxf1m7bWq2xUy%2BDeZ%2Flbe3E3aIpJipWzxIVuv18knrXX0raumAI3B5nhX3Mc%2FLnmEiHAKBW4apaYrwUoXSHNqW6P%2B73S5Xl6izDMIFscOK9l7OphFwKPM5c1RCzeptFfO9E7afndW4y6FDNWWw8acTO1zxMMK8hM0GOqUBY8zYAyUNr5%2FfJAh6ilyMdHTqSL7ErnFSFKeVohzDufZRO9taOoOT3b6MW440i%2BZUZagKSWWNHRXl%2FFA8YTWn9UxXnI%2FB9PGM2a1iUuzwpbGjYi0gDQ0Sp4cqfh9jy6d4sBDGRy7ZwJp%2BOlJCoGnI3lR2Fnp4ER1ek%2FPgmecdiT3B4Pi7b03%2F17v9mjnbzzZssOiHgDz0FKyKpkmDmxr8ydeK0uth&X-Amz-Signature=d3fcebb122fc60b08982bcb76a55dc5de531ae9a747a14c4fe7977ea3f30c636&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2EEQ74L%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCz6AFUvX0oOcZRx5jnA2H19dJrVmE3m%2BY5GE06bfTBagIgKUMx27C0Xo3CpCCdG0FGj%2BZa0qFJbi%2Fej%2BTtyjxTVIEq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDPIenwTbXOY%2BRqzb4CrcA%2FDTRSH%2F20hRxdvkoIJO4w8xwo7LcjJXsqE2G5kPfNtd592Xic4qssq3sSWJcX25sYAjEK63xURzdkFaM1lNYLB%2BDb8FLUHgdchQwJde8urEKAjMkOA9Ddzp7yXC8EkKweUuBMh7PhRwolRnnIPlzJAqqqGbOxmGqoybWGbkXYHxzApgK48M35cbAVg1w9dyv0Lsyfgpa2Z37x4vADZctze%2B4eySOonzCNZCQ8erVUTeoUgr5MBRLWGu4%2Bx0W3vq6cPnoyKMvKmrlO3kqktQWGI%2BBFGKdvTIHoHfBTXn9P9TPmYB5d7bM2PrWxcPqTJ%2BW9iZ5DdVt6p3CFrQh3u866b%2BN6fhfQJrol8S9RZ8mdj0J5d8S5Nln9AX6KnpFcYuNl9KMxoiHJwmu2XdbjYwtUrcTL4VBJpW%2FPhJ%2BgXqvOMbgIxQgQqolu7pmFeTX5WV53JtDWbQRLoJo4qLVebamlaQa6t7VgarejVQNswQzNglhsTcmtCVz%2BITQy1TK0bWP%2BtJy89mdXKiq46Lc1hosDnTMqQbwBHD8GwFe4QaPrZyXjObuS6eONo3b0nmxwMYSN%2F3BgQVth9TDgnHEh3E0zuAHulgwixTFzcU8d5%2BMXIUEt7zDBwLGCKWJGF%2FMPe8hM0GOqUBhYmsJgFcDfmU9l9b%2FGaO42iP5Og1XS24c1%2FqUtDHcn2xokLdqEtO7Vp5YdXzdl8Nj14k2xCUhWpZyvR7zRWf8q57Y1QxVFuKx4kqy0rCscHwLXfz2kJdPZDcw7G7QKwbXd1xa3R%2Ff8Q5rnncalVm24jTLNMNnFov4d1V4Vb9rmgUsu7PPsxrkkAvPWqCt1DTkv5tjdZjiJ%2BPm%2F6mGm8hn7d6MzeS&X-Amz-Signature=e650641fbb399b8550a3c98573ed6619d709e977d3e57b60f39deb62ef0e147b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6PIU3IW%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDoeLI60oiUjXw2kouttud8e0RtvpGG0KAYVwUSqvfisAIhAKr2nQllxeHX1H6Du5mnr9lP4oHpwHNyt7ROby%2Ff%2BpGJKv8DCDYQABoMNjM3NDIzMTgzODA1IgwlRTO%2BVOoLznM9IQUq3AP4Vw8GHsVzoCUdPLBY%2BtgqQ7giGyIySw%2FgeQUmlpwKDZYSFiSLTfgLsmJyPY38IsQ5aEWoV5jLeYN1yrkjUJGUYKPxwzk%2Bo67xqS%2BwQLYqxWNeOxSCBCoTWusfZ05Ihl2OQTcFXSpyHcygbx9%2FkRbtFPHXzLJQUGUuH7xEqdfddny%2BWeDRjN%2FKq22pKGqangen7ieA3ToFgEwpvj1LB%2FNQvLhoIMJEgpFXb67B3kUJlaxcTnv1wc3oddboJzTiRaWObmOy2YFJI3HqhZoG99OAOCpjq9vfIujsyPsWZlPto5geoUntP%2BXX50mnt8szH%2BOHuF9YWUDaVdoZt6f6vo9YOgUAkx0D1cNhBPQwOg1Hr0bdOUjly%2FbNg61rmjjhdB79B3Gr8niQrTVFPesUFTP2pqejnkfY5w619UHGQQnRx66tTqZEmxzI302lp4bJtoGAZ1iNbl7343nmOQps7ju6xx5ti6i5t%2F685hFsF36Dj%2BZHdUxVh3pzQMrPoUdyQzyA51vFJ%2F9U1FoxSxvcvgYSx%2Fc4P0U8LKux%2BmoIoyTlvhdvie53a%2FbklqNaXo2524233LOijgKvYd7VI%2FlDZRUhp55GMZh2Bs4FV5huQjZKc4a%2Bgt27ElNnMPta8DCXvoTNBjqkAcHutPHxrqwoZBiyhJ%2FFP7u22%2BrTyNSns4T1aRicRA0jnn0piuQ%2FS%2Fij1jR9jRYmmpO3Dc%2BVM9c7UewuapNbeIg3s1lgsji3QbXSN0wBFZxYM9oHVjU5JfXYLyVB8OjeSj8%2FQvbon4hTrolWZM%2BgX27nNb6CN0x9y1ZOzK66TBlQ%2FtqXLFaAL%2BKFC%2BHcjFNDZqDxHwZKltWXJrQGgNS%2FzNClmJ6r&X-Amz-Signature=db9bdfc91581fc711160fc12944d7dc690e4daca8d3427df12f5af66ab63b419&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6PIU3IW%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDoeLI60oiUjXw2kouttud8e0RtvpGG0KAYVwUSqvfisAIhAKr2nQllxeHX1H6Du5mnr9lP4oHpwHNyt7ROby%2Ff%2BpGJKv8DCDYQABoMNjM3NDIzMTgzODA1IgwlRTO%2BVOoLznM9IQUq3AP4Vw8GHsVzoCUdPLBY%2BtgqQ7giGyIySw%2FgeQUmlpwKDZYSFiSLTfgLsmJyPY38IsQ5aEWoV5jLeYN1yrkjUJGUYKPxwzk%2Bo67xqS%2BwQLYqxWNeOxSCBCoTWusfZ05Ihl2OQTcFXSpyHcygbx9%2FkRbtFPHXzLJQUGUuH7xEqdfddny%2BWeDRjN%2FKq22pKGqangen7ieA3ToFgEwpvj1LB%2FNQvLhoIMJEgpFXb67B3kUJlaxcTnv1wc3oddboJzTiRaWObmOy2YFJI3HqhZoG99OAOCpjq9vfIujsyPsWZlPto5geoUntP%2BXX50mnt8szH%2BOHuF9YWUDaVdoZt6f6vo9YOgUAkx0D1cNhBPQwOg1Hr0bdOUjly%2FbNg61rmjjhdB79B3Gr8niQrTVFPesUFTP2pqejnkfY5w619UHGQQnRx66tTqZEmxzI302lp4bJtoGAZ1iNbl7343nmOQps7ju6xx5ti6i5t%2F685hFsF36Dj%2BZHdUxVh3pzQMrPoUdyQzyA51vFJ%2F9U1FoxSxvcvgYSx%2Fc4P0U8LKux%2BmoIoyTlvhdvie53a%2FbklqNaXo2524233LOijgKvYd7VI%2FlDZRUhp55GMZh2Bs4FV5huQjZKc4a%2Bgt27ElNnMPta8DCXvoTNBjqkAcHutPHxrqwoZBiyhJ%2FFP7u22%2BrTyNSns4T1aRicRA0jnn0piuQ%2FS%2Fij1jR9jRYmmpO3Dc%2BVM9c7UewuapNbeIg3s1lgsji3QbXSN0wBFZxYM9oHVjU5JfXYLyVB8OjeSj8%2FQvbon4hTrolWZM%2BgX27nNb6CN0x9y1ZOzK66TBlQ%2FtqXLFaAL%2BKFC%2BHcjFNDZqDxHwZKltWXJrQGgNS%2FzNClmJ6r&X-Amz-Signature=2d0a7dc6e56671d33cebd021be2f567284a4a47c60cd67170a248e9d8c4cb3fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XV7XDQBL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDqVxfhZ0F1zJf5pubCAFSB4H7H6MC4SfcsK8MZmjoMqQIhAJcL2QOgLPJ1YvLBfzc79nZwdMN8dnCawqIMmXQ9DBToKv8DCDUQABoMNjM3NDIzMTgzODA1IgwbkjRmXMn6VtdBVdAq3AMUNHqlHANjufeJFFBpjQA2Lgo23gPr6ua3QQlOLpa1m7dl5Fdohk700XdflrFIOZ8BFBOqlLdowFXlHPNdUAWOtykA6fZhGJCV8Rk71Bqgn3fLNEx5nLqn9esTl0%2B5TluvLrakUDvQxG5c90qTkwhTCwuN03%2FAt8giCynPEKpOhQKSVtS4H7FwJjbRyZnZgLvHa%2Fs22b5Pgela%2F0hsr0oNFrN1HbwLTFClq5DPKUU6CSUwbLhH%2Bn7zWITw67avd7b%2F2k4rin6i9NoIwngC6UKehthCbX57umaKZZaB9GbHn5JhkoxilKFw17aKY%2BWtPdKvDSVUu1X4HfuhB6nbL7lUU94NFTNRjEJaO18UBWFeE1V%2Frhdmn3zJ2RvnT563p6F%2BcPvqAVZld7HPWb4sGWrhmORinYoisIMt0r5v0MEHRfMroey0zuyxGcBjR%2FD8Dm9R2X%2BjpYsILL1lHs%2FeKQarowaXfdsBOUU9X%2Bn7yQ2Ns5i08pcRQUSyA4Tn2pL8ADDy8JYUGid%2BG7z5S0JqEqJHEL5oJb76qCCfIp%2B6TaqAwRaAJwNUdD6C%2F5UanD7UrtEyFYkdcnnO%2Fwsmq0LXbvNjvu0ca1GysvueNs19PFdvR049EYEySyvyZi01%2FTCSvITNBjqkAURzo5FVcG0rRlcKwOM1P2PHRwmwPzjlokydWEeiK5gESQPddZt8yGyVn5Hd12qkppM4fd03CI%2B7ltP7ZEHNuEGs5rEbtmf6XAsZV66H0WUmGNZgsQJyqnDvQrFk43Vc80SQmeFU2TjYwxgCV9N92kVjBob%2BSZaWyqFiXBN49BKqZ8zCmg6cUWf%2FH73C%2F71qtaKhitkCs%2Ftn%2FlV%2FfShuPGBAbwEZ&X-Amz-Signature=3f5b8c390b3241bb07e102b03895606ed5ab906cb4eae7525358dc79479e0024&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625QUIJ34%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIEVqd5Hs81l%2FK5JhQ5dfV0GevSdSZFdNdjd4O0bysJGIAiEAw4Bw8s9vfFnmUUzuAe2fHZJj2A3gm8EN3ow8zvJf1RAq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDN8QpHfrZ0Qn0etPFyrcA4wwX8EDlMKgq0Qu2EqP72c9Z%2FM%2Fh0XzsiqGNhbh3mjrds76kOr68ZuGwDb9F91EHA%2BG8qr0uwDHzvyT3YzdXlSnQWxLEkNWs0mLieSZKZo06TKT7X3CEPlrvy2iXkdYgyiJK45EsRiu%2BXTA9IBawrelJMywgtWRlJJnCuAAxv2uRePlxfalVIfVZhcn99DC8qR64DtXKe%2FSojGGr4KrQncR58BSNuzYD5mrj88hrF6t%2B5ZQDNSUzdeKkMMRedmpC9T6DZSr8jJNjTcUYZHG6z6F4vtRaSgNuHsUZjegGMrYpVQIVnUX86KQQbydZfHVipFmmfrDxkhL3Hsi6WERnDabppvdWg%2BG7Y4WNvjE8s58QOTtX0R595W8eD8nn0tTVOvPerE0xEV%2FQztmj4vZQo%2FX45Pj9Dh1aZH8XO9KjSB%2FIM5nn56Y5Ta5N1WPCTl4hBI4zIwcx9ySLzR0rkCEgTIxBByhQrUPlbreyX7qD6V3t81SHY9WBpLJRctty%2F66XYm66qzMkggr%2B607Qus1BKJiTLJ4OoZKC47To7vYoDxHtu04wg4eadMdFfdKHQWKmy7jAoW5G8r3nsLwcVSefIwxztzahLMehk74WN5%2FHVqoTQ7LmS2MBBRqVNkYMNm8hM0GOqUBQmyYZEr6LHNlLMse7KqkVYdbmNBDh9rXg7OcYrk9BM95xAFVmfmPblp3byIB%2FPmgk8JC5G7aFQ91RYQDAnEUZsRHqYAZHuBiRP3YCi8Zw6TOj8urnlIEvWWuG4HNQ6Fr8%2FGh68P4QIK%2BtlzgYlc7ld0kVzL5BHiawNpNQQPLFDTm85BZMvwrGVUJGsZHbmHHYq7gNEY0Oc%2FPCESjFglvUgH4Grim&X-Amz-Signature=04073b447a450b9b9d44e0d493abd8c419f3ef55a41a44e0764e96f9111aa33e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAKQATFP%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIHw1cMXt6rIz8ulyK3cDU0MQPOZYNgL0%2F9K3VtHQ58rNAiBIVjdWNxd7TnnBVtMxKQx%2FrGvyvOThyaljJsh3yigFACr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMwNliaqhGUCMGTfwWKtwDBq34Fb3olYuM8D%2BqwqmTEnu9zCLqwqKUJ3bIQIAm8l0hwjXEnTeXmujc0XGuNG43znugyS0iYn07VJjsLha2gZJmOVc6Iy6tsfSuo7%2Bd2DAFWGdD8wt05sXaO5OboQ%2Fj3HpfBe4Lv%2BHa%2BKqfkKzoxC15lk%2B9agPDwJ3hzdtesuKVoL%2Be620TjyAbxCHfvnZM1MgvOzQD6YFmbFdlOMkj3VCjd%2B%2FEeZYHTQP%2BZvI1c6KBsZX08%2FPWhQnaRkhWE%2FVk02zHTrRTh1ITiDBy%2BF19GHvXiIXMGVA7jq21cM0bOIrTKqUiUB372iGGTIYSULHbCXpOzqUMua5Yv7I%2BUSXBBZMRQY8ahxNEgvLfpzkf2cfcOU1m%2FbZSLG%2BhuwNySHl70WGJbzRzhps8%2BPW0cuOLReofwKb90ExY9aiLbECr8AHKic4QekFl0qGrGh7bLZvrpfxRlMomQVU7o6J5w%2FubgIWeIlqAW2090WwY9rRqYTk080hTp7Ufqywk5YWJcvqohndjQ287HhzehzhymE5KW2WW%2FwaaNSWUMOOqJNL6lXvPQ49ySAEB%2FSjlNCmomLZfQrRp3YuZOr7rF2txS72hkkUJVUa2deyBeVoDX2rDD0xK0hQmyOmkWuZ04yww3L2EzQY6pgFchEsb%2Fj4XIONMAqzb0Ji0e4wPSGZ%2BwkYTow1BmOR1XMHeEkncv5fnPGfmd3OgQCLAW8ZBj3ddwdBcNlKsqY6GR7TwaoDcDjKu6nsP4oZiBUFCBS7x7OLis6MtMvj0Jg1Wz2c%2Ff%2BxbENdDF8XhAkf4maR01302hEOsD4bCn5PWeYAw50VS%2B%2B5XccjZbYUgAffMJ6sWZZLD%2FqUI878EnDOf1p8Nqx0T&X-Amz-Signature=e9d965bcf374e7fd7219302e9494601fa79f8daf046805831059c653994fe5c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IQZAECD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIEZP6BIFOzZOPBSgBWye%2Flq8GSjBJpfOKyWyyNhbS%2BShAiAgMiKTH1ru26GDJlWRcj7kX38Sb2ogZJsu4Ts0g9J5jyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMx%2FLoGKu4MDOEk5rMKtwDye2AhINhZWKQqvQu8H0kf7BPfPwQlLshh4MjwejVJYXZvYWPzAka0wcY7leiT7BTHd43Z%2BNa%2Bp%2F3Z1amYtWOsKcOXlx3waZEyj4zl9DFeCVL5Y5l90TR%2BYCJIVasWBflNyMCenKvORiNl4DYn0Z0R%2B3Nz07gEygn0VQGOYhobt4gQvWEzTL7%2FVAwHHMsNj35lf1SAa5a4XKMsXVEJ6GciX1A51tk7d5H%2BTodt2iG%2FxgC3l0%2Bthr2dnWpkBf9WI%2BLKE4caUOcZUb%2F2%2F83ZCElSOKSpGzYJEMgssUgquRWcN%2B8JwDnUxs7%2Bk1h5PKqUxdjYEzt8kkE%2BncOkUeAEfTEov%2FUWaN%2B6lWp%2Fym59T4Glf88pPYtAB0PQ0xu65qzak8JMlHTG95q1Rl08HmC9GkgGD3U02v%2FTVc1XpZCOBwWbNivpzw9zjYtUIxpCMDd7i1sFKryQgt6kX0%2BOLFvRGiPwPjF%2BQRI%2FYI2tWC3bkJEvKRcIcPNMS6yTo3zJiu5i4bboj2oREd42iDzuumrqBIXfNjpCKGQE5j3%2F0emM2CiaZB6lBtJa4F0X8zIPT6zBoQayOCtKFrYCo83rR8Bm0eePKH3Z5aTYcmHnh9u2EXF5OQRiS8a%2BgHLb7nMft8wr7yEzQY6pgHpYc7j3lQg2D8O3YgA1A8x6qUFIc7lcwaRulIR8bJhrnjk44CR3xiF9W4%2F%2B9ngpyJqmUuwEtiIiqwvC6y6xyCBcRk%2FqQ9gGevhz%2F18PFC93%2BaflNC3Z0%2FNvVxtpFEiB2%2FGcony5fNhQehBeTTZiH1xaNhZFRmkzA7BnRz5fdFIaJ3r1fa0Xcf7stz%2FV%2BlzCcmpseIs3wO2cT04VX8N%2FIhW8iro2Hzo&X-Amz-Signature=a4589f29f5cffe22dc3e5a6ad157dbc6e2da905bafd748aac606227942c02f14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IQZAECD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIEZP6BIFOzZOPBSgBWye%2Flq8GSjBJpfOKyWyyNhbS%2BShAiAgMiKTH1ru26GDJlWRcj7kX38Sb2ogZJsu4Ts0g9J5jyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMx%2FLoGKu4MDOEk5rMKtwDye2AhINhZWKQqvQu8H0kf7BPfPwQlLshh4MjwejVJYXZvYWPzAka0wcY7leiT7BTHd43Z%2BNa%2Bp%2F3Z1amYtWOsKcOXlx3waZEyj4zl9DFeCVL5Y5l90TR%2BYCJIVasWBflNyMCenKvORiNl4DYn0Z0R%2B3Nz07gEygn0VQGOYhobt4gQvWEzTL7%2FVAwHHMsNj35lf1SAa5a4XKMsXVEJ6GciX1A51tk7d5H%2BTodt2iG%2FxgC3l0%2Bthr2dnWpkBf9WI%2BLKE4caUOcZUb%2F2%2F83ZCElSOKSpGzYJEMgssUgquRWcN%2B8JwDnUxs7%2Bk1h5PKqUxdjYEzt8kkE%2BncOkUeAEfTEov%2FUWaN%2B6lWp%2Fym59T4Glf88pPYtAB0PQ0xu65qzak8JMlHTG95q1Rl08HmC9GkgGD3U02v%2FTVc1XpZCOBwWbNivpzw9zjYtUIxpCMDd7i1sFKryQgt6kX0%2BOLFvRGiPwPjF%2BQRI%2FYI2tWC3bkJEvKRcIcPNMS6yTo3zJiu5i4bboj2oREd42iDzuumrqBIXfNjpCKGQE5j3%2F0emM2CiaZB6lBtJa4F0X8zIPT6zBoQayOCtKFrYCo83rR8Bm0eePKH3Z5aTYcmHnh9u2EXF5OQRiS8a%2BgHLb7nMft8wr7yEzQY6pgHpYc7j3lQg2D8O3YgA1A8x6qUFIc7lcwaRulIR8bJhrnjk44CR3xiF9W4%2F%2B9ngpyJqmUuwEtiIiqwvC6y6xyCBcRk%2FqQ9gGevhz%2F18PFC93%2BaflNC3Z0%2FNvVxtpFEiB2%2FGcony5fNhQehBeTTZiH1xaNhZFRmkzA7BnRz5fdFIaJ3r1fa0Xcf7stz%2FV%2BlzCcmpseIs3wO2cT04VX8N%2FIhW8iro2Hzo&X-Amz-Signature=d339fd523b669e038d401fd0840636dae9703d5f86d4d35ce50a1a6a39004ed1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWWMT77Z%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQDuX2z989CJTuUv87llM%2FD%2FK0%2F7cT2rKPhbHF7bO8BJ4wIhAKpvx%2FYbnI%2FRzrgw2C3Qy6%2BXLM7xD2j22jfUdS%2FzEVk3Kv8DCDYQABoMNjM3NDIzMTgzODA1IgypZ9eAa16UO94TIjkq3AMtPoaPC05ZylNIgEoANJxVTHadAK7RHRjoU6GZeeo2L8v3DtHUfx64MdJKrtiBkb%2BaBJA4dtt6pDwe2PqtwitWBkiYzXGhNfXkReDwAhdJodJKR9%2BJ9dhXBOzOkklCoImWwpNHyH0R3vD3h0ssIkJpvOqkmxzt1%2B4eeqL2uKOQ1toelxgMV5y7uh%2FXLZx87yW5rLIDPSSWVdhuNk7XEbaXWZs9BCqxV3zn5K3d81ehmOS3f1udI5bO9zBrBXLMEOKeKFjPpZ49F2teo8W8ZQ%2FreQZdjltug1IPr%2FxW8oFiIgbzRurfscFNL93gqZ5KCItW6yFs4cEpTS3lqzAPbD%2B5li4T3q2qP7%2BF6PfbqJKUNvqPFwuJsCDuTOUpOs5egyfxpVYyxCXeAiDfn5lvY%2Fz7jNS001bhzdJbibyZn6O18P%2FzOy4Gk66pOrwQi91JPZU31KdHfXDWBHih89LOWjbSaoq8Wf5UQw%2FtvveaGp%2F8ehUZbwyGrCbAOnxbwmgAlRIlIBOinOmNFDrGkKkKS3JdZlFHzuH7pekQiqf2oCfauavYq%2BdRVcsZMGhWtFNN%2Bq%2F329TzFscUy47t8W%2Ff3%2FhQ%2FQapgk21Y8MGzldgYy%2BM%2BTbSW24SEL%2BSz04QGDD4vITNBjqkAWWov%2BZKM%2BRixI1kPBuCWxrmTBkYz1ThSa2A%2Fsj8LOLcX8kNwjqSgLuY0JVuenqnEbVs3%2Fz%2BI%2By4tLhGIykPZqwFylXCRyUijPqwOwA%2BTPtnOE4hwzlj775zVm6x88vjk6ZYe7u8CQlKzUhYARRaINifKq%2Bu1oa%2BAC4bw4J0ydPaqWV0ymmvie7HE%2B6JscYsOuKqq2M3ur3V2ROKiMPlInIUCIuy&X-Amz-Signature=88d1c58f2cc5793ff996181f9bd240472b5f83fd5a726494cd8303d36a2f6672&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XL2AKBBD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCICx9eWpxNslDdRnxyPUV%2BUvTWS%2BdQtQyY8zAWFi5%2B93rAiBu8gUaKcJbYG4iUB%2FxUmGyMdOX%2BWhprrmpkpJUrXIUCyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMN%2FfT1Gd6hWOredo7KtwDtNuUYUVHpfbrFx4SQrVhUYWIxKOYkNRyNpLEdjn9Kiz%2BEMzYERr9t7rBCGjYLF8hoz2o78XrYaFZU62EdIncO4lqemKP7D2KOTzbeIMXR5nLcVaSnetUnfhFPolCtSPq05rGgn1pcwdaAP%2F5Wj%2BUm3nn3Tbay9ugaOkrt887OwL0L75Ui4QwAkfdFygMdLWsGEkJc3o4GhnKnOPiDlqMdBWMv4EtSh%2FOmJMmfOcppTmHdy3SBd24f7jKUf7oCeTE851dXOiRZ1wNV58auAS41Chcf1oQLtipuIMrErDxqsuzSmzp%2BQEAtPVXmvUWBhBAdP0jZC0n%2BNhrIkspxfRxw%2FwMVO1gOcSztJGC9kBX%2B7luV1k9wEFwrnI6x21OKJLlkwiOxoLzdFtcYMrT0hVkB55Dai1bcBzun5EIi6gJzJUQ0GwsAh6fhO7gdbPNOfBePnFec1DY2LcRuwA6wOSwCg0cIbOko%2FcKbLoxs%2FL2uLjXrsrs2%2B%2BbgVZb3h4O1NhAfL3bUWPGTwGdf%2FNKGQDHHXWQDqW8lTh5Thux0HzBYc%2B%2BtCieY3O%2Bk7UY11kDHNxfB7hW2xEUsYjSLMY%2FleTtKgn37NeT3%2BVbviwsAyoWlVnPacBz%2BMOS21Ip2fcwt7yEzQY6pgHV5uNUR0h13YUmpzAWZdE%2FnMNSHDekrpASQcKmq6%2Fqxt1VUS8TRRid7HArAHmt1YrF50r2VCZpOX93LbayBfjruT4ynwpJ8HyK6aArGRtveMluo%2Fu0rhEmpWp5OXJ0X%2BWkrkKSSn0FRYxTBrbUiqL69jHPUxGM%2B7VnY6ZyI%2BdEsvYGWcXmmbyHMni1Kn0H2iNLV3t3bi2bF2OfuZbxHc3jGZWy9wwL&X-Amz-Signature=6cdfea858ff5915f05fd66ce5a539347c239f737b5ae00df9a0103e77b76a4d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XL2AKBBD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCICx9eWpxNslDdRnxyPUV%2BUvTWS%2BdQtQyY8zAWFi5%2B93rAiBu8gUaKcJbYG4iUB%2FxUmGyMdOX%2BWhprrmpkpJUrXIUCyr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMN%2FfT1Gd6hWOredo7KtwDtNuUYUVHpfbrFx4SQrVhUYWIxKOYkNRyNpLEdjn9Kiz%2BEMzYERr9t7rBCGjYLF8hoz2o78XrYaFZU62EdIncO4lqemKP7D2KOTzbeIMXR5nLcVaSnetUnfhFPolCtSPq05rGgn1pcwdaAP%2F5Wj%2BUm3nn3Tbay9ugaOkrt887OwL0L75Ui4QwAkfdFygMdLWsGEkJc3o4GhnKnOPiDlqMdBWMv4EtSh%2FOmJMmfOcppTmHdy3SBd24f7jKUf7oCeTE851dXOiRZ1wNV58auAS41Chcf1oQLtipuIMrErDxqsuzSmzp%2BQEAtPVXmvUWBhBAdP0jZC0n%2BNhrIkspxfRxw%2FwMVO1gOcSztJGC9kBX%2B7luV1k9wEFwrnI6x21OKJLlkwiOxoLzdFtcYMrT0hVkB55Dai1bcBzun5EIi6gJzJUQ0GwsAh6fhO7gdbPNOfBePnFec1DY2LcRuwA6wOSwCg0cIbOko%2FcKbLoxs%2FL2uLjXrsrs2%2B%2BbgVZb3h4O1NhAfL3bUWPGTwGdf%2FNKGQDHHXWQDqW8lTh5Thux0HzBYc%2B%2BtCieY3O%2Bk7UY11kDHNxfB7hW2xEUsYjSLMY%2FleTtKgn37NeT3%2BVbviwsAyoWlVnPacBz%2BMOS21Ip2fcwt7yEzQY6pgHV5uNUR0h13YUmpzAWZdE%2FnMNSHDekrpASQcKmq6%2Fqxt1VUS8TRRid7HArAHmt1YrF50r2VCZpOX93LbayBfjruT4ynwpJ8HyK6aArGRtveMluo%2Fu0rhEmpWp5OXJ0X%2BWkrkKSSn0FRYxTBrbUiqL69jHPUxGM%2B7VnY6ZyI%2BdEsvYGWcXmmbyHMni1Kn0H2iNLV3t3bi2bF2OfuZbxHc3jGZWy9wwL&X-Amz-Signature=6cdfea858ff5915f05fd66ce5a539347c239f737b5ae00df9a0103e77b76a4d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5WS7IFV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T050807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQDYJFbx0vzr477ZcdNNnMIUYUw6%2BJoZbcAnRNuak42OuQIgHN2c6AN%2FcYnkpFNa7Zim69xFObAsLT11%2FPlk4bfe34oq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDNMJ6QM%2FxVMmPm5WiircAwlUtPYl8gJFSAZ%2FpTtwextMcz%2FiNAVzCh9ro%2F0XiKneaGC7I3NkTOJLafuei3CmD%2F5JBBPF%2BdtG2xtLbz0LpODagPRUwcImIt57jnW0RjAQZC1ImcQiZUdBXCEDyNHCLlQi6Yz6co2g%2FKyTVkzO4UMgQZMAzwL31LDsgAfF0cgkvNZj88WGwr4KKbpiNZEhATPSVv7H%2BCLaDgPTxkKhqpHfkyngebox%2BZn8lNPYD1fu1tRK0AObifZUmXA%2Bm3EKxa8A7EafTRaXmxp1ICS%2Bh65uswJ829UFH3ySbSaRBcS4KrhktCdqSc5PFxOFf1ZEIxNB3MwOiDhW%2Fy3tYX5LuWJMWO53131AKUpm%2F%2FU7RRtee4pTeR4%2Bj3k%2FpHH15E5K7gUeK0UznCVHiQ2so8MPg%2BF5jgekaMc77bDqllTVRd6DqQwvSd3pSewDcqruAUgDq3pEZhPPxjrjQA5Ji1oWxW5e%2FBSQyd1d3i%2BMf%2BUI9Xn5E9wW2gY3UXZwD1ravJakl3nGr8PMdyls873E94Np3tUjH2QVBfPLfqBapXvJ1wEZ3hz%2BXsYqlPfafB5bJk4x8IsZFZ%2F7JhuU9tmaeHERqBUuFhMCN0%2FxUMIB%2BJy9YH%2FV9%2FpA6fGdpLPkZ1%2F1MJy8hM0GOqUBhl4Q6C%2Fy6XLgUirh2SKjUH1tNu46fMwdl0XLOoeROg452NsKX3zVLWZ4ucNUOjw9AT5dwj7QQJxn6fVhJjeicTtISuMMCfCMRWTPnnQUtxSprtRdC2wrnvaGyUZYwrrwHwAPXO4m61cdykC4fvUoVvcJDxcJq4ItlSdXgrugzbCh3YsiybNz3EIdsXAejkW9Ba0m8425%2BIroWzXeKNdjG351VAXO&X-Amz-Signature=5c694b7bc47bcc6ea6a9e11c9d213ad16df65211ab5cd89996e33ffd5cf5b671&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

