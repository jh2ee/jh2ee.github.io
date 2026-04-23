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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFDSBMZJ%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdCrAO0HWJrfkhA9ozRWQTOdO1otCk24dtOkM348R%2FGgIgc3qtWBpCAQyycT0pRn7M%2FJg%2FJ%2B2g58wWdrcpAUPYN%2BEq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDLkTFOEQeO3BIx1qRCrcAwmMpVujEZ01HSQkiD5B98RRstS6phJxSCc0WL8UXCvJdQTq515yjPiInt7hMcujKW4QhHr%2FOK9Pw1oGFrrlQwN4YBczgWdx95ix7Hx%2BLvEf1rdnlE%2FmvZMGIRRcmBJyr68kRd2sCO51Ou8X2LnRf2LSYFmwfD%2BtcoT1khafr0j9XycibL0NtwS5cnLHLupgXrA2Q%2BehTANJ5M1NlYn2us8X%2BJVEDDXgJgwWSZzJtHZXNkzgEz%2FHjE5X9LyQJ46ob%2BPhRX8%2FuTyC2njLEiANnWGcqKKsGSX6djmW9rSWNiR9%2FwOq8D8Deb%2BXdCYV%2FaYgokG7%2BTzEmqTA%2FqQ0Pivyzwu1nrVG0XlEZ8qkiHwwcy%2FfAX5VGDTV0koxRv19604E4x9Q3YmgINPm978T46VrrdP%2FQi5AdOF9D1LDASB3RuCDFYIDyLcmJWoaXd0%2Fll55QtYCwW8MUbMPn35ZlSwAxstoApkZwTxkbGar%2BDuoY1%2ByJxbqgd3GGsS%2BomVg5dN6gayVlCHmswH3P0xpFeCNsuN8gmdfDdMcDSLMAAv%2B%2BsAaZbR0riT25btUUbtEQfQF4h0Wam%2BPxKR8aRDH2CBy%2FH0HYpzrphXjD2oMltXWYvvAwdUk2aS36%2B%2FLnB85MOPwps8GOqUBMp1KXbNhUqe%2BhYmhfnaQL94t1oDT6%2BV9MESZpLo9RFyn%2BV7tFY1OQFpWQZz3HPCxQbaioKy77CTIRrVwkWR66Eb4krhwDWXHpbR1M%2BtPorJjAd73Zv8c5xGVne6%2BywG%2B%2FUNjO0sPyZy97RjnyQ9uj%2B8pLKL%2BtUCJ%2FjTZ4x%2B3dxbp%2FZpewYClB%2BVjH1q3ziXd9YbGOK6c4jQHkxlTSwuBqOUxItgY&X-Amz-Signature=50213df5bd3907d9c66514df9ef8be9630126667173dc4b4d9bb80d320de5db3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFDSBMZJ%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdCrAO0HWJrfkhA9ozRWQTOdO1otCk24dtOkM348R%2FGgIgc3qtWBpCAQyycT0pRn7M%2FJg%2FJ%2B2g58wWdrcpAUPYN%2BEq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDLkTFOEQeO3BIx1qRCrcAwmMpVujEZ01HSQkiD5B98RRstS6phJxSCc0WL8UXCvJdQTq515yjPiInt7hMcujKW4QhHr%2FOK9Pw1oGFrrlQwN4YBczgWdx95ix7Hx%2BLvEf1rdnlE%2FmvZMGIRRcmBJyr68kRd2sCO51Ou8X2LnRf2LSYFmwfD%2BtcoT1khafr0j9XycibL0NtwS5cnLHLupgXrA2Q%2BehTANJ5M1NlYn2us8X%2BJVEDDXgJgwWSZzJtHZXNkzgEz%2FHjE5X9LyQJ46ob%2BPhRX8%2FuTyC2njLEiANnWGcqKKsGSX6djmW9rSWNiR9%2FwOq8D8Deb%2BXdCYV%2FaYgokG7%2BTzEmqTA%2FqQ0Pivyzwu1nrVG0XlEZ8qkiHwwcy%2FfAX5VGDTV0koxRv19604E4x9Q3YmgINPm978T46VrrdP%2FQi5AdOF9D1LDASB3RuCDFYIDyLcmJWoaXd0%2Fll55QtYCwW8MUbMPn35ZlSwAxstoApkZwTxkbGar%2BDuoY1%2ByJxbqgd3GGsS%2BomVg5dN6gayVlCHmswH3P0xpFeCNsuN8gmdfDdMcDSLMAAv%2B%2BsAaZbR0riT25btUUbtEQfQF4h0Wam%2BPxKR8aRDH2CBy%2FH0HYpzrphXjD2oMltXWYvvAwdUk2aS36%2B%2FLnB85MOPwps8GOqUBMp1KXbNhUqe%2BhYmhfnaQL94t1oDT6%2BV9MESZpLo9RFyn%2BV7tFY1OQFpWQZz3HPCxQbaioKy77CTIRrVwkWR66Eb4krhwDWXHpbR1M%2BtPorJjAd73Zv8c5xGVne6%2BywG%2B%2FUNjO0sPyZy97RjnyQ9uj%2B8pLKL%2BtUCJ%2FjTZ4x%2B3dxbp%2FZpewYClB%2BVjH1q3ziXd9YbGOK6c4jQHkxlTSwuBqOUxItgY&X-Amz-Signature=50213df5bd3907d9c66514df9ef8be9630126667173dc4b4d9bb80d320de5db3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ELRB3BS%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHw6dOBEYxmGRj4lXUkCq9qQt5vGD8CIOkHMPXz7Di%2BtAiEAkFUprBp%2FAwlgQmyHJwjb4X%2FPlFosWpGQtpiaam%2BdVRUq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDO%2BIKX6O2X2%2F%2B1fRfyrcA4Vg6w7YPAgcCrQyqsTEPMZsp1b2yFPySa%2BRX%2Bfn6%2Fr2GfR%2BYUvjYtByCAJfV52ClXbD6aEMM5W1093OcgNJeGO%2FSaLOB%2FJ7tZ0ykzPqZPhQJUNsAsX5pYxsUsQ3GlyBOmel4rfx2KO33Hy%2FLSoxZuiPJfSb1gXbK5oCbuT1onOLT6rgcxkat%2BMhZzU3UgaF8dg3BCoBpzTcQ580IlWqNQgdQZCNUjaG2gfksSleCL918tHsj8xEwjsWlkv2v2zAk9DaG1CEpItf5yaOYErU7Q3h%2BNRKG7w4d8fEyPCNu2A6MAceh7%2FSvz5fJnexagsY%2FTIr65lc67dxcuLvbA7m16Cylji448h%2FjnxN%2FfVs9m82f9JPmqd4pjXe6MixDMRFuu79KRJ%2FOGrDPCDYSNLWzfu984Y524bX5cDurxxGT02Unsw8Q0Nrp09ZcTtP6lL3owSHV7k7QTPjE%2FXxM7LEVMGZy%2BUSuAQPE775hMBtafiQ3DHRBBir%2BGclwhaSrqnA46vljLE4evcRlNIEIx6Iy80wfH%2BSaRk%2FA5VPv3PnFZCRnavy%2BtHW7d%2BGD3NaoTOfslgjpRJDtKIEdjDehT9VsTAF1PCLcjkUhH2YR9GVhOtJZ2bVQ9nYZz0SSjm1MPnwps8GOqUB6ZszPu9MSkKs3JVnTdEXaltsOcrYvhDqBqmx%2BfDMWgO5PujgN6uFgJLxHiRsa4AyOs1MR0eqowbmCCgHh9BbWIS1HB%2Bgn%2FW0xOohyK%2BCnS9xjKW6JiCAapRgVb6xPKgCUUmecft3q5NqlO0y0XCVbQ76DsapJwfCaU5pURti8xtw5OPAT%2F%2FWSRWu45BQYA3rgR3mvQ2GExYqwSm6Hk7HRYn5yQef&X-Amz-Signature=5748afb68d35e5fc79b9474eceed550297f04053b17ff27f425fab6560fe12f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZO7JUC5%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC1eBCTUH591IPJxk%2FSqwzq8irY1yNsYi7rOmM4ZDCsywIhAP8Mzo9xYeqBlRrRp4CN2Yoy%2BYlJYUm9nfqME1IXs4UZKv8DCF8QABoMNjM3NDIzMTgzODA1IgykhcuSCK2eDf3jCgMq3AO0hvshYaBD5Aqf6%2FRxZ1zXNpKOL%2F77FSGK8AsRLjklT%2FGpvAPtC0vyx5tiSQ%2FvLAZfbfrePo5YkEBOK%2FMvbkIwXc%2Fjw3hotB%2B%2BBsYhTKFTlSj51P734x229ng%2FLNYTcKX%2FawOOdyiw1Voao1Ak35ZDFlxBOMbcZ6dBKVJGuXqZaBy31cwIM3a7lgL1vMm5IzMhVyFIQXOUytVfeXixnNINezR5CA1UHHPg68YxOVL9758BTMjcBF%2BMGTnRev0HjHR%2FzqjiR8Ot2Fph6We7apiBCRJS2IE3fh1H%2Fo01tCZH%2FW%2Bgt8BCGa6i3844wrsbMYDr3cvOeuLOYogO5patxhY39ql8v03eJX5FfjwjPR5ioLh2To%2FpUdZcR0lZ0FwJy07sqI%2B9KXo7oXno6D3vZoFzHEeTQpDcMsyy3KVVb%2F4KO6I6%2FOmdsfOE%2B5ks2u7N%2Bl34Pgk1oNM84RyruEKt8F9yLXr4JFvF%2FHFWyZI%2BpO0PW5%2BFp25SnFUcUZLgUk8ZoID6n9nCpqWNKyG4m5fWw9jbqNHsQyVlMaiXSxl7YJp455x4QJvg4DAG%2Fd23FnzMIGJj26FsPW4UhhQzRB4uBDME4Hpwv4vMi67%2FwdjNRco5xT%2BegJfdH3RynfyyjzCN86bPBjqkAQCcIZPg%2B1EANrgu1yN0bbapwaH5IXR53W698mOKE1dJtAMvXJ4AGQSLlTSrLDjjDmxAWSvFCKiK6t0wFI8vlejksYKy5vAzohgld27Hdo5Yq3Wb4Xq%2F1wbIJQTqU3RBLtPsGFkfpN4SAh0kA6QQbU36uNP%2FzFKllvd7qbdP%2FaAsX7oW5WC2KTO6VZ2Nev%2BseobEtXdTc%2FAcS97PE3T52Ve%2Bylvt&X-Amz-Signature=ea5c323f0585fa5be08d3b4da37aec96e933b3145cade5f97b4b7e914c5b0746&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZO7JUC5%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC1eBCTUH591IPJxk%2FSqwzq8irY1yNsYi7rOmM4ZDCsywIhAP8Mzo9xYeqBlRrRp4CN2Yoy%2BYlJYUm9nfqME1IXs4UZKv8DCF8QABoMNjM3NDIzMTgzODA1IgykhcuSCK2eDf3jCgMq3AO0hvshYaBD5Aqf6%2FRxZ1zXNpKOL%2F77FSGK8AsRLjklT%2FGpvAPtC0vyx5tiSQ%2FvLAZfbfrePo5YkEBOK%2FMvbkIwXc%2Fjw3hotB%2B%2BBsYhTKFTlSj51P734x229ng%2FLNYTcKX%2FawOOdyiw1Voao1Ak35ZDFlxBOMbcZ6dBKVJGuXqZaBy31cwIM3a7lgL1vMm5IzMhVyFIQXOUytVfeXixnNINezR5CA1UHHPg68YxOVL9758BTMjcBF%2BMGTnRev0HjHR%2FzqjiR8Ot2Fph6We7apiBCRJS2IE3fh1H%2Fo01tCZH%2FW%2Bgt8BCGa6i3844wrsbMYDr3cvOeuLOYogO5patxhY39ql8v03eJX5FfjwjPR5ioLh2To%2FpUdZcR0lZ0FwJy07sqI%2B9KXo7oXno6D3vZoFzHEeTQpDcMsyy3KVVb%2F4KO6I6%2FOmdsfOE%2B5ks2u7N%2Bl34Pgk1oNM84RyruEKt8F9yLXr4JFvF%2FHFWyZI%2BpO0PW5%2BFp25SnFUcUZLgUk8ZoID6n9nCpqWNKyG4m5fWw9jbqNHsQyVlMaiXSxl7YJp455x4QJvg4DAG%2Fd23FnzMIGJj26FsPW4UhhQzRB4uBDME4Hpwv4vMi67%2FwdjNRco5xT%2BegJfdH3RynfyyjzCN86bPBjqkAQCcIZPg%2B1EANrgu1yN0bbapwaH5IXR53W698mOKE1dJtAMvXJ4AGQSLlTSrLDjjDmxAWSvFCKiK6t0wFI8vlejksYKy5vAzohgld27Hdo5Yq3Wb4Xq%2F1wbIJQTqU3RBLtPsGFkfpN4SAh0kA6QQbU36uNP%2FzFKllvd7qbdP%2FaAsX7oW5WC2KTO6VZ2Nev%2BseobEtXdTc%2FAcS97PE3T52Ve%2Bylvt&X-Amz-Signature=d8ccc5646661c21f6f6d786659e334776ee08e76be888e4b60c1f042d7736e34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7G56UJF%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYkkBIkHS8UqUpREJtvdnDTHaYsGOjikf3TVkB6D78SQIgQi1AVb5zFU34UE3%2FMmNCG9wlEEhUTfBa5%2FGBeDWaBLwq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDL%2FZQR5VmRxHGKQM0ircA5ytFPzVBcAuF6Pu1tNVDbvuIq1ZCbCpqRbRAit3N%2F1xyMoPidg33GhJAmJyTgy7AYXkNlkudwROa3%2FsLkEpmTCPjLwqb4XbA8QafEZ4Vb4svcSChOvnrOsitFJcsTM%2BDoBbaTgo4VVYKgjYRpIo5nu2VROCMuF6m%2F3or%2Bf5i7T4IuqaOY6MfJHptsu%2B%2FUa4d0q5F%2FyAbHZJiixejbhv4ILi5DRdhYStQV%2FbsWVhyEFO2w5b7DyR1%2BJFaPGIfsM5jEURG5ISLrnrnn1fBwA0b%2BSnE%2BdNUBEVHn4XG%2B5qD10IANjCYBrC21v%2Fg77A3g%2FU4cb5px5m6Bv7CyriL6q7y2yWAf85EuL5vfVwwywtEaxgLeL9XAkMVLlU9mTFa%2BglkbBFSDozRBvB%2B2ycsBTi7gmLlSCkRV2oofhpoVEPpnaVrVRDUGUqZjcLPpQ78C3RXsGleUxwW4QztYNrgBR%2FbpXP7FVq6cToG9YJ0TEqpfsDuEK1zKKnXc5o%2FxbmlK0AfOP1luLLM2JHhoWNgqXc7A5R9kHEIg7I6kdGP%2BlJzolgkiuwhWmrTtwPzomnw%2FmeUzSI3bdiyycL3wEQTQ8e9%2FjAMBWRLZssYqlEIeH%2Bzr36OPSowagfm%2FR7BdH9ML7zps8GOqUB%2F5nTbYq796KabRHYHaz1uZ5lV7UO%2FpFz7TmYBJLH3A4MlAhVLhyIqgRkWQP8RoexnV3x74PKZoE0PUR0Ef9zJ1TFIkNBYttqcz4%2FOV9Brzt6jZMfHnx1azoDkl5gnm99Yq3OBZkHTGHj%2BIbqlq0rvy54b7wpz5IYcD%2BqTp51F0ud5XfwHFkcuVnz4aX5kX2ChQfAp3MTcmjasd08yDHCiG1UJvh3&X-Amz-Signature=13b7d13dd2b059a317e4cd8042347955cd0ce250330aab94dd2e4956627f97c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHHW6OM6%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoK7oq1wpIAneSxCs%2FXDpdZP%2Bme7Iz0j7nADNcMM%2B1rgIgDyIq%2BeOxSs%2FuU7C9A5Ng95M1nmomLV5q8JiosoVrGjwq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDMK4QM9rC7yX6cVbiircA%2BXRyx1LYykegN0P%2BMBpwp1LWucSNBMN9MlbbJCTD0%2B8MqtyoCIjKohoeIrUBWn23U4AfEsPn4wri%2BxyaSw8IKTHYegoT5jNAqvapoVJ8nR980NHVdnCKBh2Zh29vk6%2Bd8%2BtlP36ou2JogBuLxZ%2FvsKHNuO2PuSaI%2Fr38UJmLy6d8ipx5rvghxnkvMxjEmjpBS39IaCHXNQdDVf1WGN0%2F7VwCek3reTHab136SV7HWprIxp0G707QKf9r0KARMB0LoneLHGTAom2Kr7E4bi%2FTNBL%2FLJVjsK%2F9U2j0N93rYO%2B5%2F9tUj%2BJQsqCoMS8ao0WmilD4Ax5hviq3AgHRehY6WexsJQlUyUcTfvzj2dUs6MXlcrGRTqIlsSP%2FdObusqIaJIIJQdJLTfXHdUQ%2FGcw9ERImmRyBZdzcpKjGAv2NtFiEX9nEUDHZxHoe3xOa6oUZnuTumhNAGatKn3X6ddRZS2SZ%2B7wnLwthP2uuTrCAD4u1J8PYygAX%2BGUGAVGvdOOG4lct17MpgbsYZYopZYl1CYQCUxj8EWegGyoId0MvPdPmnk6%2B15Qcm%2B8ToLF0diUtle39nE%2Frl7XfdNz47K5nVaLMbTr7xPUMHRd%2FiH9gGi9fY8G2es413MkhR%2F6MM7xps8GOqUBcQKbf2oOmICvuwQd2b%2FkLGSgmhHPE1IsdJhGzn4v%2BsoBPwLYMK73umWr%2FGi3TfP%2BROpfiI6%2Bczfs7hwBZg%2B1wzGnJry1ckiaeCD9RytCWFY9yhTuV7z%2FlOo8ZZoASujTFXde5%2FTS9AEiOAD8f9m7HZGhWGfIEcniNdWBSI1OvyPVnqIeHtTiGPb9GtylQ9rfbxgylbdPnhegmCilD%2F%2B7j3AmP1JD&X-Amz-Signature=787231ea3bfcdff4319bee5dce2bc5b3bc6cbd5fc895448d096b1e0be6173b44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TGJ7CRW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEgOFKGGmAK4O%2B8Uk7CIVbSLKKmSMnDYFotOIM4c0ksnAiA%2BhNmn8YQewX0yOzTr7LK4%2BG5iTmp4tq2%2FcsAo3gfPbSr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIMLZvDFOYCKxLff9zsKtwD4vJsBM%2F750%2BnAbu3XHUYDyWZBU4vWxPMAr2LHNIzeyzL5ZJEzGAZioEc3Oy0Q4%2BMF9st8XKy%2FR2bMazgG4AewN4KItVlwqq1%2F74yCA%2FAt%2Bz9ahfyRdnu0Qb37hSNyvJF6aB%2BWDOjOOXR6B%2FR6yI2O6lTkQPKVUtkmOnPPI%2FcZqJD9K%2Fale1gODLYjyOoWfgA0RCcLq6K53hzsULZs0PBwv6lsZLxQPsjotJKJC4tiFPLpYTMZNcN2kCox4VWZ9ajqLSyIgtegOo8X7klenK48hSQ0t3rMh7EAj4by%2B9OHy8YOgsUuK71kxQEM9lMb2rTmJbEfnZzuDSFb6V%2B5jBqlo0DA7AWH5rqtcVE6VfVbQXLq01wzMl%2BhlH7BBR4iA3o6cp4fppnY%2BIeyR9XbbJ%2BO%2BblrGPfeO%2FnQA8ex487Ixs%2BkKt86jzXcZnqqZKkaWiwijS%2BWtFRw177xy0gYsiEMh35GHCeucLl5sS%2Bg5Rb5eH1GMJ%2B%2Fk%2Fb9qJzm%2FYzNNRzW%2BAKAg5uqkauCiYJraeQ%2FqiZ090I0UGY5DdqbN%2FwUGst5osj62mgi2jrD9eG85VsbRDJgCw2rv7V%2F5jcbTqqHoMfTi7Lo3A0JzmHzC5DHJq610juoP8Qzv7s0cwwyvKmzwY6pgEP92fsGErDhysF2xjgzC%2B01OY4cct4utf1RuhqD%2F694Zz9GyIXPUMhqh2%2FBLy5aVXY5CE5hVwPI%2BkPfEKJXEwUGUQPcADEulVxFkYv1TBM0BTDds1EjSpGZZVkj858uPh9N6eh2icU1V2x9K61cGS0j8nRmxTOulEqVugIXnb6Nk5FEM6UVmxuPE8FQsMsVgaz8O0EF9idbg7t4oP1vptmhAoXwFp2&X-Amz-Signature=5f49382705521665c21c692bc8e0915a19ab0a1993591b4d651e086a6f34f691&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664S7GKUKW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBowFPp%2FoCWUL%2BjkuZW1YGg%2BSkMu%2BoNGFWOFaBMDGSlwAiEAmQ5NEri%2B7UF3U%2F6FJzS1pGZbYzq%2FCVRq%2BhCPpjgthFIq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDL7GuGTcHPLsOuI8ISrcAz0lt34J6uhmeFLguagf9nr%2Fy0y65zF2HJUAqtvmKKwe4qEkMpaw5QLUbKQkncGe8P05k9m5pDCQ3OPzDLq3ZRlz0bCwgsoWKpl%2By1xqZrr%2Fl58ao3lAT20Nrbnm4UwwcHfOB6D7T0awmlT33qANcPRvz3X679Q7fTrBsNsD7%2BnwfeuDakd7XWAUNpeUBr9oyq%2FDZL%2FHz4q6HbEjLdahfcOGJE3pxl%2B9kVTHfWX8HW2QsjqR5htVY%2BfPTHT6tC4m4vdCStexhizrUQiyhOI0vQea6Y5RlYZuKXAXqRecfbJVrpjB4eoEjXI5c9b6l5OXPiEGG8EwxuiW98hGWlmXnfGCfeKrw1ob7PB1j%2B9SzNV3VRwRpn1crd2ZRO%2B1g0nO71OnTRAD2Z0WL53cnMqHpgHta5Ftl2OBVXoFD11DKSSRMvYzP1oX%2BcSiResAxL3HzX2HCZ2md8e8j4r0IEgGJlJDS0Jo8y9LTfrsk%2BdS9l2xtnmjqwNQIxs2pk4GAqnM25aHSfFF%2BnBMD09rIlpqsxrTue36hB3fcPGP%2FgLNcU2zwSZ748w%2FzobQ3zjybI9X5eB9AUQk1H7MWhtI%2B442q23YmrBSjkRjnPps3l5pc1QXZdhqePAjCm%2BSN%2Bl7MJrxps8GOqUB6bM3bfKhzA9PGq0LSTLX%2BMWlTik61XpJFWvu4%2F5M24xpu6dENbiSAqLWi%2FIPKJofCRLzR1DQRj1uPwDbcBRlsekjp1Zjwp1pj4E0Dy0W6UPshOZxBfq5Qt8rJMVgyMJZyylJ0nRIkZx3LnmNTOcWyZBcpNpHIYzWByFUJTMXcnMipIXBH2Rdkc%2BcsjzqoU%2Fg%2BlSFGdYvNROYVpiuGWP3xxGafPGo&X-Amz-Signature=3578e02b93c5f86903a8a4b9bba0ef6a763e1c77a82a708383af39d2e7421168&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664S7GKUKW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBowFPp%2FoCWUL%2BjkuZW1YGg%2BSkMu%2BoNGFWOFaBMDGSlwAiEAmQ5NEri%2B7UF3U%2F6FJzS1pGZbYzq%2FCVRq%2BhCPpjgthFIq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDL7GuGTcHPLsOuI8ISrcAz0lt34J6uhmeFLguagf9nr%2Fy0y65zF2HJUAqtvmKKwe4qEkMpaw5QLUbKQkncGe8P05k9m5pDCQ3OPzDLq3ZRlz0bCwgsoWKpl%2By1xqZrr%2Fl58ao3lAT20Nrbnm4UwwcHfOB6D7T0awmlT33qANcPRvz3X679Q7fTrBsNsD7%2BnwfeuDakd7XWAUNpeUBr9oyq%2FDZL%2FHz4q6HbEjLdahfcOGJE3pxl%2B9kVTHfWX8HW2QsjqR5htVY%2BfPTHT6tC4m4vdCStexhizrUQiyhOI0vQea6Y5RlYZuKXAXqRecfbJVrpjB4eoEjXI5c9b6l5OXPiEGG8EwxuiW98hGWlmXnfGCfeKrw1ob7PB1j%2B9SzNV3VRwRpn1crd2ZRO%2B1g0nO71OnTRAD2Z0WL53cnMqHpgHta5Ftl2OBVXoFD11DKSSRMvYzP1oX%2BcSiResAxL3HzX2HCZ2md8e8j4r0IEgGJlJDS0Jo8y9LTfrsk%2BdS9l2xtnmjqwNQIxs2pk4GAqnM25aHSfFF%2BnBMD09rIlpqsxrTue36hB3fcPGP%2FgLNcU2zwSZ748w%2FzobQ3zjybI9X5eB9AUQk1H7MWhtI%2B442q23YmrBSjkRjnPps3l5pc1QXZdhqePAjCm%2BSN%2Bl7MJrxps8GOqUB6bM3bfKhzA9PGq0LSTLX%2BMWlTik61XpJFWvu4%2F5M24xpu6dENbiSAqLWi%2FIPKJofCRLzR1DQRj1uPwDbcBRlsekjp1Zjwp1pj4E0Dy0W6UPshOZxBfq5Qt8rJMVgyMJZyylJ0nRIkZx3LnmNTOcWyZBcpNpHIYzWByFUJTMXcnMipIXBH2Rdkc%2BcsjzqoU%2Fg%2BlSFGdYvNROYVpiuGWP3xxGafPGo&X-Amz-Signature=d9b9a7021c124746410346f2b565ed946969425ac0d5e460e5c78dbf9bb6c6e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VB25WUB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFOZPHRiSdVS3UowbcuYgRshB1hiINGLRT1vqkMB3OL6AiEAid2j6xBsXJ1FKzLRuvH1wvtSbCTr3iR4lI%2BquGYgUH0q%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDENBTYreUmsl44isEyrcA4K47bXMoQMaycnZs7tiiTMsLG459LGSL9LD7PlSEkfpFzFdCzzDn%2BU2swIKk6AbQdbTqanpfxu5yvOjnvLVrQScxDv1Z6tGq7IeUWcWvy9h5oZbODQiTihPN5XDa7JFY1aF7EWLopvzNAwBaxhcbhImJR3AdjT1XBeLq6sj9ZeW7kmfuFZOrhN5SYDh%2FRm7ACUHsF3d9SpnTg9y5JiqypuSgEA4f%2FhTLsgZ9vnQ8ThUmrZhHbZbgklMqKAjpLky6GovU1N0JmXeVnt9M3Fnn3%2F36lueR6COfYr%2Bg6OwwLjKigsiVOYznzlANdwqgC1IUTam8GzuIlZOihijF60XqLsaYxnWn9aRxH5PVTq1hpjNDOKw6tUKM4gP1QC18UKVOxkoOC1KSMQnYF0P%2Bb8PZujv1PS7t11vA9NElCXpC3v84rpqzAysqCJnQxNV1O1HxXnTE1JSJNtc%2BVrSH4uiAjlB8wweUa9YdAX4GiZjob6BDmlawBw0L9b9%2ByJaLFR%2FZZdibrKiuJGUSGRQE%2FA2zp1v3H%2F%2FOq6ZuK%2BAWhmJWHBa59ckP%2B5BCrAa1mIpt53VY1hqjatEWpyyZCqqpMPfHn%2BjKtZQH3FeQAVXbg8LfbXfzwXrYxHAbjf6bHmHMLjzps8GOqUBc1vqnJEx%2FI6gXDfV2bgo6wIsD4B97%2B1GsotwfOGJv%2FRlTXpdrRsZMkd5%2FYHWeC8CgyphRuTWkBqDyALdPo0rqa93lx9e2eEI7E52Ctiny%2B4fQBz6XB37xERomN4hDDynIE1GFPSs808euscpErr1%2FqfgVKFK7kO3puHdfWvovnh6CGcbCviER6ZQWtN0pXdQ384a2RiECYJBYtbRoj8a4YJq9AnY&X-Amz-Signature=63480a224cf723fab52fc069990ff35743a016fbc05ad24d1f5bcb08d7cf2c24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOKTO4IE%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFJym3%2BAXnElmLA2zmlJ1k2PqlGddULUWJaOUOUSEnF3AiBRH7%2BHjIuekY%2Ft4pAKjfgzwXSyHGJG4Dvdo8cUCNTv8Sr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIM7KMufp9PlcNfV1TuKtwDBPKGObW8%2FlXSiK5SQczX2gASCdHbY3a3ZlcsKvUWFqM%2Fj9zqPMr9D17LL0AW3o2CFoHYjw1rBha28SrNzn3Wu5dqfaaR%2FnOLQ27sWDrXn5IrjEYnC1zQRZ6Ds8G3PgZFMTCSltmppu9UwkA8T%2BS3GwmhJ7r1fPjbtjzGEoG3e%2F55SxFZf6wNz6%2FIbvte1DHRkYN5DenkQg6%2BhnA9ylyKdhCQiaRhlyQeRss%2FgOKyPx%2BqzMvlzFCTzLFdzNNi0%2BX2CW1vSroiSraBeo119A%2FWVdEO0FWTp6iXGRQfHPjBclklk0c2CApweXG%2BPwr4VakcZA2%2BMO4SMq3icigSgdxp4D5YBZs%2Flp5YU9cJ13JV4pqRZfDogDtyihArCr2SG4Hw2sut66GXb5TDHimjZFCM6jyCSTZL%2F869VSwALnUqPWKvArIryM1%2BMpFbQrBRT7q0P%2FCAHq267ANHHB4%2FMEe%2Fs6vshmeKiqqVxzG3bk0qNS0VkVicZX%2FZA9%2BrvhY%2FsMOaI69ezNtB5CPlXr3OfnMhPkcwQLvJZavPQtV31cRdvRaAVgYE35yLlB1oYCiqTD45w4XrVrWjdbaTmwb72U%2BT4pCOQShn%2FhLPaR3ugZ5FunZyqRP%2BMav%2BB7BQCVAw8vKmzwY6pgHNkSiV4K6qLWoKKV0RbIYU4IuEJu9%2BvvIsYKd89jhmSVp4prJq42WkilKuVtrMN%2F2vh6UE5dWy3ujUM8FNfWgHHuYb%2FGwWgEO9U8NgrP37jYXqusutmCrr4kq4oHanJaCUTj97nm5aChIGKys3RWSiHPqikE8I8vWik9Y%2BZ0CHzsl1mnRjrrKe2hZevKkrpitqrZncih%2F%2FXIa5LQNOgo8avm%2BA2AKc&X-Amz-Signature=ce238d430a2426eaccb4dfc441f9f8fbc96702ecbd92169d2c2c405bdce9b0ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOKTO4IE%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFJym3%2BAXnElmLA2zmlJ1k2PqlGddULUWJaOUOUSEnF3AiBRH7%2BHjIuekY%2Ft4pAKjfgzwXSyHGJG4Dvdo8cUCNTv8Sr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIM7KMufp9PlcNfV1TuKtwDBPKGObW8%2FlXSiK5SQczX2gASCdHbY3a3ZlcsKvUWFqM%2Fj9zqPMr9D17LL0AW3o2CFoHYjw1rBha28SrNzn3Wu5dqfaaR%2FnOLQ27sWDrXn5IrjEYnC1zQRZ6Ds8G3PgZFMTCSltmppu9UwkA8T%2BS3GwmhJ7r1fPjbtjzGEoG3e%2F55SxFZf6wNz6%2FIbvte1DHRkYN5DenkQg6%2BhnA9ylyKdhCQiaRhlyQeRss%2FgOKyPx%2BqzMvlzFCTzLFdzNNi0%2BX2CW1vSroiSraBeo119A%2FWVdEO0FWTp6iXGRQfHPjBclklk0c2CApweXG%2BPwr4VakcZA2%2BMO4SMq3icigSgdxp4D5YBZs%2Flp5YU9cJ13JV4pqRZfDogDtyihArCr2SG4Hw2sut66GXb5TDHimjZFCM6jyCSTZL%2F869VSwALnUqPWKvArIryM1%2BMpFbQrBRT7q0P%2FCAHq267ANHHB4%2FMEe%2Fs6vshmeKiqqVxzG3bk0qNS0VkVicZX%2FZA9%2BrvhY%2FsMOaI69ezNtB5CPlXr3OfnMhPkcwQLvJZavPQtV31cRdvRaAVgYE35yLlB1oYCiqTD45w4XrVrWjdbaTmwb72U%2BT4pCOQShn%2FhLPaR3ugZ5FunZyqRP%2BMav%2BB7BQCVAw8vKmzwY6pgHNkSiV4K6qLWoKKV0RbIYU4IuEJu9%2BvvIsYKd89jhmSVp4prJq42WkilKuVtrMN%2F2vh6UE5dWy3ujUM8FNfWgHHuYb%2FGwWgEO9U8NgrP37jYXqusutmCrr4kq4oHanJaCUTj97nm5aChIGKys3RWSiHPqikE8I8vWik9Y%2BZ0CHzsl1mnRjrrKe2hZevKkrpitqrZncih%2F%2FXIa5LQNOgo8avm%2BA2AKc&X-Amz-Signature=ce238d430a2426eaccb4dfc441f9f8fbc96702ecbd92169d2c2c405bdce9b0ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFM5RDMZ%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T062950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaqEDcDhxOutdZtV%2B9Ex2OaFvcMz%2BFsn2f0vMCYFU6RgIhALFudgLfLbanecDxJbb7k8%2FEfhvd3LLuscXW40t9BLcwKv8DCF8QABoMNjM3NDIzMTgzODA1IgyYS5FwR9yYcrQLRV0q3AMK3EaX5o8DwHvI5c7ofvHPLjpzHXYfNyuzv4WIetP6Yl7Zeoxhq%2FWPpqIX8H31w0V4a7te4kYnItgSWOmMnAmtpIxdpXGJZMSfzIY65R3nmkJtm%2Be7ZCLTSNu6v%2F0dq8IExMtnhd%2FO79L3ExwYeAxGTyxmyIqMwp%2Fmjm9byuII573GQbGJ8VyD9sj%2BXId34xyKOvs5OzRGXMXnQMcOES9IK4miyAk6wOj9qhPESKsO3zpArPFre2%2BsoiPoNpUP4y0nrE1o3fQA7cc8YDYmFPMT%2B7s6KF4LJju2QCseG6wQR3IPqYb8ETafFWoUe8bMemiBLWFecQsi%2F7%2BK3tREAjUaGpjDX4OE6SemGe%2BKNiDihvsxI8Xd4rOz4HxZ1u3CPk%2FyzMkMmgLUoyQq7cGFUOpCF7jvTKrC16Wn75cJ8xEmReBMdgY3hHFzFANB2kyCZJvxx3uYQNhd2oFI0gHgZ7i7bsNN5hbSeJ%2BVssd%2BIuxgFTNvj1Hp3%2F6NrzjbAdkHpgIAnhUjzBQmYHui7RwcODuBOvttrjdr%2Bf0%2FbybfLyw9qc3FaBdk5nQ112AebAwPTYtu0RisURkIh29jd%2B4McrTFHE4KZT8%2BToaFiVeaK3AXrPaPZQboZMcv6rMWTzCy8abPBjqkAbLETZgdTjVQdrtkj9t0pa2dKPtj80iK0G8mOLSd6QzlUWKlrkz2MIw7ZrYGlSVt1sX2HKDBHGVp0mzjqGO0dwgIigLDXBlUz%2FzqQiuX3CwAuVc%2BXmWrslDSep9Pt3mqndUKDcGRGTTwQuPqCj7Fsq0bJ1r07MD6Ze4AGvls%2B49TXB2xTJgP9ReeBYGYqImAmFLJwLGvDmsZSH72fMaOoTjJmlIj&X-Amz-Signature=03fcf7fdb7c93415d34e62d253d78fe3c2f0f4e5d382e5505422995927ce95cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

