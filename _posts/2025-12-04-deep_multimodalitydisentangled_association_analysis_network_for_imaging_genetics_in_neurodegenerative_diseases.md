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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4N4RVV2%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIE5VdP0UFlXzawH6E4lNkR2eiRLHgLvURrG9Rkt7DmWFAiA5VEfXq2LV6mAVitUmOlKoFwiIyAp7KlNMkBoHuS1EAiqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMaGDmDnXYZC5fjetBKtwD7vsgyQROs%2BLPmJB7%2FdDSfSjZAVTCZPJfASVmVLCBa8SfJKi2TWhmeXJ6fN1JGpDggvuu7YVDjcCBn%2Bhpr7YfpMyMQHiWTOggoc6Fq3hSkxxEctp8pXWFBmfNQNsrdqABp4xCAHQ6US%2FyiBPrafzwOfp9Mbl2Rgf0v4m5gETwvtXi5nOL71KE3ibNkOcxk2FOY6cNygGgGKphnZgvaGVhxqop5BU%2Fz16Wb52HYgF6vApt7WjLYo%2B%2B%2BV1MAS%2Bh04WLv%2FjN8LRGLTFPUvCVGJknUA5MYhFypkCBSLEiW5VXPoTIMy2%2BJSJqw4qC15vL7W1Fvo4zps8WBahiJ8UpIFf2HdZF7zoJg1h79XoIceK2Gy0kJUgsVY2SEizfoOkFGfmn8%2ByJGn2tbtkoItlf8Y0A1OfnJPzB9tlz1VWB6dy1CnqdtefB%2Filec23V36lphqt7SYRgOzJ2MMRmxl7HtYn7T0sSGMuVD%2BUiQhtI4V0R2uqK6F4Cosb751bcC%2FooRGdGKUdJtgvxd7o6feaw5UjUdyi3KBmbg2jFlyT1%2B7z2TsFuiJaesBqN0Ap91N3Jgvd05%2BrupE%2BnM3W%2FhIGQXTS5wYOQYa3z%2BA0mHnvMlbbQ731v3Rw46V6%2BvanY%2B7YwqoSKzwY6pgFw8oFgFb8zNaIK1DTk2RtZXnoPhX0L2pExFVOjLjyl37P9%2F4KPmnaMWR3NtOur%2Bxaep7zHmTrjL2Y1HEQBgdRGKJZ%2FCas8aApX%2Byxmba6vQN26bJLkicGcLRJPta1yIk1e1Uuw0rHF6sdO5r%2BeCugzGXbJEZU%2Fybd%2BoOFHrdeah8Z3vMfjmrjnpuSAkDtesDQwXheztK3EMwJaXmJ%2BxrQ2DCPkTQig&X-Amz-Signature=9e2dc867af205fdaed8fafd385d7dee61c1d20dc98d5cb6332fc14a392fc13b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4N4RVV2%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIE5VdP0UFlXzawH6E4lNkR2eiRLHgLvURrG9Rkt7DmWFAiA5VEfXq2LV6mAVitUmOlKoFwiIyAp7KlNMkBoHuS1EAiqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMaGDmDnXYZC5fjetBKtwD7vsgyQROs%2BLPmJB7%2FdDSfSjZAVTCZPJfASVmVLCBa8SfJKi2TWhmeXJ6fN1JGpDggvuu7YVDjcCBn%2Bhpr7YfpMyMQHiWTOggoc6Fq3hSkxxEctp8pXWFBmfNQNsrdqABp4xCAHQ6US%2FyiBPrafzwOfp9Mbl2Rgf0v4m5gETwvtXi5nOL71KE3ibNkOcxk2FOY6cNygGgGKphnZgvaGVhxqop5BU%2Fz16Wb52HYgF6vApt7WjLYo%2B%2B%2BV1MAS%2Bh04WLv%2FjN8LRGLTFPUvCVGJknUA5MYhFypkCBSLEiW5VXPoTIMy2%2BJSJqw4qC15vL7W1Fvo4zps8WBahiJ8UpIFf2HdZF7zoJg1h79XoIceK2Gy0kJUgsVY2SEizfoOkFGfmn8%2ByJGn2tbtkoItlf8Y0A1OfnJPzB9tlz1VWB6dy1CnqdtefB%2Filec23V36lphqt7SYRgOzJ2MMRmxl7HtYn7T0sSGMuVD%2BUiQhtI4V0R2uqK6F4Cosb751bcC%2FooRGdGKUdJtgvxd7o6feaw5UjUdyi3KBmbg2jFlyT1%2B7z2TsFuiJaesBqN0Ap91N3Jgvd05%2BrupE%2BnM3W%2FhIGQXTS5wYOQYa3z%2BA0mHnvMlbbQ731v3Rw46V6%2BvanY%2B7YwqoSKzwY6pgFw8oFgFb8zNaIK1DTk2RtZXnoPhX0L2pExFVOjLjyl37P9%2F4KPmnaMWR3NtOur%2Bxaep7zHmTrjL2Y1HEQBgdRGKJZ%2FCas8aApX%2Byxmba6vQN26bJLkicGcLRJPta1yIk1e1Uuw0rHF6sdO5r%2BeCugzGXbJEZU%2Fybd%2BoOFHrdeah8Z3vMfjmrjnpuSAkDtesDQwXheztK3EMwJaXmJ%2BxrQ2DCPkTQig&X-Amz-Signature=9e2dc867af205fdaed8fafd385d7dee61c1d20dc98d5cb6332fc14a392fc13b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NJWADWM%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJHMEUCIQC5mR%2FNutuqK0kZv4tZG7fNfmxNQFx2k%2F6svk%2BB5PrprQIgIQBpXroOm4t1zqT8DjSnu5crxYQchWHKuO9aMAWwPQsqiAQI3P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAXvvO%2F2Hg5oM0n0cSrcAxa%2FFXBfjqbRcMYMZPgdMcZ0FhUIuc25d%2BSoIq4TjKEcTF%2BV1aE8pKeplqyawLbY9hbF%2BdEDpOok2Gjw9LI0Egag9pdvJGGuCoArKHW5JKYAtkoYtUXhy%2B4e4Liz3nxJiv%2B2fFktBPIG1NBtO3dkniYi%2BgYO0JMLaCplOu6hvjAbpdKhUY3b3QxStfwU1r8KotUsZAFE446JeT9ga6s5G3yMXVvWoV9V%2Fxn5pf3kVZBRPdOTrHnDFrZg1iILTHXiOnGplh1nYR8OsDSesmBMIRTlMuq8sCnaAW5J9zHxcx6fDVzCBt52ryQzao9Lp%2FsgnDjT3o3xUQAUrv4MvknFV0nyjWBVnMsCo%2BqfKVJ%2BWsBLYDM2Yr6BSPr7ysHFY0ezXckJBqSFU1azXLS7088%2FAxEpax80JI8q0t8NIDcdblUzlINgzhwGuyxJqKvl5lYgOEqgJZC9Hj%2BNez6UbSnlt%2BxdizE7%2FuIAnCEtrMK%2BOU2t13esg%2FdhKAV36W0eZEuHKErUSJEjArpYhNIqLrcxLxRKyKkx8K2G1%2Fba5Ge4g5DSCzfXZSo6MDl%2FcYNFV1YEioS%2Fvi1F6Q0%2FtOa91sIIFFW1aGegZN5LQvufCpodvq%2FUhlS%2BGPw4ZM%2BDNRmVMJCEis8GOqUBjKlrJbEmXb8Ccs3Pzx9gkcHAaZoRROA%2FvJz%2BhwAD%2FlQQJh0kAFQ4Vi5ATa%2FXdH564UvvL1Gh2iusuEyG5LP0geYdiZwB%2Foop5X7XrTKSbgKPS47rY9BAIKFhk%2FVhAJD3GS6NvkmKxS1%2B%2FiqgVCYJA9PWfNoedjeJLDXnBnNrYWFHJOtIWyQdtQovEYR534rxHTJe5S6S7k%2B0X%2FTPMKB3fd7k42Ri&X-Amz-Signature=419dc590e1d77998b8233a39bd902dc38aa4d50fe811ce00a6813d7e4377f820&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNJ7JDMK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIG7%2BPdqAm2PuNKDj%2FxrEkE7ChWItXfEgO2zYnfzOgTWEAiAtp2y9rGM8hgND16kgNJ9RQMUPJRFbUtIXvvnsWEglXiqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrgyPN%2FZc2qYVSXFHKtwD%2BX9bWt93gyOZlFaY4iiYLvfZmT6Bm2EnXLcmNHQ%2B2D3T0nAli%2FpNdZfy2cDgauxanxNihdHyrzt7%2Bku%2BQU5d9OTtP9PbvADFLwbx7Tf4nRvRT9669fHFTWF%2F751wxEaAM5YgcsSvNwwN7GWR0nhUGKv7GuKCHHTHFoYyd5maVOSJJZfXb2oDwsKHAvoRUViTtUHvAvBa9QAly%2BODUs9Co2TIgKLNoKEv5xPvDjNJZ%2BmDv3tBFhNXwa9lnWguhU29tt37hxOlynG9JjQi%2FY6%2BXnBVpLp1px05UQalXMsHtep%2BHEbQFjrlXxlGYE%2FVcKHpuPWlpD1iD%2BTOCX3bwGGAGlD8mlWRGF%2FGpX4Sbia7weeccTOpwmeC1x%2Bech%2F%2FL2N5syeFNihHPXIXYnuCy%2FCnbpzkL3kBOZNk0%2BOga4IpjDfb%2Fa4iNw%2BU4tlZSjHOJRWKD9x9BATT8AgOdBVXRJlNHgBtY347elxoqPIYIKypt%2B%2FGGQW7TExQhLErcZ9g7e%2B9JOv4NzZDEDMgNaA%2BPVpRi426QfO%2FzSQD5XgrtWgkPuFF%2BL%2B3lNKrdcinXFYaBb8RreDO3Hxd0%2FvVAsXxlBou%2BNxc%2BxMW7mkrpyoBdUNzuSHBdPYqBDCHQqg9fTQwo4KKzwY6pgG9HhOexRh%2Bc%2BMS3XK2WozHatxttVnF3rt7pHClZuIGF4hCOzgL6fqj3pCKw%2BjnTub%2FhaDFAxoobJelINt0wufE7XTbx3UCwvs8oCbe7kCv6gIzHrf0b9xL8MLinFFREXwLlKKL4dwb1k4EXYWufbW99zORIfq17zRTsvfMmrmsNMFBQSKJb1AAzIQrAIFL7ZhRUyrT3n%2FpSofiCqxsbuNYn4DPeMBB&X-Amz-Signature=e0afbb790b7f1f19fef0775b70308485e3340b4160a36e3dbe0f4c87cfa4c9f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNJ7JDMK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIG7%2BPdqAm2PuNKDj%2FxrEkE7ChWItXfEgO2zYnfzOgTWEAiAtp2y9rGM8hgND16kgNJ9RQMUPJRFbUtIXvvnsWEglXiqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrgyPN%2FZc2qYVSXFHKtwD%2BX9bWt93gyOZlFaY4iiYLvfZmT6Bm2EnXLcmNHQ%2B2D3T0nAli%2FpNdZfy2cDgauxanxNihdHyrzt7%2Bku%2BQU5d9OTtP9PbvADFLwbx7Tf4nRvRT9669fHFTWF%2F751wxEaAM5YgcsSvNwwN7GWR0nhUGKv7GuKCHHTHFoYyd5maVOSJJZfXb2oDwsKHAvoRUViTtUHvAvBa9QAly%2BODUs9Co2TIgKLNoKEv5xPvDjNJZ%2BmDv3tBFhNXwa9lnWguhU29tt37hxOlynG9JjQi%2FY6%2BXnBVpLp1px05UQalXMsHtep%2BHEbQFjrlXxlGYE%2FVcKHpuPWlpD1iD%2BTOCX3bwGGAGlD8mlWRGF%2FGpX4Sbia7weeccTOpwmeC1x%2Bech%2F%2FL2N5syeFNihHPXIXYnuCy%2FCnbpzkL3kBOZNk0%2BOga4IpjDfb%2Fa4iNw%2BU4tlZSjHOJRWKD9x9BATT8AgOdBVXRJlNHgBtY347elxoqPIYIKypt%2B%2FGGQW7TExQhLErcZ9g7e%2B9JOv4NzZDEDMgNaA%2BPVpRi426QfO%2FzSQD5XgrtWgkPuFF%2BL%2B3lNKrdcinXFYaBb8RreDO3Hxd0%2FvVAsXxlBou%2BNxc%2BxMW7mkrpyoBdUNzuSHBdPYqBDCHQqg9fTQwo4KKzwY6pgG9HhOexRh%2Bc%2BMS3XK2WozHatxttVnF3rt7pHClZuIGF4hCOzgL6fqj3pCKw%2BjnTub%2FhaDFAxoobJelINt0wufE7XTbx3UCwvs8oCbe7kCv6gIzHrf0b9xL8MLinFFREXwLlKKL4dwb1k4EXYWufbW99zORIfq17zRTsvfMmrmsNMFBQSKJb1AAzIQrAIFL7ZhRUyrT3n%2FpSofiCqxsbuNYn4DPeMBB&X-Amz-Signature=00015ee5c6fdd25666fb856beaf8d280c97a451c7aa66ee4c80d5e96d5a84c3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGN6PKD7%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJIMEYCIQDHy9yVBSHfz4Qz88L3UnzUjyBZj0J4%2FcmKvK00uj4jUgIhAKNZDjafVCX6iAW0dNbPP%2B7j6nPpUIuEt54Ms6QAszQoKogECNz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxNVpBe0dE6yEB5qtgq3AOVAbbp0wAOWWrgCTtcz3WiCmeJeEdwBc9fZbiBb1PwJGmVSWXii875ZavG0mfrdC%2BNZzmF8KxZ4Lz7M4bEId1lrol1Eay4PmoGzBP8L3zxSa1wGnFDpQsccBhebrZAAZwQJh1OpCp6Mad%2FCtOQqAX41ZlpdebKEpDri0yntc3XO3tLci8nRU5FBolOMZnEUwrhcURjXNCuoEtxDY%2B%2FOzIfD3lmrnulLSCDlHcs5%2B9GY805olaKoLCqdeiGFPETiEz1vaY%2BVR2s1YyW97JDg1d4%2F%2FYt%2BjJqLOj%2Fp9EbI0hayip7s6XXAOxSqiwuCK1USnoNzDwk1h%2FQ8KiEEhCLfVJY%2F%2BThwqiT14in94hTIx7UtvqrM%2FH5By9zak388a8zluGogsbtGzpxv3JJNbAlj%2BdJ1YtBgDjTMyhWs0ZUU68wwOqbQCIQx7XjNJoyArkCFLpNl5tc5XkxwLhnOYmXk%2BGcQLLPdydInpskX1SPBsWlsDTI2H%2FwIxwMkOvJm3V%2FnPsVu%2BWm8v41zUTTePg1yWHU99U2A06uG%2FE02hxLItTsDXWcn5Rae9Xvgzad5D7FlTt1M1H3hXOteexdvBXJpxoh08tM7wsFJkruBTN6HWwvJMpWd%2FMDJkLS0N5%2BjjDuhIrPBjqkASslBAvx3Ae8pNDA%2B6NOvdfFG%2FBgsDNo7bIKrt2gFH6zik4WVvOz3nWVefHEFlgecrHU7ozFJALD9owEGBG5XUOHRHyD7nwW55k66a6fz2U%2FbRgPM1SDdvuLA%2FVviSBrfMncVI8Qoz0r29K8fdCeqgJvKrxqF1HF4HF87dH41hnsVPAUdHGFmOeNRraBdAV%2Fg0RjuICaa9ibOpwUxB4oWbm3JVAo&X-Amz-Signature=30184d3485b0174e572eee9dab497b8fe2b54277d4a32dc8c50424e02e75bdd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYJUB3XR%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIG5Fam0ykRZg95tp6Yp9u4CH55oCtTJn%2FLQY4xDYPenRAiAsJ8mqjNXuWierCbYMN6JImaowNh%2FUgy%2FaWrAwkI9WRiqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYaRNx3yc64PWLXmiKtwDwHJ5XGKyEndJ7Ydl4a4Kj9pHioI3dTSQWtiKvc8NXftycQeKTmXz0uVBCJfFC47y9w%2BKNw6jz6c%2BOL58V4zQnqEMlQ9nsJ7R5FcrYKsPVLB8ko%2BUi5D11yXqSWMWtZlpjAUnrFRIQM%2Fmo2mt291qrGejUTqNHpozBAFbGPrlTmnm6rPM22OqgcztbIkR%2BJWpMEuAIQFuelKBrqs%2BVAE9nsOPuJDOhaDNqjmDk3mGwRwzYBg2f3Y6PLxjvtdVwzPvkU%2FXmLZk4YhWnNcKOiThoN3islfMSAquAeXNaxDhQgvaFWSP4g%2BtenJs7%2B2tcM8ezpxcKv54oXbDPsenZNA192bd0VTmrOKA%2BGiEms96gVY2rWf87mEVetWDCmg4GnGzIYgMtoED10oKvJlLx0FRThYLXOt9s5Va0wxcGMBiaHbboA3MJOPeZtEMUz2UEXAFrnaP4XCwksCWXh35igYCKLU3jdgfcEczL9YrLyY0gI927BPfF8gL6D4cKUdqAb5UeGmklUh8qKcwxg7xgOJPr%2FCwou7sXCNyW7OujSlm5BeT8D2WX7F3hhvdKUJc7MnHe%2Fh7RxXi8N%2BdWX4KbzeeqCbCBoQ4jU5MBLqMScqcgofFQZ0aJIGVCPSyzocwuoKKzwY6pgHmKfHKsOU5awZC61YAVo7xqqDcfPUdMf7NvSbrP%2BoHbYg8ZL%2FTXeMWUE88OuIPW%2BzsixsV%2FUwpCaMyOMLINKUulZ7JhoHRoN7M%2B2XzGetiaARULenkCo%2Bl4bGcTSDnlNCCOS6hhYNEM1EmvNGKvkPKRk4SvgIvBH%2FWxBgvDSJBTwyw4O50qSgGygqgjPmsNtxyZIytkm9FJly%2Fr5McDBXpdMOvki8T&X-Amz-Signature=07bdcae84d4a66ec1f6d85e5b3618dbc20a45e6624adfeb86516f1b36e249a84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RE6M2UC2%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJHMEUCIQCBS11tyw8stRZ5C%2F0q5sHBbrUdAyF6C7uSz7V4Tu1swAIgDu2QAI7bLMtE6lKcP2kWT2QJ%2FJnHE3ighVNomw3sIUAqiAQI3P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP4FMLVOELvAs%2BgRqyrcA5SNI%2BLKXIFPFZQkjttOkA50esqSwGHp7Weq0a%2B596gvhtkVIshATQSTkVw67Zz8T676%2FroJ5IVL2vPkE1hWlUPKchJwR8U0jmjfT8JR8sUvALsuZ2xm%2FZgo7Wk3g1gx%2BXFuBHitD5dAu0D5uxuCcfr7CMawSIncCOjPrrZhPqna8jxWkPgJJxvoC%2BIHikitVc%2BiCuzdgIOJmolJq5uq4jcKkzh%2Bg2b0%2Bx4T1%2FGsQKg1gOysiMOLxHnDxoklwgwyuO3vFIYZUVyuFVY6tBoATGz7%2F2XosNYfqs82Vl%2BcSmZf%2FMsC7n7eVntrkp1ioUtMXGq5ni5CdWEhef92FzWPPHIb1HjXcVFlp8NQEWSZqlmEYCnbde3weICHmZlorrg%2BKCt7m8zbW5rApWFGcfwrDkBYJHM1Bjgwwqt1D9KoFV5369wp9qN%2FoWNSaC8lJGh12UHHyVLNOI3GibZvBNKtJklRFYqOFw3DfTZPH3udnT6kkP%2Fqz%2BVVuqK6DmK%2FPcJptL4sRv%2FQtDFEUI%2FTjaTM1%2FoSEf8oOw1ro6kmmcG%2Bsvj%2B3BNKME5TcUIXKFwnucMzQs1Ep3Fk3As%2FEC90ET%2Bs75RCnMxHwScPsDP4xRvcX1yvtNp7kPSSun%2FNAfplMPaCis8GOqUB%2BXbZEd7yb3OK8SOKQ03bJxEuYoOFfJFwedURif7RE3Mo1yOooJI%2Bv%2FW5ITC%2FPj2ot05RvyzSa7FL8zFj7HGMuyB6Be3MH%2FDXpE9JJeCaEk23efxX64VAx%2F9%2FPiHyRbg2Y3h4M3yW7V47PvQsr3NHuKHkf4mOMTIcHWAVspkO4pe6j3LpCYAPOUxsH%2BJLhpGX3Ce%2F6shgfwDgJIbz%2B7akVx2TIMv9&X-Amz-Signature=7b055bce45363864035731dbb9b6c3ab7a5161264c570e9ac2a437dede3d93b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZC5XSN5T%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIG%2FE7%2Fbw2%2FglmcEpEOZWbhzMJ%2BiN6dv5IXcnp%2FQ%2FMHPsAiBd4oxagTzY0Pd64W8jN6XXndyotuXLP8iQoXq7xCbiBSqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMM8WY0Wg5%2FnLXMBtNKtwDkxUAtqAOnosEQCllS0Wk17JPRBPfrostdFrBQAeiE3bZq92LOrPFJTi%2Fse6W%2FHf14rVGDVJQXSc59TIYEBhS9fZVh%2B9Ori8cEPphzQs049F6myAVgKtmejiQRkmRFgQFnO22QBCLZVtnoR1KPSZKeafBdDhHP7H7ywdA9KPm1Vw2RQfWTP23DwT18OQSWJaJitA709HyzLqWMPC%2BaTRa3CnM6hB%2FkwnbKLltF53HGV29ju%2Bnm5049BiCgN5K2Y3If1cGA2HIAzlqKEdUNWOtr5YSdmnldNNshE3X%2FD7lZn618WS686rsJ6XPOOzLGT6DIhe507cX91fRa9BcpnqfEdj9ArkdNEClR4vJKv6ZrjUu1eoF9O39vcMAef3FyKKybRFz4LSURq8PeosQl5A1NfMmq6xqlwy4b2RCqGZTXCixcV5BBqn5CHHg68SqtPqNMvBnGFFbAsHZ%2BdZLddtQdNl7A9Nm1sW0XgP3iJZ8XMrWJyS5J9KezJTtOQ0ewpGp5Hbcya6sHr%2BRyVq%2FI9CZFZSSlMPf2VU1HAsNGS6VlgYMZn39rwwzFE2QvPRD9vfknRLgazhiLTuVUiMJFa6N5xrW7kA5brigOqlTu7dcOymK1QMWxm5JJEp%2B79Iw%2BoKKzwY6pgERS2kMEe8jjTh7cNrrO3haRiVHx3NOrvssgi4HL9Ofclk47JT7IC1oHrMEz02XnNrWhPwVS3k8xtxHLXAhEy3yo9uYd%2BaWX22TFWYYdnBg4bBLLaPoFBOCU9t1WDT%2FICmEtM4dEwxjiDhO4Ud673tZtx3bAPiz7tP2h03cDNmC7UsZt5%2FMXHiQUzSBBaJyybPgey4xMBDthwRhueKZ%2BiywM3umN4jp&X-Amz-Signature=18b4a6b097cfa1aeb85ff635f86f98274ccc45d00156fc4225044ad429ad2d62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZC5XSN5T%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIG%2FE7%2Fbw2%2FglmcEpEOZWbhzMJ%2BiN6dv5IXcnp%2FQ%2FMHPsAiBd4oxagTzY0Pd64W8jN6XXndyotuXLP8iQoXq7xCbiBSqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMM8WY0Wg5%2FnLXMBtNKtwDkxUAtqAOnosEQCllS0Wk17JPRBPfrostdFrBQAeiE3bZq92LOrPFJTi%2Fse6W%2FHf14rVGDVJQXSc59TIYEBhS9fZVh%2B9Ori8cEPphzQs049F6myAVgKtmejiQRkmRFgQFnO22QBCLZVtnoR1KPSZKeafBdDhHP7H7ywdA9KPm1Vw2RQfWTP23DwT18OQSWJaJitA709HyzLqWMPC%2BaTRa3CnM6hB%2FkwnbKLltF53HGV29ju%2Bnm5049BiCgN5K2Y3If1cGA2HIAzlqKEdUNWOtr5YSdmnldNNshE3X%2FD7lZn618WS686rsJ6XPOOzLGT6DIhe507cX91fRa9BcpnqfEdj9ArkdNEClR4vJKv6ZrjUu1eoF9O39vcMAef3FyKKybRFz4LSURq8PeosQl5A1NfMmq6xqlwy4b2RCqGZTXCixcV5BBqn5CHHg68SqtPqNMvBnGFFbAsHZ%2BdZLddtQdNl7A9Nm1sW0XgP3iJZ8XMrWJyS5J9KezJTtOQ0ewpGp5Hbcya6sHr%2BRyVq%2FI9CZFZSSlMPf2VU1HAsNGS6VlgYMZn39rwwzFE2QvPRD9vfknRLgazhiLTuVUiMJFa6N5xrW7kA5brigOqlTu7dcOymK1QMWxm5JJEp%2B79Iw%2BoKKzwY6pgERS2kMEe8jjTh7cNrrO3haRiVHx3NOrvssgi4HL9Ofclk47JT7IC1oHrMEz02XnNrWhPwVS3k8xtxHLXAhEy3yo9uYd%2BaWX22TFWYYdnBg4bBLLaPoFBOCU9t1WDT%2FICmEtM4dEwxjiDhO4Ud673tZtx3bAPiz7tP2h03cDNmC7UsZt5%2FMXHiQUzSBBaJyybPgey4xMBDthwRhueKZ%2BiywM3umN4jp&X-Amz-Signature=881aaf25be098874b3c1091b8157086a9e5631897d385e613d9d246a7fe79aca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AIC5CNB%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJHMEUCICmTRGmrNl3HSDiv%2FFGtWZ9%2BJ82kGnI8d4KcIoYMgaVXAiEA%2FWhh6A1MlIpu7tCHbrflb4ecLOs2qCVykbc5wUTsxRMqiAQI3P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPtbK43pGZW3U9kygyrcA03KshXfXXtsGNdLNND8WHRHl25YyyVT3rkjzRBFUcwxGHPOPb7EPZmsXzANY%2F7M6zd%2FoGtPW6YH326FqGzrQZCrdxdI8NA%2BbtUqqAv1yKGh0xsHBokviKn1Voi6%2FYgL7DpxGCqcdAxRXQD0AYwxFwJQtRp6O1ZkTBAKOWkeNonw1HZ1kPh%2BhClGeVdHacrlQpELQAept%2FW7s7qilBUDfur1vo2rurk%2BNb8xxG23sqmyIuZayJLChp3X4HJcz1fUlzVw8Fj7Hxc7lGVgyB75eEdlxQvPnbyztkZCLTCWO4G7ldagWlZ12IlPwKF1p9viK5LtG%2FTZLPnQGQ5YKksA1oXYJE38oYOo19%2FEAAJYAdaYg7KcDKM280oaj8zMfiZuhKYq3IjJhlJffB0NJgGR0zqDWnsyKQfCgApXENNAntsc9Kn3yEekXkUWiOhVItphvqbWHUesAV1WTQG%2BufvKcBMLoIxRSgG2QSx9ZRiKLlbSI56KloyQFq9uCf36wLW18q1vorLnyh70%2FNS2S5yCWM4CfdKK7l3FjqANoED%2B1dntBEBWHdjGenrrc1HfZZ3KxS2Z%2FtXicmy%2BJzsJU4LTPD6wkAH%2BTw1Ok2G4NJaWpQxa%2BWCnq38R32SjVaZMMNeEis8GOqUB0OdZqqu2%2FbDOBetb%2B35E431YTwEsK1MMe7LQgBbjAJHMwVA6sthDJ61hgf3mQXm2Q5MF9MgR1DF0pOzb9vg0qYmxR1ADcrkIla6UTO6SM25tcylqOyLAbF3bA35uS3d%2FFydAIMvc37y1Lq2TGaOVrOuy%2FhEio9gHrH8I1eFurJa6H977k6mRMKoGK2nIKeXoPBnQVrpTdqDV2AFCKZt3HEOY9esb&X-Amz-Signature=ebd661f19ade6a3263c9f3633ede0334139dd02bf95fa63f54991d6d11c063ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TXOIYBI%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIGfwBIwMLlDU2XIVqT0MspM6GN42jsesudnUEEypGQkyAiAgcj%2BfUmA3siBN1fziltAzUYPqzROJnlHgmNrxc3qyvyqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BCz2fE66DIohORS%2BKtwDswfCOw%2FM96KlPzDaPL%2FxCRFsYOZ%2BHq6UoRB6C%2Fxc%2Bi%2BWNKAVxzo8J0MNisUWN4fzm3ZS6gR%2FPeLTbiCMcD1sd1WctPY0nQ3WCVI40imtkeQfwvIBeyaCHd3cEzpDTwaHJMk8T1tTGWmpdnZjXCW0jAWOik8K%2FWK9vW9b9TX7dHEHx9jiTUGncBssHCBGAc0Z4UGzdpixLcVoq%2BKTY0H1DH9BnJQ%2FDg%2B5ympRSsQKzsMBA%2B%2BzPKaZ3jwIZzM7DUk0YnSZNMh0CbsiU3N%2F3%2BnAIkfpuxV12SEOnX3B7O1Q496RQLa3pSxcrHl1rzMDKHHz5LJb9UV%2BrFo2JgOffrvs5ekWK%2FKB34FWBu3IJ5bVVjMKoJO4GfdEnvZviOw75zBEhnnIb%2FqeEY0E3%2Bhi4DN0vP0Rp%2B850ydnfyTDlU%2FuWjaTYZ6FgMgE5T9cOrpyHByCZUVd6tr4aRlc6N2fzlZS3QtvYqHpJXNRgFja88QW5J12y25dhks%2B%2FtKg4DFOqvIOCCft5Blrb5nCQ%2Bm5RsmKRWWKrPyZjUtWzWDpDIvYW%2FgwAL3K4wqDwy%2Bf4CW%2B4SvVw3%2BOkPSD9llqfSdsbuJFQTAj2lMkpvvWTV1THPA2%2FhOg0%2FI279uewF%2BOQo4w4YKKzwY6pgHDIie9QryGKWw0XsggUFfMsHtiStT7X%2F3yR37Ht1GlFiAjPUC80H197XBfKNFmPtDxpDpbMXqhGCfLADCcrd4OdgnpKSdJPSMf9GeFcvmSUYSscmqAb51vumPf5l3DSlYQyNwo1OgvUlEiq3K1Gq45H0OzTgkdhOZ0M3v14U4emMLN9z0OAqT%2BYrfSAxFZ%2BDbnt%2Bj0w15wu0L5VnOZN3EkPtsKZodI&X-Amz-Signature=177b142d277fdc9ef066ea3c88e8e00b90cea81588bf544ae3a705df40e45153&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TXOIYBI%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJGMEQCIGfwBIwMLlDU2XIVqT0MspM6GN42jsesudnUEEypGQkyAiAgcj%2BfUmA3siBN1fziltAzUYPqzROJnlHgmNrxc3qyvyqIBAjc%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BCz2fE66DIohORS%2BKtwDswfCOw%2FM96KlPzDaPL%2FxCRFsYOZ%2BHq6UoRB6C%2Fxc%2Bi%2BWNKAVxzo8J0MNisUWN4fzm3ZS6gR%2FPeLTbiCMcD1sd1WctPY0nQ3WCVI40imtkeQfwvIBeyaCHd3cEzpDTwaHJMk8T1tTGWmpdnZjXCW0jAWOik8K%2FWK9vW9b9TX7dHEHx9jiTUGncBssHCBGAc0Z4UGzdpixLcVoq%2BKTY0H1DH9BnJQ%2FDg%2B5ympRSsQKzsMBA%2B%2BzPKaZ3jwIZzM7DUk0YnSZNMh0CbsiU3N%2F3%2BnAIkfpuxV12SEOnX3B7O1Q496RQLa3pSxcrHl1rzMDKHHz5LJb9UV%2BrFo2JgOffrvs5ekWK%2FKB34FWBu3IJ5bVVjMKoJO4GfdEnvZviOw75zBEhnnIb%2FqeEY0E3%2Bhi4DN0vP0Rp%2B850ydnfyTDlU%2FuWjaTYZ6FgMgE5T9cOrpyHByCZUVd6tr4aRlc6N2fzlZS3QtvYqHpJXNRgFja88QW5J12y25dhks%2B%2FtKg4DFOqvIOCCft5Blrb5nCQ%2Bm5RsmKRWWKrPyZjUtWzWDpDIvYW%2FgwAL3K4wqDwy%2Bf4CW%2B4SvVw3%2BOkPSD9llqfSdsbuJFQTAj2lMkpvvWTV1THPA2%2FhOg0%2FI279uewF%2BOQo4w4YKKzwY6pgHDIie9QryGKWw0XsggUFfMsHtiStT7X%2F3yR37Ht1GlFiAjPUC80H197XBfKNFmPtDxpDpbMXqhGCfLADCcrd4OdgnpKSdJPSMf9GeFcvmSUYSscmqAb51vumPf5l3DSlYQyNwo1OgvUlEiq3K1Gq45H0OzTgkdhOZ0M3v14U4emMLN9z0OAqT%2BYrfSAxFZ%2BDbnt%2Bj0w15wu0L5VnOZN3EkPtsKZodI&X-Amz-Signature=177b142d277fdc9ef066ea3c88e8e00b90cea81588bf544ae3a705df40e45153&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHTPPBKO%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T194820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLXdlc3QtMiJHMEUCIG7nEzbHiDgasWCNNYHDM%2FkJ8GmLf1oHnWlLNSX1MmM%2BAiEAhi81BNN4G2qhpZ55iGI2GWxSWresYBIDF5F6cPJz7fUqiAQI3P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAWl22i8YS7lplJaCCrcA3%2BceB%2FxcXm4b0LuaN0COUZheamink4JHZaf94sl8dLCdsPyXp5ExidweNjTYzCXGbgjOcTWrxIHn2qxg3BCdWAHds6ajkkxZVue6Be%2FETCfi6TPqd5JFFWGRGXfc9G9YHRNSQ5Acf0kgnsEPj2p3sKlP%2FCTGTQYDpdaA7Fq%2FxEm9IJ15l46n%2BWc%2BWazIBSJrRs1Y%2F90K3cCERCUEk8CgyKhxB6ItzBCBh7asFr8O6cRr4OFj5mO2IF%2Fx7NpFBkoAKTshS1deX7I0H5J8aFuZjJvmQjsNUMCdfntRDszZFSpsqmMwVe%2BBEwXzJUHJL4VfWzDFdGB1G3TWL9evrkfiKm5gNEZtP%2BCqVOnB%2BykmA0gpq14oVq5aaQn8m4MV%2BpEVH1386CuJOynvhMdT8hIIoJ6xoWO8UKUCuBdMHgwGbM0Ibw3POQTkXJGBkXvdS2Jm0TMsN1hBLXLCc8NdNkol1AxZnhBrpwsn59aJP3adkdzGrTV9wDpIvUbdbal87SriHbuh8ypdhkCKl8KrF2QhswGe0Ku3W2ittNCi60b05Gr8qXjTiLEPnGh3FdDrOmp%2BUSGvnAQaDb%2BBkQxTbr2wOZGoHydvh4E2DpqJM6nXYDpMxTj5gsk%2BWdew7uTMK%2BDis8GOqUBuFR6%2FlAZEA72brJYVpGSO8saYRxlOHIyLUE5jrKsd8cP5dtaPy0%2BS9mftnpS9in03lx5%2F0txPyczADQ62uINmvWiatiX51xi11NjpmKfAaOWAdTz1SxN3f8EveVkPV%2BKO325gNZyWSnliT5wQq0jRI1dEl6zCcobuj%2B6nI5qoXTN%2FF15vNVVFlJSvUepaJI1plyLyAWdzsJJwA3O94Lft0XCOl46&X-Amz-Signature=5eb3401d8775dad0a18dcd97d3baf09a7403e40f5655a593627b031e3702ea95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

