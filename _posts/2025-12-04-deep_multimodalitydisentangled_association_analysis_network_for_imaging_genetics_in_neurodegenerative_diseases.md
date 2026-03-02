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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645EWWCJA%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAKbzDQDGe%2Bl7aX5UnkDoh1SniRYSz%2BbEPlnGs%2FNnKn5AiEAsTbsAXj1GGkQDt47yt2zCmbUxpyRNBgct69Ry5XRgoAqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJdYURnUeaO1NySbCircA1DvTcd1XXNgBPHxlpkM13k8BOBOBr8cTmbiQzGeHGw1l5GO0Xr4Qk%2F5fUMhbnBqcX3BV1k2h8tlov98cIAmCLkw6CIt84ukO9ttAxxnhY%2FrtFN5nlXOia%2FVA66oDwHy%2FSXeTm%2FqDSKOuDJR74OwpLB0cd8%2BQRMfYI7zZwuxtvwjwMHWUD3P50WgamSvISX%2B1LCTEoNKDTx2h5DE0ddKB4OCZJQqFdPBHARp0r8M%2FBGZFPE275II6fp4FUuLOJXARjFfdq5FhzC110GQ9z7qyftnbXna1Ij8RYLhF7bnJNeAqeAf0nAPnA9drDysMdw6vRoZ2IIb6WnHLVvOtYmPopDCFzHj5lqIlc39DuoJlCuVJQMKLHVBqAtJmMA9m9%2FDhZaMsYFKEUGXJCV9w0Uu7Zp1hXBjWSLUPHRArf5%2Bfw4nR%2BSwSzqdsYXyj%2BE0QDfYGzXL%2BGm%2F94r5taUC3Fsv%2FlBQDCZnamZfSLHYOYgubYhWplCvB0CPd4Pjk0UQoCZf5m2AMP5JDc60xISzE1zgkU0YZ7OUihJUzh5EXomOsiPl%2B5y%2FZicqLMN6r4lUna%2F57AAzEI3cPESBfJswmNQuEKvmNA4%2F2Bli7966xYOyQP7z4AT1Oon8wDrzyzFIMLCamM0GOqUBAS8lRbO5q9vftmJuKWfKxc035ytCDLGp%2FYw%2FSioO8Zj78q8PENUmb2%2B8ns%2BQHclY70kcYVRMorXpYyjvixMRwLXDL2mtes%2FEpoWvGErNwYJMSjKBz8qICJSx6%2BzHOvq0iMf1n7DRb97x8UJuJdHfbQnPcx3GHxGnx1vP%2F1jossNyKQ0wUraDaoNDNXgD67rBpYanqcrL6uVWOj1YzwvfBz5tfesQ&X-Amz-Signature=58a4000b9487c95caf6f2bfd1d0957f707563242a82d38dd2536376000442433&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645EWWCJA%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAKbzDQDGe%2Bl7aX5UnkDoh1SniRYSz%2BbEPlnGs%2FNnKn5AiEAsTbsAXj1GGkQDt47yt2zCmbUxpyRNBgct69Ry5XRgoAqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJdYURnUeaO1NySbCircA1DvTcd1XXNgBPHxlpkM13k8BOBOBr8cTmbiQzGeHGw1l5GO0Xr4Qk%2F5fUMhbnBqcX3BV1k2h8tlov98cIAmCLkw6CIt84ukO9ttAxxnhY%2FrtFN5nlXOia%2FVA66oDwHy%2FSXeTm%2FqDSKOuDJR74OwpLB0cd8%2BQRMfYI7zZwuxtvwjwMHWUD3P50WgamSvISX%2B1LCTEoNKDTx2h5DE0ddKB4OCZJQqFdPBHARp0r8M%2FBGZFPE275II6fp4FUuLOJXARjFfdq5FhzC110GQ9z7qyftnbXna1Ij8RYLhF7bnJNeAqeAf0nAPnA9drDysMdw6vRoZ2IIb6WnHLVvOtYmPopDCFzHj5lqIlc39DuoJlCuVJQMKLHVBqAtJmMA9m9%2FDhZaMsYFKEUGXJCV9w0Uu7Zp1hXBjWSLUPHRArf5%2Bfw4nR%2BSwSzqdsYXyj%2BE0QDfYGzXL%2BGm%2F94r5taUC3Fsv%2FlBQDCZnamZfSLHYOYgubYhWplCvB0CPd4Pjk0UQoCZf5m2AMP5JDc60xISzE1zgkU0YZ7OUihJUzh5EXomOsiPl%2B5y%2FZicqLMN6r4lUna%2F57AAzEI3cPESBfJswmNQuEKvmNA4%2F2Bli7966xYOyQP7z4AT1Oon8wDrzyzFIMLCamM0GOqUBAS8lRbO5q9vftmJuKWfKxc035ytCDLGp%2FYw%2FSioO8Zj78q8PENUmb2%2B8ns%2BQHclY70kcYVRMorXpYyjvixMRwLXDL2mtes%2FEpoWvGErNwYJMSjKBz8qICJSx6%2BzHOvq0iMf1n7DRb97x8UJuJdHfbQnPcx3GHxGnx1vP%2F1jossNyKQ0wUraDaoNDNXgD67rBpYanqcrL6uVWOj1YzwvfBz5tfesQ&X-Amz-Signature=58a4000b9487c95caf6f2bfd1d0957f707563242a82d38dd2536376000442433&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q474IQ5T%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDkgoLqhjH6ZmO65SLpzQE%2BrY1QKn%2BySRhzXJMlTQnQuwIgOUQafOFl4S3guamM58iVBLaYP8QuwW%2FAo8vwVzBU8JEqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFED329Eb0K4eAg%2FyyrcA9KqJkLqbTZRiH8wFYjE7nZU7pDoSekctFNh2NkqdeQdb02v65REs4IpWueSBlmcLyWZqHGmIab6rQTQcXwd7Ip0kI8llKavVBnPX2uRIeKb63WGImxUGvcmOzTo3BsiK62LetdW2%2BxgCqHsbexBldMzhkPkSyOA75sYw7nSRxgpAiHrmkryAgqprglycF0718h1M%2FS7w3lwNepWtC0t78Idl1gO8TrcwhJ4hLJJXdal2ibgI%2B%2FYWHhOi9WkK6iUzNcO19%2BFJLMpGk9Gf0b2PG8K0iSqrBATYKuC5suT7UPRDpMt%2BcrD9mvwrxt4Ub%2BVk6HNRDvQ1k9gEJLUPHCdLLp7XYYqPJdd9YNQe9a38%2FWtPi9SPO8ri0w09lBrEjk67BW1HL10noBnSg9tz3ro5rm91esUX6mJXO5fQe0eaVFnH2DjpYxTTisGbAmNQ43l12gC6ubPK7tBJLzb0iJsqNwG071avLAE10GT5%2FY%2FkkWbBURO7gYi2XxK6iSIdAPpfX2hm%2FqknMOsYWmSWOD7AEb%2BWm285lqUYuOr4z0xpf%2BQrxBa4oL7elQduHoEvjbiXYqvpAo%2BzhqXT0oNWr%2BgFSKhW7yttOjTD3NL%2B8tWHfJdtWH3JwSdldZr57upMNWamM0GOqUB7p7xmjU3gqBwz5cZg%2F3Jz3XR3dJaFGCbcrEHzsylPiV859f39SKv3LJ2JTIpBDFfH6zedng4TXOcu7vIV2H1xgwjylkuwMnDaHpd%2FpbDpHLVQeDfVNejJL53eOPdHlgvQ6ymvWmhYI87eGFypxoYvSJ6m%2FSSdURxqd%2F3EaZ%2FTPe%2FveeAgP4HF7mM971q0fgrmjOiAJsEtO7M%2BkQnjRlZ7l4GyHMv&X-Amz-Signature=8bb2c12d50cc4fd1515d44c05a8cbbc519ec00b4998fcae2381d0e71e24193cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KHRT7WK%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQClCAKtkhXlnpyPJCzyhRqYhy6iruMZRSo7KGDMDCQ1VgIhAMiMWbU7TrI7o6znOY5jbg6H8Eufkrh7MCvR0n37OWbBKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw49ZdSX8hecDYgxokq3AOC89bRWd4AJl3miv00GPE7hvhonVVueqFSqvNYsGHpubIX06Uk4J8oQc%2BcqZrh69FKPuUIbWcDKiSao938fUgQ0bggOJ5d2cco8er0YVGsVcwSWAP9WBPt0WbiiwPysIpOPoeZc5gsokQVaYWrYLtCkHjdIuNJnc0mTgTG2gAHmlbN4O%2FF6z61LMb%2FB7WeiofDHBPdWxuvmbA9GoUTtltgJKbgdWXTfy1QtDQyPXeY44%2FVA3UAM8QyYcQaijpXcWuLqvE%2FiQB%2FAcm716iUSJhYbxBed0vr53xFEKsXzQ7805vNKjyUzZsr61ywG4jr3TKovbmHQcp8VdoC19gHSdntEUdz9eb4zp3OkjtVNSmQ7kEye8Pg22mKPZkrt1%2FRXzc1NBfnwZYIjiRZBEY1VQRLm5rp059hd%2BegOe1rt7%2B1TOgXZ1Ud5%2BFBXGD1aovvIcWUSxRibpuzclqhx5ZuWIww2KseyEsa%2F%2FPh8m6WanNZncUbUQ%2BqhdOQHpmEvABcHKaa2n1%2BrLWvWWSch%2BvucuCedJVMuecizm5atpVCPj36NoCcCuJQDNNnKLcDEaNKgwZ%2B1wd2wGvaco4%2BVGPr%2FPQCF4sHlzs7LnNxbyOt5kJIg8i%2B9y9KdhHPesu%2FYDCAm5jNBjqkAXEK0ee8pSr2zMThMCLGkbJkdiKpxCv4Wy%2B6MZItP9mklsRa0l5PBM1isYAP8%2BEw13XRc9ZoTw46YT5C860EbqR2qzYrT0nUFLqCdynWC61oO0xaLaiFzSiSEPBNmggpCchi%2FzfG4G8VN2g9AJJZWruk1SWYg%2FzjT5En%2BCS%2BPNUykv0MjZ0%2Fl9ZeNabKqd4Cf9SAUIZXCD1znKAAR3KmSAW2cAft&X-Amz-Signature=554f49596c0cc2ce38d05fdb37ef3ddcd90f765531fe976a38e84e388d77215e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KHRT7WK%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQClCAKtkhXlnpyPJCzyhRqYhy6iruMZRSo7KGDMDCQ1VgIhAMiMWbU7TrI7o6znOY5jbg6H8Eufkrh7MCvR0n37OWbBKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw49ZdSX8hecDYgxokq3AOC89bRWd4AJl3miv00GPE7hvhonVVueqFSqvNYsGHpubIX06Uk4J8oQc%2BcqZrh69FKPuUIbWcDKiSao938fUgQ0bggOJ5d2cco8er0YVGsVcwSWAP9WBPt0WbiiwPysIpOPoeZc5gsokQVaYWrYLtCkHjdIuNJnc0mTgTG2gAHmlbN4O%2FF6z61LMb%2FB7WeiofDHBPdWxuvmbA9GoUTtltgJKbgdWXTfy1QtDQyPXeY44%2FVA3UAM8QyYcQaijpXcWuLqvE%2FiQB%2FAcm716iUSJhYbxBed0vr53xFEKsXzQ7805vNKjyUzZsr61ywG4jr3TKovbmHQcp8VdoC19gHSdntEUdz9eb4zp3OkjtVNSmQ7kEye8Pg22mKPZkrt1%2FRXzc1NBfnwZYIjiRZBEY1VQRLm5rp059hd%2BegOe1rt7%2B1TOgXZ1Ud5%2BFBXGD1aovvIcWUSxRibpuzclqhx5ZuWIww2KseyEsa%2F%2FPh8m6WanNZncUbUQ%2BqhdOQHpmEvABcHKaa2n1%2BrLWvWWSch%2BvucuCedJVMuecizm5atpVCPj36NoCcCuJQDNNnKLcDEaNKgwZ%2B1wd2wGvaco4%2BVGPr%2FPQCF4sHlzs7LnNxbyOt5kJIg8i%2B9y9KdhHPesu%2FYDCAm5jNBjqkAXEK0ee8pSr2zMThMCLGkbJkdiKpxCv4Wy%2B6MZItP9mklsRa0l5PBM1isYAP8%2BEw13XRc9ZoTw46YT5C860EbqR2qzYrT0nUFLqCdynWC61oO0xaLaiFzSiSEPBNmggpCchi%2FzfG4G8VN2g9AJJZWruk1SWYg%2FzjT5En%2BCS%2BPNUykv0MjZ0%2Fl9ZeNabKqd4Cf9SAUIZXCD1znKAAR3KmSAW2cAft&X-Amz-Signature=50f5f5af0f7624e6c2eac7a03039c6703619702774c47411b79b4fe08bcaf7d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UILLM4E%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCOFyvi04bBTUsld2oPNATXRAooBB%2F4fa9nXK6F%2BKdHcwIhALBj1FuIVFCsZJIYGjyWIf6vpqKzddd9PWOGKDIfLdVCKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyaUnzCY162uksZqf4q3AMIIPncbnDWll47WL%2Fb%2FpnZq8GzJ2FHzbodtPg2eRqsVsfS1EwdHd52Y25oaGRBNswcj3bFO3s%2Bqw1Jr6fDmUvvFCaPvflqhYNVEyNVPhOJE2VFMXsnqzJPnh%2BvQXrO7NjlLCzXmc1wkbu0QbTYN6Dloq6EvjbgKoQiAXDZkLdMt%2BHc6ZnYY1AFfwwj0w9%2Fvnt9E9dtBulXBem4mw%2BVYz9jRoNoVMajir0yhrg4R9xPpbbqWE81ueTRQvd3FOc5VL9HE0JaKOi%2BRnNVD3gkNmu%2Fuwo7sv%2BfHiaeicmA%2FQDMrBssVRecvqUFwoCLxgQIBmPqIYC94EdDoWpVqA465e3JthJS%2FQQ1SGRoWnJpRJrYUIzPPvJPFvulTlH3SIGqjC3XS7O9sHIXvQteSGrK%2BFkGzM8ie%2BGniJqZZ9WlDc21FhXP5tet1%2BPW2pNHv2JXMdYgYO2jQNBRAD4PeDY6bxBUDj%2Be42av7sZauRmGJCjXAoVkJBiLU5oro%2FRiZpfrzVaTigHhb%2BW4xsFL9vDJynWVI0hMWP4BpGkt0PbwispTZ7LLk9mJV2pBweBDKC9O2gRIbWboNhSzf32O0As1iEtGrz4fSgEK8%2BDwFBRqE%2Bu4%2B9a8HnIu6Pp58XWZ1zCLmpjNBjqkAVxIVuxYFbjOgU%2Fu%2BHtSbOpwEtV1FDT2y7IqFgjQe0EsJtsvLjvGOEn4nYMv5524wmLrrqZykxaMKf18c7kY0SL8Tg2N8wPmx37HTXjHFuIV0WSaFqP1zMFmKdZyjKt9cySEUcq4I5gKuTm3LS0LEb%2BHy0odpBJk3dkOLhsz60WjVg3VS%2BOCHVxHxijEZ9DsqhoJ3ehFfDvrNPip4wP9IWNQiuUG&X-Amz-Signature=7c2694dd80f96ba5a1b10a2c3751b68f956114b2cf869f730e7eb9df8e617094&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQQH4AYV%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBhKbEqXU3BP%2F5ocOADBDwsDENBALOSdZ5oZoXR6CwSRAiEA67d1WCOpoUyyz7PdwwIZngPsiV3%2BUSjeRc1tbIGEFRsqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOtzDX34p%2BhyFXwIlSrcAy4DBCSY5YoxH34Ph82SJxd05HWI1eDJchFDlmK2PELqiZg%2FZAgQLFX51ZfuJGUUQGYnHimDLix48MJPJ%2F5NPQmMizXuiZx2BKehctBwk%2Bi%2FmCss4LUYov%2FIWxbioM5Fu7uVQ1%2BD11kzuLjf%2F8pgWtb8CI4%2BACjwUMZBJPRmk4HKqCJURUakH4DvjtiA3QASKkwJCnQ9g5lL6mVeBEwMWUIg2sCXcdt7ipAUo1p1XI11zyzChwqahmOJvW3HdYNyQAoubyjh29LgMrLtHc8deDL%2FoKNns7w9sMOXUKS%2Fmna6ESN6YyfAZG2xPrd8ndUplFUzrH2LBJYOnXejv9mj%2F6xmLrafHfrXwLb8rzev6S5lekg%2Bi4%2BKpr3WAk7IdfgGYCi8o%2B4bm7vozsW9cKvMYskKyPxNLJHz0BRpNcTFG4dWJyuLDIWr%2FdT7bmwIXdoP3%2F%2FRAUV0xDjniiD0iDSf9McY%2FBl1mMdgzvSsbcQiauOyYU4klU47m8uGY1ruJlVqabdXQdDrOFgbsA5kkHPhL2Mu1JbVIXhOPrD5R36JOjIUlwhJJ%2BSLXP8A9na4QrD6IZyKcgCyKgTPPPITpo5nuyBEvRY45of4pK0lQcFbxpm5u942AnpoaaSP7zibMNiZmM0GOqUB6noz%2BgLXs4odfuh4DRQBQctj6oO7mJ03jgDudJEXULU15cNOk8fTTjYm8K4jnpJnBve2Ywa5%2Bn90KMJuIKWZPAL7EfWE017JhYWFLV4ilfNN4elP1sZ3RzZYjNIhJc%2FLazRRAU35%2B5CcNVbWTisR%2BpTaEowzOxifpAlkCXoiMStWXx23j3D6fe3%2Fm7dU%2BAhi7PwgCfZm2Bd076PpAbr9xMxxnZBw&X-Amz-Signature=a1555004b66179c98754bf8c899361b8f9b3e17bf7e0794b3e9dcc1b4f967092&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WHNFG73%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG3YUwO%2F0FKyZZoKxmp4G8f75HYkPwgmy5pQZyfi%2FYUXAiEAtJ00J8IClQ0PS%2BmAHvc9gchIcUIwf7A6oW6rDDYJ3iAqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOAzRzwslVfR6M3jAircA688ia6MQNtsrELbylt7N%2BaemL4K6GaQBplgjVw9QmpSFsp7vHO8241B3C8fSLp4SIExsWrwqNARnRpn3e97hUq2%2F09jusieWrlJbU85ZncvL%2F5RtcNriKYLDctr3%2FKUldyHh3OeVRO%2BjU%2Bn4g6PFGBvj0knPcczu8CWZAi1iEGBz0mOCS41eo1J3wbi2f36ySFygHFJTLhM%2FoDyzRWJsKx0nFCrl4mSn1Cwc7LPYmbyNrir%2BcN0dPdJTxnSOcmoONOHb1I24OZkDcYZUL4e1RLZmTnmWReyzDe182tqd0RWjIgmfxfA1Crdv7DIaAxNqLvxWEEFzvA0dxSUIE9wYyJYl7fLXXFZrcv6lSNL05m%2B5CCskjT6cvcebzb1QHOeIT30fSGv2CDFOSR0bQDOS3T94fuIcYPehzW%2FbTzjxs%2BUEBBKPrVjZnL4By57pm%2FIy2taXkFyduuWbuMyORzDohh3DyFY0kPufmrIhF%2Fv3eQzweBWPwqviHR2xwGEMvpriqEWMFxmstXW6bw8Dty30v7UchCzEfRO2y3h0lU5HyYoSIoulq50vifUjrl4NoTLMvfoWwEA7FQjTW6afOchxLCt3I8LYPyN0tvjgbCnjiXaKedIrbZzxYtnGsvyMKKamM0GOqUBMHjxvoiAOA4aV5n7pidSHLrSsXNFGqRwey%2B3tnZE1J07%2FlxJ01NuRMxxVx4JR%2BiyhWkmaxwMOpun1NOv5mAg3nAYlzQrCrNZkwpvQrqu%2By23lbjN%2FgnzJdI5V4qxtv0or3yoCl%2Bc9U2YU%2BCtcKq1kf8uL%2FWICdaNKjZlqLvcjYvHd9qCwWAcFBmMAXxzYSBncx7WWW54EbDqeJyf70tFbIMbua3X&X-Amz-Signature=95bf447415644b820740e232d02060f40a548a194eb488b478e4d2af8ec7ac1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAC2REZG%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHCuzah9popvzlTZpNCYRN1u%2FqWd3qX0E4o3emHYurfyAiEAwgbgpOn0vGpFbesIonwuUtZm3bVwtiZBRPV7R0cfaewqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMANbNpi2aTUO4JmWSrcA9%2FIquvY797Ba04gtnFScyuYc%2FKPOBp32SnkvkOkiLYJ654hwdiPFHOWh0TvrwpKXmGt6OiS3%2BujmRDtG9cZetekKSqPTXHSKC9AqAcngRSwEvZXdiI04hjn2GcGoVWz7zQ1LqnFbOLvJpnLZ2lu7pukYGrx8vVmzsSHU73uYd78USOE1tQU8vn61MdQKD8HnRCFrsOkg4ZS8JmQsOZff7LCGQqtCy%2BRZ2Rq7V%2BSGtlUsdSiNyu2Esyl7E0KgCKfAb6euKUtYOnL%2BYQblQlRd5gFHGnRoxnaup%2BvY9%2B59kPR2gJEiB%2FOeTpt7eTPyIuZaFgTj%2BHY7VDtKBxpPSHHMzJcSVPp22%2F7VUkAPmUOODAqnqQS2Wix%2BCL7GejRu6SSbeMIJ1nSyiPdvtFQLUob0NtEJrYORTNgxC%2BQCjYmUvNQdqvm%2Btd8arl6a0vpnj%2Fwomlbhud%2ByxJY6FpKW0%2B0jL9ExC0UMeFsNaoyxIEG13ffTUfXbvcSuWczNaW%2BCsTlTyzcq9fW6P9ARb7SOx2K%2BrOCGr9263aKN6X2yGssaaxJO8GgOt3x1m0InVUogkt8Fr7fNiHVWlRiRwF%2FSLz1VC6S1Wi%2BRTgB1wHRrqQFOmh7lbWG1dsaTf2wkd22MIGamM0GOqUBqGuVVoyZex6pC8WhPW0fJawKAFR3dIJsYbve45eiLEsu0a71XIgathHPHCF2Mzq0aJgfekVAdXpo1yEmABu1CPbZzVu4DDwOvtoOZQ8IN0QkrJ2Q%2BIfC%2FV6cNKPvGNy2por65%2FrIRXrt7CaeYn%2BNZE8Y%2F6mWxp%2BIpdRTGHNpftGC2qbDh40tTnUh5P6cVgPh5Zdp%2Bdnn5b%2FFGNnEegOsuZ%2BADB86&X-Amz-Signature=0375ed504a5ce30401ed0c16619f0a2312845a0bfe95be6805878f3681f455b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAC2REZG%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHCuzah9popvzlTZpNCYRN1u%2FqWd3qX0E4o3emHYurfyAiEAwgbgpOn0vGpFbesIonwuUtZm3bVwtiZBRPV7R0cfaewqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMANbNpi2aTUO4JmWSrcA9%2FIquvY797Ba04gtnFScyuYc%2FKPOBp32SnkvkOkiLYJ654hwdiPFHOWh0TvrwpKXmGt6OiS3%2BujmRDtG9cZetekKSqPTXHSKC9AqAcngRSwEvZXdiI04hjn2GcGoVWz7zQ1LqnFbOLvJpnLZ2lu7pukYGrx8vVmzsSHU73uYd78USOE1tQU8vn61MdQKD8HnRCFrsOkg4ZS8JmQsOZff7LCGQqtCy%2BRZ2Rq7V%2BSGtlUsdSiNyu2Esyl7E0KgCKfAb6euKUtYOnL%2BYQblQlRd5gFHGnRoxnaup%2BvY9%2B59kPR2gJEiB%2FOeTpt7eTPyIuZaFgTj%2BHY7VDtKBxpPSHHMzJcSVPp22%2F7VUkAPmUOODAqnqQS2Wix%2BCL7GejRu6SSbeMIJ1nSyiPdvtFQLUob0NtEJrYORTNgxC%2BQCjYmUvNQdqvm%2Btd8arl6a0vpnj%2Fwomlbhud%2ByxJY6FpKW0%2B0jL9ExC0UMeFsNaoyxIEG13ffTUfXbvcSuWczNaW%2BCsTlTyzcq9fW6P9ARb7SOx2K%2BrOCGr9263aKN6X2yGssaaxJO8GgOt3x1m0InVUogkt8Fr7fNiHVWlRiRwF%2FSLz1VC6S1Wi%2BRTgB1wHRrqQFOmh7lbWG1dsaTf2wkd22MIGamM0GOqUBqGuVVoyZex6pC8WhPW0fJawKAFR3dIJsYbve45eiLEsu0a71XIgathHPHCF2Mzq0aJgfekVAdXpo1yEmABu1CPbZzVu4DDwOvtoOZQ8IN0QkrJ2Q%2BIfC%2FV6cNKPvGNy2por65%2FrIRXrt7CaeYn%2BNZE8Y%2F6mWxp%2BIpdRTGHNpftGC2qbDh40tTnUh5P6cVgPh5Zdp%2Bdnn5b%2FFGNnEegOsuZ%2BADB86&X-Amz-Signature=479627fa2e1c3cf529d79ed8f5e0d2587a8c12985cd9b00c7f54db8fa0b0edf9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OZOKTKM%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGLhfopLWCezvaRuypw25A3m%2FGJuRVKlqMPlYki%2B3%2BDHAiEA51TOgX12jafpe8%2Fn%2B1MIg6Y1aEAV9kmLwrSIlJV3OAMqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLXEKKHj9Gr2RPb8iSrcA0sFauchdSsXD68Y5Jf6khdBFIVoK9T8CA9N3Cvwaht7por9b3hOm2o6TrKiC558fmpeMIzxsZQdJnu355L26hWvSzH%2FyforgjtPlINEyJqj0i2Y6FofHTg2tUtiNlfKpMARQ%2Fn9nE7e1JNFOcBMx5%2FZE%2Br4%2F01YHhOVfjKOJG3FI%2Bvoz1Z954qcQO0nYZ7NkX2Onp4bcw0j7sEivYWXIhMVi9augiWFYyXKy8IGyzO71T7F6RwfqlU2U7rONSfP1ACuwTBrzErE5CMdkfH4nH%2FiBVU2HFrj%2Bsz8ps9vtz7UVX2yZkc6y5PlXvs3l31u%2Fv%2F2cDxd3hXMdzsuQPi1Aed5%2Fc2FbYSnSHJKI9qJA5uOwQAw4tpWAYnJvRFw%2FTOIL3fVRjg26CkCJcB%2FosIVa4I4x42oO4LxU9FBvntn7H7QbpZ87I%2Bh%2Fs%2F3tI6bkBOhXjCM1xUKqpsgHxLRxjGctxnLaswheSUD6jfQHGDV7554C6cW6jIxSysVKP1N2mY9dcZKHI3vgOsFeG%2FfsMKCzDKGMrHSXybAYQOOFSdR76GCPrcA%2Fp8GHnZ8wSg9KTwGnKnRgrMxEI61iVCN8oX669m4kMRK26tJog0ABAqnAmmICdViIBmV0ifL7LWAMKKamM0GOqUBiGT0ae3mtsjBcFLyacL5alsCdir2XohGrdsOpA78qFpXGONNKHknd9sMsR8HAGkhkTwiih3b3iWtMTZ995TLljBsoBSjW8gPCcROUaXjqZKWpEWwYj84aadEJWczndSLhcgW78FEyp6%2FvN4oxl59wh%2BAfD%2BjaDgYDjU85353vjzPUZvpryiLhuIEyh6bL%2Fxviup383TzpsRRwgV1Q7RKuCeS94pC&X-Amz-Signature=3d9773ed34833b6e02ab3614ce3051bf73fffcce0e5e7ab9f955531c9ddf789d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIU6TVMW%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD1osRuaa2LfHjczFY8E7kb4z9H%2FYtQ%2FjXCNF1PruPtOgIhAM93J4SbdhJCimPRsEq4igUcVn4IBgECO%2BhDSgHyJMA7KogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwxar5IHai4bwzhjLMq3AMVH7ZKdSKc9dYOKCyVglfLiWppokIi8P7Dzs6oOIn04FMYPz11O7Ahs0cev%2BbdTKqAgo%2BoDduj4HGRjVqsoNqdpxB2VYWNkvMWNMRDR7vfAiCnhufbrBpE%2BgGH%2FBi2QfrtP%2FSjUCyiI6KoHXi0DcZcvC2mEdPPHbHTzYN6miIS%2FJrMmxaP7QAiJX9zU1hLMuvBV3spJsoZmbyQYKawmAOvJsyC%2F5APJUGia2EwRkgkMEkygboTyPfAq9kv3PY%2FCN1ce7xs9qyJffMRittt3tWdvCGqfxMpqtI9iI3pJjqcK9IsIkvgpvAYAzRvQwTeM7sTxJTecqjR775PiTVkkCrjjPEHKNAabcOIglc8ThejUBaW%2BCW7lWWVLGcEKbsjT3B5lrRHQMgLDkEYSnkyhmfsfjfVIv5uqwJtA57F0rBQ4xAeRurcEZYQPj5Gtvqfv9SNrQFTwXCH9BX8BVwnr8Bfi7jUTeIrgx6chW0vmvyr8l5Z81dCawtHCg%2FDqL1AmsXCvxTo%2FWNkLhRZ562knsIRtEvbme4JtJnO%2Bqrb7SiUKgrLuaiVUUvKjirHZTBwBEh%2BfuAa05IFZA9bbSWWypLi%2FZ3%2FXQ5qNstBPatQdvWrQJ7pBy0GL2yysSjx1jCjmpjNBjqkAX32sxda8pBwlVrPu7yzOa4O68eTeqfpGAvcdI5RlPhlw32dY4Ol1L6TJxF2M3gKut%2B4AeYsLSNFjde%2FKcXxiWhSouhacWhkFmdt2XpytrN%2BH3kdh0IUrkozKIva%2F%2Fufhe%2FVlBNLLlmdo29vkbT7T5jrzk7MrFlnSwY2c2Y9ZIFP7G5%2BEWkSZzEEo7xUmHfxVrgHMAlAZGK2yq49aITly8B7jiH2&X-Amz-Signature=55d683b97a1c998d8cd37f728f4923d21bdf9eec23fd4ab15ff0d4cc1bf4eea4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIU6TVMW%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD1osRuaa2LfHjczFY8E7kb4z9H%2FYtQ%2FjXCNF1PruPtOgIhAM93J4SbdhJCimPRsEq4igUcVn4IBgECO%2BhDSgHyJMA7KogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwxar5IHai4bwzhjLMq3AMVH7ZKdSKc9dYOKCyVglfLiWppokIi8P7Dzs6oOIn04FMYPz11O7Ahs0cev%2BbdTKqAgo%2BoDduj4HGRjVqsoNqdpxB2VYWNkvMWNMRDR7vfAiCnhufbrBpE%2BgGH%2FBi2QfrtP%2FSjUCyiI6KoHXi0DcZcvC2mEdPPHbHTzYN6miIS%2FJrMmxaP7QAiJX9zU1hLMuvBV3spJsoZmbyQYKawmAOvJsyC%2F5APJUGia2EwRkgkMEkygboTyPfAq9kv3PY%2FCN1ce7xs9qyJffMRittt3tWdvCGqfxMpqtI9iI3pJjqcK9IsIkvgpvAYAzRvQwTeM7sTxJTecqjR775PiTVkkCrjjPEHKNAabcOIglc8ThejUBaW%2BCW7lWWVLGcEKbsjT3B5lrRHQMgLDkEYSnkyhmfsfjfVIv5uqwJtA57F0rBQ4xAeRurcEZYQPj5Gtvqfv9SNrQFTwXCH9BX8BVwnr8Bfi7jUTeIrgx6chW0vmvyr8l5Z81dCawtHCg%2FDqL1AmsXCvxTo%2FWNkLhRZ562knsIRtEvbme4JtJnO%2Bqrb7SiUKgrLuaiVUUvKjirHZTBwBEh%2BfuAa05IFZA9bbSWWypLi%2FZ3%2FXQ5qNstBPatQdvWrQJ7pBy0GL2yysSjx1jCjmpjNBjqkAX32sxda8pBwlVrPu7yzOa4O68eTeqfpGAvcdI5RlPhlw32dY4Ol1L6TJxF2M3gKut%2B4AeYsLSNFjde%2FKcXxiWhSouhacWhkFmdt2XpytrN%2BH3kdh0IUrkozKIva%2F%2Fufhe%2FVlBNLLlmdo29vkbT7T5jrzk7MrFlnSwY2c2Y9ZIFP7G5%2BEWkSZzEEo7xUmHfxVrgHMAlAZGK2yq49aITly8B7jiH2&X-Amz-Signature=55d683b97a1c998d8cd37f728f4923d21bdf9eec23fd4ab15ff0d4cc1bf4eea4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LORJ3FT%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T231340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGGCFT95jL58xtMFU0pdnsoi7%2B8ZyMyrePrGSaPnRU8UAiEAyZRtJgIXVIpe0cJ%2FrxMB2Vn4%2F0D0QMNftPQA9%2B4j6WcqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGI5G7HI7oQvboiMgircAwNSpEoh5xjUGPjxobe%2Fiyujiekj9zVeSV5gXu%2BycuK%2F1ZsjOYYTxR1fforaWRZG7RmatCfzoEiywMoWxwNktDfWKlRjpeUNvTvu5PX2qj7uTWvYeraHbaT9mMnIhBw5Oi0K%2F3F%2FWWfYkGGSJtJccnkZS8BjLQPFC0TqUr2ITruXgL8gm3hXIVn4TP9lKOIAyTg6g3hR6qpxBMNQA8M596HLyTLEAlq8BMyhxzEe2dMooe%2BGuIsyjMFbCiJMnBKUWJLP0VNEqXT%2FbalSrB0%2BYFYcpjepRwdcuCkKbOXlb6gSGOpz1Lhdab1IWtAK2iCtjjTF3eF7s3jHEXDu9rDMAxEXtfmcVebHWEDMzM50CkNEq6nVHsGe71A3rwcPOhB6HWfLId6ikwr%2FbEwS4qRSjEV7NGUyQCcNY81XcjIkla%2BQGsObpyQBb4a9OYTIMuG36SN%2BOR%2BQVknG1rFMB62SqRfo2mAliV7S7uTwi0j2eh4137Fx5KKRXa4HqWNW8lB%2F14nGNl0X6gdPJAos3S0m6IwnxrMdrVKBGKDkTALibGwKlQBuFIdZB%2FVgntaDNeIImTRSCLD2i0hDNREdm589gp6ZC0bc%2Fo5POTe8l6kYpkZmUa9dx4r8qnEgma7LMOKZmM0GOqUBpiJ1IouiofRuBY2qKYRwg3Tl6a3YclmiEkaLuh8a9fcv7ejwrIQy95wb%2Fpv2wLXomqjAJvDaZS1jPBpfx0e1bNa460NBSsXq%2FtrDzRngdcysB5IG7dqwXeKdwBFZSK2LgifBl2E8vn94%2FD8cdWF2DBct81IWgEACQekJB%2B3EQZGek1lWyxdm4GrFnW1wRpL9wQV%2B5NqkYKBGgiOHFXqBP8xc6UJp&X-Amz-Signature=0890a01db54e66875f142ba2bd9d21161bf4ba5f80d096cc0639bf7bc44e2909&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

