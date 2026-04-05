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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SSTXX3Z%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHiD3jEEEB5p7G4tTgMi14%2Biq6HlIm4PFPVSPPp%2FkepzAiEAi3PZX7fBzgHlAX0LldUQoqtIlup9gqgqlHDWu84Ke%2B8qiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE%2FVst7W1K6xdbaIkyrcA9L6S9TKm88kVCb%2B0bM0NcB6vvK37%2BFDn%2BCzy5Q5vRemC5WGTYIPjqlGMRCQvCh3ng2vDu%2BSw4ZuBQDXHTJ5f9tZ%2Ffqbtvx7Bj9HjY71E5d4M1UZl9gL7747SxDwyWDoal7LrnEjBLsDb7O630b250k8BVBbpHWEDrHcFIRQOWhtVW4VgLzj7y8YIki%2B5IG4alWitkV%2BZwqJHQK9hEthiNFH7Xv4DtxR5pJTU4IyAYhIVLauLPLfTbSIPt4honzPtxziyvDG0ueKPkuNoop%2FARXZiey%2BOPIQpcfK3j2%2FfFQLo8CgRNT15ljg3zqyI9ogl3Ll81fzHJzc4FQYRGEtrUOkfFB3dcSLj53C7Varl6%2FVY43OlCmenA9NwrKmrAaAFtYmhhOA3kuJsvSa0P9mz5Mp41ojpzl%2Fw6MzsnnmhfmuwaAPj9fdlYUR9S6EYxE8simSHAo4mAyZnoZg%2Bu8NxIqcA7LrOrQRlBSDRUU4k5ZsD1SjU%2FNrsZpUTXXztLb8IBHfMBrgbZi6XP8nl9rirQ6Qz7mEa42l5KmhDQQiKkepYtbf64PCsT4XDalo11VevKlbltICjOpl9a%2FOnXF03uF5d50lvAbczQc3XUA6vl1Kp4a0Y43uvkScJ2NgMMbPy84GOqUBQKM1q3v1iAc4RQ%2BlHMU1cCBYreI0nY6iSpCV2nQHgwJBoeDcbaveE1E4qlFfjBo1LtkF%2BzAQoQwWjEk7P8s%2FJlA5GlvasWH3Vwhs04Ve1C8DNcLz6sxJXrxenSghHujMi%2F%2FwnckBqgtIqfqTca1qiALgvzW85uTz33EmHsL1s9xcNDnktOtphRxCnj3RpIxg71QO9EvjqC5VRePitzuzVKy%2FdOcv&X-Amz-Signature=c229943d51c9e8391cc3dd6b55729821fad066df2286335f3c31060479a4a6b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SSTXX3Z%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHiD3jEEEB5p7G4tTgMi14%2Biq6HlIm4PFPVSPPp%2FkepzAiEAi3PZX7fBzgHlAX0LldUQoqtIlup9gqgqlHDWu84Ke%2B8qiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE%2FVst7W1K6xdbaIkyrcA9L6S9TKm88kVCb%2B0bM0NcB6vvK37%2BFDn%2BCzy5Q5vRemC5WGTYIPjqlGMRCQvCh3ng2vDu%2BSw4ZuBQDXHTJ5f9tZ%2Ffqbtvx7Bj9HjY71E5d4M1UZl9gL7747SxDwyWDoal7LrnEjBLsDb7O630b250k8BVBbpHWEDrHcFIRQOWhtVW4VgLzj7y8YIki%2B5IG4alWitkV%2BZwqJHQK9hEthiNFH7Xv4DtxR5pJTU4IyAYhIVLauLPLfTbSIPt4honzPtxziyvDG0ueKPkuNoop%2FARXZiey%2BOPIQpcfK3j2%2FfFQLo8CgRNT15ljg3zqyI9ogl3Ll81fzHJzc4FQYRGEtrUOkfFB3dcSLj53C7Varl6%2FVY43OlCmenA9NwrKmrAaAFtYmhhOA3kuJsvSa0P9mz5Mp41ojpzl%2Fw6MzsnnmhfmuwaAPj9fdlYUR9S6EYxE8simSHAo4mAyZnoZg%2Bu8NxIqcA7LrOrQRlBSDRUU4k5ZsD1SjU%2FNrsZpUTXXztLb8IBHfMBrgbZi6XP8nl9rirQ6Qz7mEa42l5KmhDQQiKkepYtbf64PCsT4XDalo11VevKlbltICjOpl9a%2FOnXF03uF5d50lvAbczQc3XUA6vl1Kp4a0Y43uvkScJ2NgMMbPy84GOqUBQKM1q3v1iAc4RQ%2BlHMU1cCBYreI0nY6iSpCV2nQHgwJBoeDcbaveE1E4qlFfjBo1LtkF%2BzAQoQwWjEk7P8s%2FJlA5GlvasWH3Vwhs04Ve1C8DNcLz6sxJXrxenSghHujMi%2F%2FwnckBqgtIqfqTca1qiALgvzW85uTz33EmHsL1s9xcNDnktOtphRxCnj3RpIxg71QO9EvjqC5VRePitzuzVKy%2FdOcv&X-Amz-Signature=c229943d51c9e8391cc3dd6b55729821fad066df2286335f3c31060479a4a6b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQLS6UWV%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG7EsVIMDeTi47mJTyTP1KZdFA9edHJkY7R1G33AEM1VAiEAkkQUn773wI7sV9dB5DZ3OB8MlZ%2Fri%2BYupj47v9T%2BHzwqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKZmSTxQZnG0m%2FD3eCrcA6r%2F9lKPWR08U5nGZfISDZBwLbAWuXvfeojTBmXV%2BZS5yj2yRK13wjCLj6%2BiAYVLauVfkjbG%2F6JYb4s8UnXavg3ceTZUlZBSTy3JAC98okpv9mQpeTQSlxka5blcrYVwDbQ6VRhuueE3I1touPkCD%2BIaKD9MJ54oGmwf7Qm4v4v8XG2EyxBgD6esyeGwiz3XkWMaZLVTB2K%2FFBTk7VsrQX1%2Fv9OL4yS8tuwCh8z4nm4Nx6v87E7OhQprtcz2uXbKebFtLnTCXjsPaQOgaiDiNWO%2FpBSgN3uoezXAv205mdwYatqyTZxJxVf8FB0Lsq0EPhIT%2BJ2BN6uSC98lilt2%2Bt5H8RMFjOQRDuVfF0ieVQf7Y3iC%2FoG1xD6bfMG0XFLkRd6e8150wmGRLAnYJdggphUvLrL3S0yPl56zC914U0a5AH44TF8zQucmSmDL0U0vUqOAzgBglIc5kdcMgjwxl90hppSDaIIHTM3xrgMYpcgEju%2F2JM3GrsEnQf212iKQAGLGD5d8Qkb3J5oAffOIK0gR1Qp7yhs5oqEafQ5u6zaeInGzKHrMJ2v402YBVQFfGpL429%2Fe9ju%2B2Kbrp2613%2BqZd0YgWLhXiPMZJP%2BJaQf3ZplsOMA6zjTKMdrvMN7Qy84GOqUBfn2v%2BV6bnJCAvGbi3VFBiEO7lm80l2diZS46TV7iez0A12wH59sFIzTEhXV47%2Bx8m4EeH1J3oT2QdI%2Bq2rt%2FxUSRFO9pqXmmZH3Kpn2SCEejmFyBY8chBuDcnrlT6POgDu%2FVDiNwazBKriE17qo7BrFPOJoufM61lyn0cr65Ef2uZBY1ofpzH1GNkt9%2BqX1uz4QCIT77lFDLY%2BMPkmgrex026T%2Fe&X-Amz-Signature=1923ba0c8d2432ca0c2d5f5a1664a216193eee33254aa6bf4ffdffdae6e3cd18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGNHHJMG%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDcmVjrDBdr2pHSX1Rf9%2BHIMc9HVVBxdrfh8F%2B5vC%2Fz5QIhAN4%2BZGZdkMx4fdZSR%2FCZGaJY0V7uOm5VCi6j37oTdLFgKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx4Hjd5Wcq0tB6ZPEEq3AMXm%2FAnG81I%2BnWbk6%2Bd31rln3Eed%2BHhCvr%2FF6opgd5jvTogyJCJ%2FJwp9AhSXkc1lgb9rWCzxVxki6O3e8hzjvR4pmkPW%2FxykSigFYvMQE2tgF5cVHuJMXGURQxkuAH14H9BGkS%2FYNwjLe%2BDYKctguhNQcGZf9rfUXH%2Fde2Mtpcuj2O0NUwbZ1ymSbPqK0kz1nv85PdLKVgJ61pnlvQPFh72GTZQMkujKG5nahkTgCfTkqc5MKGQ8eYpr8rO2OuBy6EzShZZjTCO6E9zU0u3KNPpS0YLnxCaOB6VL1VYbqWX9F0RBuAtsmukwnsyo6%2FwcqqM9G1GRg6K3U1UFxF6PTJc8TCLXijT5MzWxduwBCteUR1TdPLn2z6p%2F7oCABLb3s1W3qBZWIGchBInfQerEAOHZU5YCHmKlFVqXg2%2FSiSuU62IzOAypQ7bfBW6Em8MEXksZdcAuDsu%2B4gCXnvtkYJFt0cj85J37TuH3yZkANzFaIM6H3I4jEpNqVnu7pDbYKaOinXLgBk78yBmC8chtM0uhwu6fMq%2FInw0hTcUzyRZD6libgWpPK58K7iipSxr6L5RXfJe1ORqquezzLaHmmsY0BdEZOMWpE62m6Xcjn3xJ6FFPEmUmU5EWDU%2B1zDqz8vOBjqkAT4hzn5DXcPdD8ZyXVpkxuhj7yakmO3CL%2BjwudICY9ZqHB9FI2IRmU4%2BjLqqS4fOoSNTmuy0MtIvyhaSpiRxqm%2FqUUcI7QP1ItrYkfaFZSTQ%2F5cf7ZruIBvdrllXq30LcfXha6d2m5VLDBu4xfJZ93EFHPzR%2FlOWK0A7V17%2B%2Fvo0xohzd7fRYI6Zahs%2FypftlKeqHnOGPogzfnANVC4TxwIW%2BltV&X-Amz-Signature=8328e26ffb861603073bf4b08ddfe03e9334f608cd8132eb807f6b97b1a25530&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGNHHJMG%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDcmVjrDBdr2pHSX1Rf9%2BHIMc9HVVBxdrfh8F%2B5vC%2Fz5QIhAN4%2BZGZdkMx4fdZSR%2FCZGaJY0V7uOm5VCi6j37oTdLFgKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx4Hjd5Wcq0tB6ZPEEq3AMXm%2FAnG81I%2BnWbk6%2Bd31rln3Eed%2BHhCvr%2FF6opgd5jvTogyJCJ%2FJwp9AhSXkc1lgb9rWCzxVxki6O3e8hzjvR4pmkPW%2FxykSigFYvMQE2tgF5cVHuJMXGURQxkuAH14H9BGkS%2FYNwjLe%2BDYKctguhNQcGZf9rfUXH%2Fde2Mtpcuj2O0NUwbZ1ymSbPqK0kz1nv85PdLKVgJ61pnlvQPFh72GTZQMkujKG5nahkTgCfTkqc5MKGQ8eYpr8rO2OuBy6EzShZZjTCO6E9zU0u3KNPpS0YLnxCaOB6VL1VYbqWX9F0RBuAtsmukwnsyo6%2FwcqqM9G1GRg6K3U1UFxF6PTJc8TCLXijT5MzWxduwBCteUR1TdPLn2z6p%2F7oCABLb3s1W3qBZWIGchBInfQerEAOHZU5YCHmKlFVqXg2%2FSiSuU62IzOAypQ7bfBW6Em8MEXksZdcAuDsu%2B4gCXnvtkYJFt0cj85J37TuH3yZkANzFaIM6H3I4jEpNqVnu7pDbYKaOinXLgBk78yBmC8chtM0uhwu6fMq%2FInw0hTcUzyRZD6libgWpPK58K7iipSxr6L5RXfJe1ORqquezzLaHmmsY0BdEZOMWpE62m6Xcjn3xJ6FFPEmUmU5EWDU%2B1zDqz8vOBjqkAT4hzn5DXcPdD8ZyXVpkxuhj7yakmO3CL%2BjwudICY9ZqHB9FI2IRmU4%2BjLqqS4fOoSNTmuy0MtIvyhaSpiRxqm%2FqUUcI7QP1ItrYkfaFZSTQ%2F5cf7ZruIBvdrllXq30LcfXha6d2m5VLDBu4xfJZ93EFHPzR%2FlOWK0A7V17%2B%2Fvo0xohzd7fRYI6Zahs%2FypftlKeqHnOGPogzfnANVC4TxwIW%2BltV&X-Amz-Signature=58345a7f9c04314f84393bd46612452b3741db921300c07c5252a17ec0268fc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJIPKRDH%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAasbYO0OCtMSQgO3wBcig%2BYqYiqtAxGTAaiSnFIcYHkAiBwkpkHsV9Hdu2qbogdE%2Bs7hURulRdUF5%2FkADwNcgZ%2BIyqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1p7gdnLgQ348yRQmKtwD5SN3MCUavGP0aO0MpeXDgv%2BzdXnDFdDOfOCeW3rrnAxoXj%2FYnAXNPkdYkRj5mYbXGi6UV5h7z4RUMDnQpu6Lkhnm42oxk3XNUXDVEMbvXwGbh8u5VCCdIalkfrK%2B2nASEqQM4E4FaVlft99ybWS0dFO9iImCyRX8k15nPpN%2B%2Fb%2BcYGHZFBqLWzq%2FFOImQfAH6u2Z8sdg9Nku%2BoBQAKsw4IRJ606%2FtrgQ3pjpXJY0XITSeH%2BSMr2cyZGX7qVX8OLivx1L41WPxV32V6RceSzIAyFVhquX9KUzB%2BkH7CMMyoYmhgwQimUCHCXLLaTU7FZzb0P9i9ZWdMlyMhiGpUsaI%2BwFO5arrxz1IAdpb8KOFF6ZSqoKk4bORRZA6xPI7LbVlUdlUV46UyLz5gDQGcZ%2FQP3rMvp%2BkPhSK3fuXjI46XjquLU1CBvufuT%2FndsOlFM4hzhoySbqnIbPlakBPPLF4UbJ5rwXUu%2F7mKMQFMtZlv5c9c%2BDi8FMUETsZsaAUGdF%2BLmInQD1NnkIgZhj%2Fh9qAKhS8bBcfO3F%2F8eM5nKhzMyiGHkZa49zUYa6qeHhDru5MkiGJuoge8K%2BKep5hHA296FLW9LLoNjG925VNLqcZ6iAIJPJsb2CBEKn09kwus%2FLzgY6pgHvmRvdQDoiW65kRblWYP11tXTMp5sqoKed74inWM2nL80QlRlFxdRnwSOGRFFRUYMDb8ScK1YXiZK2uxj12d5pJxb93l3t9QgpMGYv0Q0Iv30bpIEMHcqChV2ZWh%2FPx6qn34qiWTbrzjLZKQWnyVAVh6qB3tTAPlD%2BZFsBjv%2FVR6BSeNNe2bTk3FigJT95mBZKNOAPQHbwAv%2F9VwTvOYvh5blntHIk&X-Amz-Signature=06fb126faa1fa8cb6f367dd8c4f763c45b5c37b6762c8585fdc31ab620c9a3c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEUTVGNW%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDYL9hwwEn3cB4W5kRHquZ0LkpNq11hjQDZD%2FXblle9uAiB0rFaba1IZxxtfrsAmNsobfV0my83xwukMkVasnbCljyqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIML%2FHpP%2B9dSiBpE%2BGOKtwDd2l4L0pcKNH6xOBc6tEK%2Fe0L2aRnOo%2BvtNlineutBp4NwY2%2BfiDcAeWNkyMSsxBmD%2BZMAMR9dAR6ULjCY6mROAWQUSRJ6659mLDL0f%2FQL4ioUTp%2B49E4Jhak8ydbMl6HUxyeErRWoXES0E1FwX91zPym9vLRpr%2FahAOvBj19tS4dslSIwSxvdazkFCjxBMAIfJ%2FxHPxBARnPEIV44mNOZ9IfUg6QMw1Qenaviald%2BNdJEeJDZtYakLy1oyLAmma1trVAviRvbDDJ9RjfeZU19WLbXyzOV%2FFad%2F557qdX8keT4wP%2BhE1Jq2kD6TYQmNF06ktYopqIgzMlwG7OXOT3RzvnPj2U9B9WJMyqFC%2BqdzW6kKh39AKVDfnfurlZocElxkQomMyYiZF%2BdySi4sKoCYNSfK8W5FVNLw%2BrenH9r9iiQgFTpkNQXx5WR8yYRE%2Fm%2Bf562%2B7bLdtDV%2BFwSCK4XveaqF5LwZiKcbjcGouHooDUFKeDmF9eQZvm8jxyhU6cTq6gBJ%2BsadBZias7y%2FOnjAKDpqiNnioC%2BGlusfKRvDDoTNjLu4zCCQskv3R5pEjBlPwWAUW%2BgEpFWzQ2nnPZzcsZWULwkiTcMhBL%2BMISp44k8HDsaFGIGRp4DDUwkdLLzgY6pgFVpl%2FOSNzhpzWWivfoeIEzaaXaZ8bzI0OCkpiLdpUQyvyxtcek9Vxkl7N0jjoT5UDJgcbFc3uf9IyatO0JUvJaiE8VoJQ2PQX8fWw5uXR1ZtFStWQ3RrkEADDIFliIgV7KXxsEqhpXMCpv1WWlVBK%2FCDKMPHxwAQ8K97HBY4j9I55TOrHxRx%2B02TjbG%2F12%2BlTUpurLc8snf7ciQWQEhLUvbyTbCHZm&X-Amz-Signature=3352187c13379893575122fd4bc2b772513b7f6fdff1c82b35e2ad6b70713b57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GEXGGJX%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD2L0xKxtgE%2FmUR%2F0lpv9qBoW4fQqK%2F5m6OqbQq6YajYQIhAOyr4r%2BGrViWqgq7%2FOPbCn%2F7TJhxU60iSUbf1%2BQND5svKogECMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgybmMzQUh%2BbHMDh0d4q3ANcOYkMFAgDALx0VkGvBmCWprHRUZkO7abAhVO6Klh06VG8MCWlORReG30htrDilwCwWiQxuRdXK0sc7xgI6HnhNo%2F7chidlXNGO91ma6iKS3jkAOqaeUScnGaIy9sc09PhNRIrsRXohs5W%2BoL4ojYQL661ws7XLLxgke%2BWq2TZCA6Gn8LLdI5peMAx%2BRdkLa7mEVnQZouDOqgHAH2wUWA02hsICWveCyVqB%2FYZ6lFZlBaIMHPqK8oamhpBut67TRBl3BPloeox%2B5LPS1Qd4JrpaMXCzyy1hk3sjF8fUQ7irDK%2Bg8MYKh1PsOHcTA%2Fvu%2BJXfaHsUE2dr8LFB0d13XHxaVqY%2FTltM%2BiASD7PZSq3wAqzEYtKW0TUhraQssroAqR4TQRYQsG2xxcpgo2%2BQwOLXCE1e%2Foe97V1jQ08yLzLXze9HwUrwpr5cZRYuXiaRUoPxVO8IhXVYcPP4CycDoZ%2F7A%2BuEeiMKQaXUUzNLsSjJZlgtO%2BpPpFzNduXudh3o7LZHHRh6q4QQMgLjk9el7NtEymdLMmvPco90xXwHv1acAu6QHRE3XExe7MwpTniC2eVK%2F6V7vzubFLKJgzAxC9yp2B%2FprYhtHu3fABnm2OKexK9ouBV6lC1Q0OjejCz0MvOBjqkAaFTRReZiMTt8OkI5JFSMXsx3cnULD06A4dYHwCMmk1xk03wxBB7lOnJs%2FWp%2FaX3uMtH486cZGTKK7mOZHUwPRznbnMYwS5q6BojMzwCDwBin6SnSXlVz68iwBvJYGOV6oTIgUGMAAxqN3yzAqLm3rj4%2BNvflI9ZHBP7P%2FBat33YyVWHXkM7w9%2FFnGlCZ0O7riDyGtujdcxCKTPtzRj%2BFoIVJPUP&X-Amz-Signature=9c6bf0338a9f50b043442ce717fca181a85ee37c15942f59822a2a5dc80e90af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBA7SLC7%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCUS6MZ1TmXXh%2BP8EX6KXTrrDqxGmL9YHQUN73N3saMCgIgGygRcZtZzTXpT039gPDuO6K2qt1dPjadBq%2FOwwv6OdIqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBuIyR%2B2s1ATwqYFmCrcA9jD7n5HK7%2FiyNPD%2Bo5hgrUXP6XCHiQaO3Ha8e%2F6L0fJ8zQOZwjeHML8wpfFYVZc1FCRmPeMfvuH7Gz6gC2%2FpwOlAojV2AvmKkBwdYi9f2DK%2B3S1DjFfqGd69rIlRlBAak8YNQboGWVfvrRUVrRYCmRqC1%2BayfB8gLoNpXDKzgrgu8wnYk5W%2FUPtYmfMxMtxj5PQoCCIKyFxf6XmOcY0CiFEhQWf85VZNhH%2BTnNIV7POx7rzgi6UXbRPbqpQzPYIgkEYIkEl5LK600v%2FjH3ecvmW0cRO0DckflNk8F252BneZogWxtySDr9b%2BrkgBYwx7EHFgzV8CR8gq7AiqMMAsVVMvrVlvhcmXwCFfbY3%2B7xBuMt29tqlLkZ%2FmauEJ85lgQFSAQUsHBTDvM0RBtZFM5j9cY%2BJWkIxoSu2ajWucwrWf6oVfPP5OI6asq9xzrliENLpdQNlTvlfJHkSxDuJGk0fXfYVMdBVxvB6URMtK789Uzs60qwufTuZ7u8fFyx0ihn9EtHbGzPk8tUTTStBC8FBYqz72TvR2rH32BVGiabSr2omCsZ0SNab6PbwSexVqdSXDCHLw8ZNMOtj0vhQO6pB5f7Aui%2BdiqYoRNI%2FLjwh3f2uyJ6jlxKB2rSiMIjQy84GOqUBtWsEfrrjpsJM3H3qEoMsEggJDcRjuXVlguFTJ%2FQV5EBWkvg5yxHSvUeFTQyGWAzfezKL%2B9RUqxpGsTPr%2BX6Gcdorskye1FjOlHaROSH%2FHqivBTXFqq4W%2BgjoeakZOuoEiXgh9GF3HoBx3bPFgXv5fcINK4DDZLJ2p4Uu9Yp5hymFfVKP4ffA17zRm4gS%2FN69bng71ozUmLk27Kp94uTsDVLWapMN&X-Amz-Signature=b0b388c387e2d73fd8e25500f62b9b20aef763f9258e61af1fb3dc4dabd336f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBA7SLC7%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCUS6MZ1TmXXh%2BP8EX6KXTrrDqxGmL9YHQUN73N3saMCgIgGygRcZtZzTXpT039gPDuO6K2qt1dPjadBq%2FOwwv6OdIqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBuIyR%2B2s1ATwqYFmCrcA9jD7n5HK7%2FiyNPD%2Bo5hgrUXP6XCHiQaO3Ha8e%2F6L0fJ8zQOZwjeHML8wpfFYVZc1FCRmPeMfvuH7Gz6gC2%2FpwOlAojV2AvmKkBwdYi9f2DK%2B3S1DjFfqGd69rIlRlBAak8YNQboGWVfvrRUVrRYCmRqC1%2BayfB8gLoNpXDKzgrgu8wnYk5W%2FUPtYmfMxMtxj5PQoCCIKyFxf6XmOcY0CiFEhQWf85VZNhH%2BTnNIV7POx7rzgi6UXbRPbqpQzPYIgkEYIkEl5LK600v%2FjH3ecvmW0cRO0DckflNk8F252BneZogWxtySDr9b%2BrkgBYwx7EHFgzV8CR8gq7AiqMMAsVVMvrVlvhcmXwCFfbY3%2B7xBuMt29tqlLkZ%2FmauEJ85lgQFSAQUsHBTDvM0RBtZFM5j9cY%2BJWkIxoSu2ajWucwrWf6oVfPP5OI6asq9xzrliENLpdQNlTvlfJHkSxDuJGk0fXfYVMdBVxvB6URMtK789Uzs60qwufTuZ7u8fFyx0ihn9EtHbGzPk8tUTTStBC8FBYqz72TvR2rH32BVGiabSr2omCsZ0SNab6PbwSexVqdSXDCHLw8ZNMOtj0vhQO6pB5f7Aui%2BdiqYoRNI%2FLjwh3f2uyJ6jlxKB2rSiMIjQy84GOqUBtWsEfrrjpsJM3H3qEoMsEggJDcRjuXVlguFTJ%2FQV5EBWkvg5yxHSvUeFTQyGWAzfezKL%2B9RUqxpGsTPr%2BX6Gcdorskye1FjOlHaROSH%2FHqivBTXFqq4W%2BgjoeakZOuoEiXgh9GF3HoBx3bPFgXv5fcINK4DDZLJ2p4Uu9Yp5hymFfVKP4ffA17zRm4gS%2FN69bng71ozUmLk27Kp94uTsDVLWapMN&X-Amz-Signature=76f17b28f0dea9f39746d3bc3814d7dcc5a6211691dabff7a89d0c7a3806ec56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHDIKHOR%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICM8dk4HYEq7pTGYCwU%2B4GExYFKEpy8MakytiHWenzaYAiBwHhTU8beBHpZsnKF0e94EqGAo9M6fccR7tsm%2FBDY37CqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9JFPdY0bEhsrKVFJKtwD43T0BwU%2BCCM5Dy25pNoNg5Sd4d2fB3d7Jes0QPlfU1VRVaFpOLNLGzjFuG56xpJ6%2FCjbYvjR7GUdBe8KOWZUl%2Fg4Yd5UxhofTdVwLaSl9rCgD5e4AR1ZOv8MVlen%2BEgn0NgiYNxBjmvkaQlZa2JAA5moYyE5D%2Bi3rUR630c9Xt0GzAgepre9VR4GCewVQXffbC8T%2FqCjSY8gX0eVGGwPXz1lKHe6Z0zaaK%2BL%2BKXxc1bC2csHglpmNnCXk64jTS1yv%2BLkSQQjf3vP8GvcvqJLWlzaHVuUfk583wmIj9pYnR65dWgnANz%2FlQKVNpo%2BplaoLVe8s%2BR9t%2Bim%2BTEDOrUOoH6GOtEvh3hP%2FfAy2S%2F%2FDjUKVxS2IzbI%2BNUTZht%2Be8v9QaCHyP7a9LlmAUcNgoYue2k52mF1Slg8Efn85ENNAdoS2cxIA0GEus3vpNEIW%2BgO%2BH%2FkkQGYuGM1ujRt7UzvrpP31XPozfv6gc0rMMhGJvlqxSlb2dtA%2B3JTLaJ4pps7tNjAoxxASgktR5wuy5cm26fsg8c8PaEA2FDwLCospIaZYGoP4iTOiHYNjUgdgzxkd95FGv02e22M%2FuY0pJkLsYy9ejACrVAt0MfejYap9ZH%2FvBPNCJsD3SrSjAAwxc%2FLzgY6pgGlaUKYDnw1Mt%2FbDS94I5Dulz4CHO%2FP%2Bs04%2Bs2TvcbCpIhu79BtoOrFZCbCC32tKLguRGtZOzMc7NdqXnJwJTfv%2BKhtifRffO%2FeCUma4wbTnEDdeUY0MjDWmSuDbJAlYb4gJT7nTGNzKtMiW5H8K%2F3OvYyPMeU2DgiEKexhlmUmJkKmO0a5A545Uf9tKIrnJB%2Fh7pYbAzHJZ6Cp%2FQf6s6oMWMKkav5c&X-Amz-Signature=8149753aa060d27c52db8a249f7e378b7c6d7fec10adbb41f2fe4400a35d53f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JYH2SGH%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE%2F2uWQXH48zhtuuzILH%2FFM%2FmF5JbM2gajY82ke4FdOeAiEAkArrf4s1kqGxcM40rjOFUbi8vgnAIF0dqzhbPphEi7wqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNY7l5ABSpfAVRUi4CrcA1aPpnoa2IOxDc10JU%2FZsLaY3MATnNFd04QejI%2FmdBAxs13DbSVINdBi6iWeNGS0nUHoGaFSKXYkNJEZTB1cBhKXOHGLIEVLusLNmz7nu1L0%2BOzIuD4ffwZWpC8kYoON5pqsIoNOCB%2FY9WwBIT%2F3afzZzNe4Xq2cKBkPIlKlLEJAGqtqaOZ8Hpn3JM3%2B95VKdbk0zlhBxSrgjRplydL0DxF%2FEs4twwkeBHwgKiIz7OZjBXEO8UYzAG97ORKYt0CpMSXOThHMouWwzWJCPRmlxmOJf0eDX4%2FypEODa7U%2BfDyKhlnr%2BZJs1Y6men0gc21nc59AlIxZ%2Bj6UAwEczHVlGU0a42iatAKhMSHUrhBBPw74BWnyOg9mN9oRQ%2FJJYyO1yDd1V4aYzNLyJw3oTM%2BNqeTF%2FgB%2BsHoAFJqmICOouQ6AzU2nAhfBPbtWhGcf%2FRP19jU7jcWEGQjBIfs7SvPY2TvKOctj4awiXZuzqJzZ9k1%2Ftb9LrpR0gwGMMT40cEJe%2B%2BNvxTFf7OV8IfbWF4LHYuoix0%2FSd%2BUqeNyvoIGhFCriHrNXgC1uW1nTiW3YHkmcN1tw1sWytrHdcq1AVu6et%2BnygBZixMdC11bOs869qJ5arjyg%2BaB99sDgzX%2BiMKfSy84GOqUBO7eZ35mrX%2FKMdJ3LLXhtQoDv846romu%2Bl%2BLfn92auHQpjWSbaCBR2hcG7SiDfduWXPINW%2BmpycIK0z%2BZrY8fGCU8cICrYqEnZuth5ViUjtnyg0f%2B4BGICdo68DOlp9wSUb0iFQdUe4vxeGZvav90SvkY58QaUK1I68zpwM%2BKnKJ%2B86Cb6CTtqmTcy%2BhDDqeWCuLjWFwLgb6zoysI%2FBOjEqyv3E74&X-Amz-Signature=4da27d34fa714ecd640f9dd71a87ebcb27b63e9af1d9dcc6a14246afd70c582f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JYH2SGH%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE%2F2uWQXH48zhtuuzILH%2FFM%2FmF5JbM2gajY82ke4FdOeAiEAkArrf4s1kqGxcM40rjOFUbi8vgnAIF0dqzhbPphEi7wqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNY7l5ABSpfAVRUi4CrcA1aPpnoa2IOxDc10JU%2FZsLaY3MATnNFd04QejI%2FmdBAxs13DbSVINdBi6iWeNGS0nUHoGaFSKXYkNJEZTB1cBhKXOHGLIEVLusLNmz7nu1L0%2BOzIuD4ffwZWpC8kYoON5pqsIoNOCB%2FY9WwBIT%2F3afzZzNe4Xq2cKBkPIlKlLEJAGqtqaOZ8Hpn3JM3%2B95VKdbk0zlhBxSrgjRplydL0DxF%2FEs4twwkeBHwgKiIz7OZjBXEO8UYzAG97ORKYt0CpMSXOThHMouWwzWJCPRmlxmOJf0eDX4%2FypEODa7U%2BfDyKhlnr%2BZJs1Y6men0gc21nc59AlIxZ%2Bj6UAwEczHVlGU0a42iatAKhMSHUrhBBPw74BWnyOg9mN9oRQ%2FJJYyO1yDd1V4aYzNLyJw3oTM%2BNqeTF%2FgB%2BsHoAFJqmICOouQ6AzU2nAhfBPbtWhGcf%2FRP19jU7jcWEGQjBIfs7SvPY2TvKOctj4awiXZuzqJzZ9k1%2Ftb9LrpR0gwGMMT40cEJe%2B%2BNvxTFf7OV8IfbWF4LHYuoix0%2FSd%2BUqeNyvoIGhFCriHrNXgC1uW1nTiW3YHkmcN1tw1sWytrHdcq1AVu6et%2BnygBZixMdC11bOs869qJ5arjyg%2BaB99sDgzX%2BiMKfSy84GOqUBO7eZ35mrX%2FKMdJ3LLXhtQoDv846romu%2Bl%2BLfn92auHQpjWSbaCBR2hcG7SiDfduWXPINW%2BmpycIK0z%2BZrY8fGCU8cICrYqEnZuth5ViUjtnyg0f%2B4BGICdo68DOlp9wSUb0iFQdUe4vxeGZvav90SvkY58QaUK1I68zpwM%2BKnKJ%2B86Cb6CTtqmTcy%2BhDDqeWCuLjWFwLgb6zoysI%2FBOjEqyv3E74&X-Amz-Signature=4da27d34fa714ecd640f9dd71a87ebcb27b63e9af1d9dcc6a14246afd70c582f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466324GISJ4%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T232108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICfaTMkFoVAPys%2FHvUTcgb9tyLHyGj5BdHh0ct2TNsIFAiBapOvuf4EPQ8paTvl9R9NkM3ueS6LzGTM4A3HocrIYoyqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuZgoJVA%2FPjC0PEKGKtwDsKsWdIMgcm7S5gyBu1pjo4uXTDqm8njeDBA7hoKLVNw2lLc3XG9%2B%2FmKdIueRS1yOTKkJTNlu3HbhbVWelchBXnBdgXUY4%2Bvt6VX1rpNd2gGEfOsVUCPj%2BPQr4IbgVf3nf1rvbwYzTwdzYh4ttDeF54yDBFkpG2x84rR7fa5c1sol561JhMENTpJsHwMyC2eR0T7UiWoyFj9Bd8Hwm9OXjleOnuMJKLSsiEKmaYUx7VWm%2BpYHvUZxJ6XlvAoGiyf8hG8dct0MX%2B8pGpfpacknEz9gQ2GMMabR70ipZsPYvoCIEV5EJr7BbBas%2BrexBYC2hkYISxSytlwVhfCeJoS%2Bv4zNW6awGVKBQ7h2q7MfcKv4Ke089ENi0O%2Bya%2Bs5JOL%2FsQZ3nDRCA1sInw1%2Br1y3iNJlTPRrKdyAZ2yW39QCK2Zna98px6XY8WNRl5A99fbd9tbU05zAErksgTsyWvjzThSZvnNLf3vhC6jfEj5mszxF1ZpbnNE4wlS7qmoKrXgzguum9nRG2%2Bs2z9JwH6yr9kLun07k%2FgkWGOS3qw%2FssP6sAG1ZSBoT1aTOKQCPQAACxtf8WTfSCvuFNzhYDDcr2jSkRmNK26XYWruVPwcXJPtAWRmT10In8%2BTFolEw%2F9HLzgY6pgF5D7ybCu2IRQ17DJzI7MIIQumS7zxqyn62un8PE6TtqRQxOWECFyvYYWo6yO%2F4Aq%2BzxnvGiC4E1SG8MQV8Rb7sFGoDc0nLIi9CXbm1yyAkL7LqlSx%2B1a6igSi2QW7ROUfUJ%2BmXgEUNTtw6vnwKiBRhDV4%2BYD0R%2BB20pa4IOjxMNq7VNVTEzktks0tyuSrlU%2FSmwhJbHO0iOHWyhVxiwPztBnqs6dfZ&X-Amz-Signature=aa45c619de0367c83d365542bafe9e6db3e908218830a93f553d4d13c342f510&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

