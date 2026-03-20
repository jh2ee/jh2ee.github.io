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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKJN6HX2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIDG5g7cac8i%2FnNzWegczvoyQmLqlie0XmVGUrHqELs5iAiEAh99FzsFf39h305%2FBoazpeS3JrnaMhYgcZQWaLF1aN64q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDKH%2FRlNV4eAVQzOKJyrcA8jSt2bN5zdRRAAsYMbfe%2Fyf4a5A1U9vuD4cS6Sg%2BlT05icaHVXU8%2BzvBIceJYUpDyKpVQWA0c%2FpWErwxpbpLLs5FsktBl714vuOBY4NoMAoLVYHhjc8ydMIggA9lBdyawSRJIzUiw4jfYVTVA0W4TB1irxN%2F7%2BupVWSmttpTKuoRadKJyxTECDXx3V5457hBeM9Whvrj0T1rz7ZoP5t03Z2T7g6b9C%2FsRtUQoLSpAF8ROo%2FyiwShomdTuwNRKAzdk05P5Al0pUxJcqbakugs9N0XKaZ223a527%2BEZNSZ51Ljf6GmH6q6Ki7hIXToxesrAOF7%2FEPtgin0wUSfqpkZpVWEa8F%2B2CuAlCP%2Bj%2BpBdrtIUAk8ptV7bW1WxElnBJa9Hfx5sxGS7PlgpDis1ju5ibJ%2FpJh9Kb8uuewuFUwcABRhfGWwStrOzfuWYhRbZRrFT9FrVCg7kEnZpO45fwLUKmsS7QrSSb4DZCXoHTPnQfQciK2bIN4E0YONF26hcnHhqDN9BAwEnA2bvUN0DftIF83FFmGrKblsxQ5EIbv%2FhPjqvp1r70vGIpXvbuS0Db6SlLcFOUTEb%2Br8iwoO%2FxSUl%2BLPzdeGSvfYMWob%2FoMhgKzln%2Bal2OBevXG5s5%2BML289M0GOqUBBshbUV342ys%2BR5DLPWaAnaG2b4NA3ddKL0C8fYuqAmMQTQ%2FJwYiRjoKkPlj77dFdYVkuukUUPMSFTV3FE8ljSyNJEREMWus0wYpMc4bR7mZS7pTzuz3nVRW5D1bWoSBMjotQP3EdoBVqnYqsCKmnOFcgOSYvTwF9V6fb8u9Q4W9uCP5nzgaXomz0gfexXsxqBJCNommPsMj2NYyeEy6bMx%2BOh3f1&X-Amz-Signature=21e14816fb644e8ee30fe8d920acbbfa0051a62ed16f6d815b2ce8b70fb1d3ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKJN6HX2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIDG5g7cac8i%2FnNzWegczvoyQmLqlie0XmVGUrHqELs5iAiEAh99FzsFf39h305%2FBoazpeS3JrnaMhYgcZQWaLF1aN64q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDKH%2FRlNV4eAVQzOKJyrcA8jSt2bN5zdRRAAsYMbfe%2Fyf4a5A1U9vuD4cS6Sg%2BlT05icaHVXU8%2BzvBIceJYUpDyKpVQWA0c%2FpWErwxpbpLLs5FsktBl714vuOBY4NoMAoLVYHhjc8ydMIggA9lBdyawSRJIzUiw4jfYVTVA0W4TB1irxN%2F7%2BupVWSmttpTKuoRadKJyxTECDXx3V5457hBeM9Whvrj0T1rz7ZoP5t03Z2T7g6b9C%2FsRtUQoLSpAF8ROo%2FyiwShomdTuwNRKAzdk05P5Al0pUxJcqbakugs9N0XKaZ223a527%2BEZNSZ51Ljf6GmH6q6Ki7hIXToxesrAOF7%2FEPtgin0wUSfqpkZpVWEa8F%2B2CuAlCP%2Bj%2BpBdrtIUAk8ptV7bW1WxElnBJa9Hfx5sxGS7PlgpDis1ju5ibJ%2FpJh9Kb8uuewuFUwcABRhfGWwStrOzfuWYhRbZRrFT9FrVCg7kEnZpO45fwLUKmsS7QrSSb4DZCXoHTPnQfQciK2bIN4E0YONF26hcnHhqDN9BAwEnA2bvUN0DftIF83FFmGrKblsxQ5EIbv%2FhPjqvp1r70vGIpXvbuS0Db6SlLcFOUTEb%2Br8iwoO%2FxSUl%2BLPzdeGSvfYMWob%2FoMhgKzln%2Bal2OBevXG5s5%2BML289M0GOqUBBshbUV342ys%2BR5DLPWaAnaG2b4NA3ddKL0C8fYuqAmMQTQ%2FJwYiRjoKkPlj77dFdYVkuukUUPMSFTV3FE8ljSyNJEREMWus0wYpMc4bR7mZS7pTzuz3nVRW5D1bWoSBMjotQP3EdoBVqnYqsCKmnOFcgOSYvTwF9V6fb8u9Q4W9uCP5nzgaXomz0gfexXsxqBJCNommPsMj2NYyeEy6bMx%2BOh3f1&X-Amz-Signature=21e14816fb644e8ee30fe8d920acbbfa0051a62ed16f6d815b2ce8b70fb1d3ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RI6YGM2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQD497gjVLWbBoZJrpUHFvClIVqB582bjwe0sv3vMCmSiwIgOu2SKwZx4ghv7cefa6RDkxEf%2Fx4Xf%2F%2Brba9XIG9H5YIq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDCEDiBD44LnpenEaHyrcA0FhOahaOwE038PiaKx2nynLRdYu0sUU8GHmx2h47kl8tXzH6Q9J6rEF5ob4SdKrPbEjtA7GB4QcIrCg6rVZalJTPg5SuQjXP4R0FoeVaUPKrp%2Bj2Vdl7avPTDXIz0xMkXYGbNPSXthwNXQqU6S3FSff%2BMdHJVs%2F6ZP%2FV1AMLVqGFwSHP%2BnmNqmbbIc9YX8ELxCbbWeOfKi45O2aB6oSxMBQat7Nkyait%2FEagEcNDZ2Ww8dlf8SU3JV%2BiCZXTnhiT%2BAVWFqrkZ17%2FfsJAGlp0RMmqzlhrQH5aXpVhIJ9QHRJQvwT%2FoZZRCovYUO5vkEgFM4HUC7zDKA6mQhFazaVwivTc9kQegga38KdRsQMzcwvYCoQ2v9DeFEtGZQGfjL1YjWSTHhSAGCD0PQhqc2U%2BuAVnWQsFSkjAtMNL2IpeLINPFsw%2Bmu2K4IkvZFq0EEivKOwlIPa1lDNMNJIaS3RaBGiZ4e7Q76YG%2FM3HrEaspHCZf8Ph6rJeNHzx%2Bxb3ncKz%2B8J0Kqn7iPWnrLty9ZoRrP4K7k51DOidZjOzCCXKFrcXT%2F3f9hYPTEyu9JnWndK7mUE7mKvkVZx5NyNiQNy6dIRbTW3owmR6kDO0dtVaMdB7cI4u%2BM8gAuEE%2BxzMNK89M0GOqUBYXTD51Fo4akN0OoxgKeAMGZrfhFIcJy3PEJuBTMHWYdQroh5je%2BM96%2FcP7ei3e5CQwQCYp68buFj9JFfbyO%2Feyybk9EddchHEv4oab8bZYbSXhGHsMSxiE9Oyrq4eLdAlwe%2Fs88swpiO6xwwl7O7Vhpqqyt4CwUuG6uOj1xz4UZxDwAqSgKkgsr5J1AhAFl%2BMRaYQ0yJC%2FtAZRS24xHAjwQjpSap&X-Amz-Signature=59e80fda16bbf518e56d78ca02de223d5eee1a49a471423f7ec50d8a18eb144e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ATCMHKD%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIBc%2BRAxjOCkx8RQ4isaLPsOFbzaaNQ56BpJIz6G%2BwmfEAiEAj1QJ02oT3u15Y4nCOiOBTl3dVKMutUDyy11mqhGVejAq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDP6aficalk8gHEMk2yrcA2rbUbrKL7YCNrBTNyH2e%2B6TNaghOXMnv%2FVufQE5K3zxcvCM0Od6FIAo88AtSs8aUAAgyJZGxk3nBgSAxGeLSamzIl3Q3R2UDrdKptdFUVEGSw3GbljVvdkOldxOCbp0tXrIHczBpAoLNRNXSPP%2BsNfvuFigitPrEpJVAu9dk%2FFZucGmLnHQa72TJCXUJscR6tQn3ts1r1atsBoA%2BGJkHQCdC79H8f4CCLaD19nnRDxpahfD%2B9dpgT9HZBD6uyyxdjiQpQI9Q4wkJrDYF6%2F1D4QnN6UcdH1241fLVkHJVidfK9VwWnFtjmkm%2FDcLsKY2lrDvIjN3VUjG3qhUHsn9G7YI57FTzz6oeeFfTkwF%2B7eEx47sa9JsMD2XX23oSllkagTKV5%2Fsl7sW6FXdNNEasYIQTQt0rCw4wqJXTClH9Wo%2Bn8AyvsG3WgzYbU%2BsrV6aHWYonkZaa7CGFI%2BKPX%2FDVf%2Bm%2BhTt215iiEX1ipPbo1ROrz8KM4tyUsHtYjXveBs2r9yA8Nv3n%2FhyUq8wnpkGhAaMqOxBnDhheu%2FmY%2FYCRusm0J1MKpaoPjfb2ZOP8dxXGsxMBkNHDJsDT9%2FhY2%2Blb0Q8mrLvBpWEIgf4WbFIigYBHMrT8JT4Pp59rIf8MKi%2B9M0GOqUBfAYQI9PQz0c%2FgB6RAg1FYDehqh50iCfUTYBNifXFeMmBRynfrPNxNfSWUF81Etgdc3yq4bKb6oOZTD9qxCeW%2F%2FZtAmPTEnSm5ZcsF8ox3Vw2POutEGt1EYX04PBE5nrdGwlVmz5a3SuOtJTEsmR9yKge4STlvqpPDOCoZqe0mjZYHxrE%2BnAcHcbMAxGCS1da%2FUfpBfEaCaem8S8xURVkeL2KyxGT&X-Amz-Signature=4f3568ba975b6bd73c555a7caa1d16967aa2aa5644efbb283f523ffa06708010&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ATCMHKD%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIBc%2BRAxjOCkx8RQ4isaLPsOFbzaaNQ56BpJIz6G%2BwmfEAiEAj1QJ02oT3u15Y4nCOiOBTl3dVKMutUDyy11mqhGVejAq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDP6aficalk8gHEMk2yrcA2rbUbrKL7YCNrBTNyH2e%2B6TNaghOXMnv%2FVufQE5K3zxcvCM0Od6FIAo88AtSs8aUAAgyJZGxk3nBgSAxGeLSamzIl3Q3R2UDrdKptdFUVEGSw3GbljVvdkOldxOCbp0tXrIHczBpAoLNRNXSPP%2BsNfvuFigitPrEpJVAu9dk%2FFZucGmLnHQa72TJCXUJscR6tQn3ts1r1atsBoA%2BGJkHQCdC79H8f4CCLaD19nnRDxpahfD%2B9dpgT9HZBD6uyyxdjiQpQI9Q4wkJrDYF6%2F1D4QnN6UcdH1241fLVkHJVidfK9VwWnFtjmkm%2FDcLsKY2lrDvIjN3VUjG3qhUHsn9G7YI57FTzz6oeeFfTkwF%2B7eEx47sa9JsMD2XX23oSllkagTKV5%2Fsl7sW6FXdNNEasYIQTQt0rCw4wqJXTClH9Wo%2Bn8AyvsG3WgzYbU%2BsrV6aHWYonkZaa7CGFI%2BKPX%2FDVf%2Bm%2BhTt215iiEX1ipPbo1ROrz8KM4tyUsHtYjXveBs2r9yA8Nv3n%2FhyUq8wnpkGhAaMqOxBnDhheu%2FmY%2FYCRusm0J1MKpaoPjfb2ZOP8dxXGsxMBkNHDJsDT9%2FhY2%2Blb0Q8mrLvBpWEIgf4WbFIigYBHMrT8JT4Pp59rIf8MKi%2B9M0GOqUBfAYQI9PQz0c%2FgB6RAg1FYDehqh50iCfUTYBNifXFeMmBRynfrPNxNfSWUF81Etgdc3yq4bKb6oOZTD9qxCeW%2F%2FZtAmPTEnSm5ZcsF8ox3Vw2POutEGt1EYX04PBE5nrdGwlVmz5a3SuOtJTEsmR9yKge4STlvqpPDOCoZqe0mjZYHxrE%2BnAcHcbMAxGCS1da%2FUfpBfEaCaem8S8xURVkeL2KyxGT&X-Amz-Signature=4612f8ae05e7fd58f52d45c032fc26727ceb2e83f62a24ab92958df0e00749b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XWDETLJ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIDkdf8nXZeS2mksD7%2BZIcxLp6R5Js6qlJH7ApXWXxvFIAiEAlHU6tjGVbriPUaC0iS757QcTu6uiRJKLz%2BEANkDRiGkq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDNvMDXcCMxl90n%2FxXCrcAw9%2F12CVziLL%2F99Ti6D32xdBT8zxD%2BZ7rjsxB7KyWLykA6yCBJHpVbYdgHprOUahky3YTQe%2B%2Brv0cr9OOHu5C5tsE6T%2Bsz6UCKIY0wz9yzKya69HMec8ILrh95jcTWqMUHLBPe6JAHYCdB8yUi8IdXYy%2B79o4K7HQHWQqsyXxxVXhZExmjT%2FqOXLlXH%2B%2BwmCJ9rNCBO0yI9BHnAsx29ZptMhvXvpJCWQ51WZOT6tRTA%2FDBlIv%2B6LjmvNQHcAxdpLYqDQCmyyMQ%2BTLdfH47cGBv0gwB2s6CHMoVywYoiudpgHjNkASjb2hPThnYzpICXNyuEIUONjMWh2Vcj%2BEzXb1QnSt5m8AMIyHS81FWZrS%2FID9eKujzq52%2BUmZTLxBiDLto03d0rEf8lzW9GsxeJlM38anV5MfErF%2BQ0gX5aNkS9UZWHEBRuNxbv0LMDBT%2FD92lMCDc1bApGmKgPTe0KXU%2Bsln7D6b1mXu9xwh8tnw5F6Nl3CHkrhINjCDJMoco1SYov6aWadiX3d%2FwNz27o2Yl0MBvRFRsq0dHE19t8GNiA4A7HjNybNa%2BRg%2Bhajpu0%2BYFaUwfkloEdmDX9lwJq%2FjEkRxIYoX2sE%2B%2FNNDLuBGwVhmmyS%2FLsQ4qMrhpuiMNC89M0GOqUBH%2FpheIcJddAOcTtISy1C3dtP4%2B8p0sP8kO3Vd10ahD6k2a63NnVKcgYGywkGX0UeNqYJ3UC4dythZHKUfNsunB%2FDexdjiktXN0tMyBR2ocT4nVONhpzxUU%2BnsUqgwcm%2F70VWDcVb8IbKCGlS%2FqVKMaCXB0SmlYLEjVNB0QaO3sr4u17O6cNv86S138izgU5QMU%2FjruadWId1ACwY%2Fq718xv1YSHA&X-Amz-Signature=b61fbac831474d30eeb3f1098ae002541d924c6fb32b4b5c9ecedf231afdbe01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z72KIOEE%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIAmJ8xBmZs2azcG%2FraybJWQH7iF6YgngmqYCv1i9hiiGAiEA83%2FY3OCK9i82Xva95zJWRuz02vJboAe2orZ0pAqsHL8q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDFHC%2FBwyn2SmoVvG3yrcA0e5UKjNZwXtoOc9EbHgq5SAvZOFGeRH%2BY2s%2FZU8R%2FYu9QkBq%2BLTm%2FYJrhJUBHWd0YZZubS3paNAikRODYqkiOYz3BN6JaDNE5D1az9kKSMM0E%2B%2BmLU2iv7W85C%2B83H2MdLfWMN6mcAJ4xE1GIshnrM%2BRkK6kCc2rFwfPQy8HZcRkdRqienBiHtvVSd6SqPHgypcjxVawl7PFhI8irloFi6WnRR7KVPi3M%2BA4lbAcG1WCB6A7wddVZ8rQ4SriH0ap75yEyOwW1KJKzDcFgkZPiiJrT8cw%2FuCp0JFmK74LOAwGiUgO37R9Ygbdw9lwb1A6K2pNHZTQjM6CLPh5MWVquZR37MRUrFeftKXaDPxvA7elVE%2F74AoLWKK1Hmhf4MAcla4MopfymDHH4mTxPF69Cv%2Fpvwr1VIoOvp8VgkM7diMZsVEXO4S2pZtMd4B0ovYiqpPuniQx6FfWcwvmhdDOcTRDjx0qnlJQ3UAOJm4RnOb6Ic5I1CcYCzlQ2anqUfpgmALup3pMj01iOD7pcQHhy9tLhnInM3JnvlE1%2FKwpVTJChBNHHNAVuarmCAb26sp0wBHCQ4PSJIOt3BwdGB5m1AQerPdyfRjJoHnkC5rYHBq5v7X0gUqHMvTj7hCMOPt9M0GOqUB3mGHqq5sWEPADlC6cJXqppDNrj9xxxD50VhcAb68V5FVIRPO1leBjIbBe4q4JWkfwiTyoCRiKwOIzDJXZ81cH4wzmA1H8eV%2FNu61UGHGwmLkceqlbRwWq5U6E17%2B8myVp8Jl4t7i%2BMT07KTJIdGaCL%2BSxoPo4j%2BXO%2B9WI3mbhO8h8bn7LM2LoMjZx3EVM2csK3hKa4qk8QeYvCVH7aKpifwMRRRO&X-Amz-Signature=95ff80f0f6cabd981aff8787292ff0fecf9bce9e7e3f59039bae33f35f34ec5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMLIRB53%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIBxVdfA54jxdFJ9F8Erhr5PQVc4uFYTRVzF8f%2Biia47dAiBOsSTc0GfKwhpSSaZeO%2FtfIHV6zNa1DSfFFBkN6DsHoCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMwc5yQuU8gq6vsAujKtwD6paR6Ruin8IHQOMbSvKy1llPs%2Boq7RtxQUa7VBmerzMqP9gg5P2FiNf5%2Bj%2FnXYMfGXD4sB4Y6vhV9OyuDPRBU4Uzh6XXp45fF9%2BsQ2HSWF0Qw%2BHC%2BHADWYJYx80CK%2BAR8NhKPPaa0LVbtYRHksRIdDz1jxlbBjgHZnFEQt0pal%2BUpjRIs%2FAQWT1qt3b9qU%2FZQ%2FQ%2Fd08iKf2N8eWSHkZ5pb5ZJnjBinC9X9dtp7a1mB1LhorVzZUNrt%2BBz%2BEG7UaBwVhYf9D%2BUnrXGKQ1z35waGGRQyT1VoSA0UTo6sx7l4gCeEamFVIc4bYFrezL43Q11M%2Fd5dzNI6qrPi6%2F21ifjLnOjXF5gmhAMPcKTYywy%2FaCm85EYo08iO59pWIMFmI1GE96JigkMQiFhCeskaVSzDwFgbl0yL9nvQDAE8uRiG%2Bwj%2BxewIq6KeN6Zr0KzeQF43nVk27Trcbf7Fx5GN9vK1hLW0X62Dmmg9ik5X1Gab9ORSm474BwzP0IleMKlrDGkva5fRGD%2FhzdEZEwHQ6j7f22khYJRuBn1CKmRLnq67JRTNWt9abE1AcWkOEaEY1nrpetXS76ryDzZV9gSnIedKJiyZuYMEmCAM6wPrFwVhJcYBd%2B145z72TxBDwwy730zQY6pgFnb5HEmz3QOeb%2BDFbw1WzgFAsnCywtF46I8rb1Q%2FN9ayhpjIdzpczxSyytqrmfruI%2F5WYQ0LJKMO3tdvSrWv4cTOOw93FJbEcOGYE%2BMNjV6ANCsHnskO%2FW6NiFn%2BZqRUa%2FlQboHrh8DuK1qUi7gsnpruDG9WQmIlNHGzEPyOe7YBstDWgdF2VdtcVOEbMZG20NPYonqnVnaFsqNJv4uERE7IeB0bju&X-Amz-Signature=25deb724cead8e73a774fa59cffdfddeaf660b381c2fc634a5b6ea4d5ffa32f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZN6RKGS%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQC%2BXDVh8D0nI4NuuwL8SwxiDjrgljPJI7NeQEXm39h%2BGAIhAN7c22Qq9%2FmiC1bTB8KjjHqwmXMKwolE6%2FBUdpRfyu8hKv8DCDQQABoMNjM3NDIzMTgzODA1IgxG3%2B85OxCoKNyV90cq3AMUt1zazfMtzcFu5GflyO6QjsC2ENXIuGCg7uM1XFz9H45Aajpabfg9VB8ae%2BasKBBVheV7hGngxfx1z9eHvFw957e4InO5jVmlibfeeq4byZ98jqwi7WmYKc4SbuSkZYzhvWR9sM96Nqp%2FRAeyD3Kk%2Fb3mIyh%2FgaOP%2BuJkobEfno63yc%2B41tjNoju0Jo9PD1ZeR3f55HZlbDu6PEaFdy0XNCFmfQtmhS0SgKCmcoMBrnv%2FT7onALBice0r530W1saBYaL%2FFZXcrrwZXHc2nv41uAtfld8fOkcJvnZ3ael4aMB%2BxkZiMt6aT5CMv9W5E8jTWsVT3gcuETFxA5mjEsXH7ag8g%2FFMVEMKYkynoLnMjp5BHZAzcH3o6%2Fc94FnS%2F%2BSxf8Ec8G9EnSZElxUSZUArJX9pfwU1dzTgC04T98DJnSdQyklOb6kN%2Fa9VCUIFxbTvBaNZBtiXWUZISAGp8n59uS8Y5ZV1rTtxEFxZC%2BJfPSxSL15ittpM8pE4cFAingKlHOrXpvR62WWIHLua%2BCoYaZq%2F%2B%2BB38HwifVrdDjrwMGYEWHvETMbXIw7O8y%2FDU%2BoYPn0Ung2D9TnFnP%2F7769namnZbmiEVUc0k8rTOzFWx9RVvDlTAgMBcpNyuzDd1PTNBjqkARVhzMqO9uM34jdbCi6CMOTX9RgoWsLyQ1GA8bE7fp55J702EwtL0jtkd0mmBBTeEx0wDqcHSfnW2lFOx3fNEv6CjYuHXjsRXxK33ZuTrwJzVELsOl9Vk49n4%2FfwgzcijyXWjXlHVjUasOvNuENLrnNTnMKPQOhDzzI0v81kFGszX2H7Iws9e%2BY%2BPMaRvl6K40X9DUqW6Li98FHu%2FfaXkTkIDom0&X-Amz-Signature=6a1e674b4af20d175aa086c79a5b9132b8993eb920fb8eab7d2cb67fc37cd343&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZN6RKGS%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQC%2BXDVh8D0nI4NuuwL8SwxiDjrgljPJI7NeQEXm39h%2BGAIhAN7c22Qq9%2FmiC1bTB8KjjHqwmXMKwolE6%2FBUdpRfyu8hKv8DCDQQABoMNjM3NDIzMTgzODA1IgxG3%2B85OxCoKNyV90cq3AMUt1zazfMtzcFu5GflyO6QjsC2ENXIuGCg7uM1XFz9H45Aajpabfg9VB8ae%2BasKBBVheV7hGngxfx1z9eHvFw957e4InO5jVmlibfeeq4byZ98jqwi7WmYKc4SbuSkZYzhvWR9sM96Nqp%2FRAeyD3Kk%2Fb3mIyh%2FgaOP%2BuJkobEfno63yc%2B41tjNoju0Jo9PD1ZeR3f55HZlbDu6PEaFdy0XNCFmfQtmhS0SgKCmcoMBrnv%2FT7onALBice0r530W1saBYaL%2FFZXcrrwZXHc2nv41uAtfld8fOkcJvnZ3ael4aMB%2BxkZiMt6aT5CMv9W5E8jTWsVT3gcuETFxA5mjEsXH7ag8g%2FFMVEMKYkynoLnMjp5BHZAzcH3o6%2Fc94FnS%2F%2BSxf8Ec8G9EnSZElxUSZUArJX9pfwU1dzTgC04T98DJnSdQyklOb6kN%2Fa9VCUIFxbTvBaNZBtiXWUZISAGp8n59uS8Y5ZV1rTtxEFxZC%2BJfPSxSL15ittpM8pE4cFAingKlHOrXpvR62WWIHLua%2BCoYaZq%2F%2B%2BB38HwifVrdDjrwMGYEWHvETMbXIw7O8y%2FDU%2BoYPn0Ung2D9TnFnP%2F7769namnZbmiEVUc0k8rTOzFWx9RVvDlTAgMBcpNyuzDd1PTNBjqkARVhzMqO9uM34jdbCi6CMOTX9RgoWsLyQ1GA8bE7fp55J702EwtL0jtkd0mmBBTeEx0wDqcHSfnW2lFOx3fNEv6CjYuHXjsRXxK33ZuTrwJzVELsOl9Vk49n4%2FfwgzcijyXWjXlHVjUasOvNuENLrnNTnMKPQOhDzzI0v81kFGszX2H7Iws9e%2BY%2BPMaRvl6K40X9DUqW6Li98FHu%2FfaXkTkIDom0&X-Amz-Signature=fdde9534bd1fd1d687ac54a49ec8475f4f958cbfe9d7cf5e29e1b6d8efcd7b34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5PUHYQC%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIAWR7lzVxnpuladWn2KosyQ%2BRwr1bHt9OR3Oa3FZ1bzpAiBsk6hWCRMMcE8KlEAJwOVQhlY6TlJdWmTsxcOtQaM0yCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM0cDigWdYF4DIYj9oKtwDKEJdnx8Lr%2BeS5uSn1410g3IIy9McEJzQ9AHL7EtDNfO%2FcG4TXwZ06G%2F8e8u7ZxQ1dEUAxm1HkYYN0jjnj%2FNaZGBHuY0hFTxrrfrEgffcD5HMDaKc8FWEWHsblOPBFvFTqzYczzC811mV7pp%2Fi8g%2BFVuZc%2FrXJCRwdtDF0HHTzQiuNZHrLiD8c%2BM67aGh3%2BQRSuctKpoydW4SSP6gaRMBu%2BYouYvPKDEYTDBbKOaqPuX%2BKjLb551YDOOYRcpPpOwZXAbi5AjILM5piSio2LJ3eL9n2jElVSZO8LJ40%2Fky3GfYnQ%2F2G2%2FPaa4p%2BXXpHGflxz%2FDFWDMDu5oywS9J%2BNljhisbYRxDLC029QM%2FpQOT4ZoCuNExQiJBXjhzddOJHGDjA0S38J8f6TCkyVtCeEtGjWloPnm51NqKMKZBqOJ%2Fe1%2FDGJeWJaGbLZ%2FJ4YNQ3PSYx5jl8WzPSn3%2BIENvIDdcVFZ1Gmiq00lOPjjrztDZMH9qmX9E6yr4jTsj0HXYM3ScQTKGdLtIUC5QMnENaPuww6Q98Azm4zKF9zi6amMCPlBRjgcRDDzjtzPHIVmLQ%2F27Tbgt6t37v5wnNW%2FVFzlJL3b86MaCqI3EwsI6w1mRSRQrcU19SgLZhGvheMw7L30zQY6pgHm5got09oylGG1k1m0eWi6o2mc8XkTkEVvuVJfLix4ZNr18kV4DOPeZIUIyS6cjSA1UFZI596X8OB%2F16cWGhHVnH6U%2FfVG0mO5I0F%2F8E%2B8t2BDMLMcupSssRqxLSPcVchyDJDp3y0GdMPjZHqqFQT8Z%2B%2B7jLTBaZd4%2BOt643l1sOf%2Fobz6mv2d9HhD6pp4zQIPmT%2Br8BdocNq7bLJl81CjFFbr3PhH&X-Amz-Signature=0f2f58177de72d783884ddb13833dd51f3d914d37b5936a3a41076636f2c2297&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OG4KK52%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIBpMRsQ7wArxvt1QIPfjklP57%2BtSu6HV0Y74Gym9wWF1AiB4gH0%2FBKUjjkTzXCwgIZCyoT3majcE8bDD5JKgV7vhFSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMqm8vUshjnVhWBCYzKtwDQSJNN4%2Bb6lWkojC7wBYt%2FTF4BwH4Rzki1oMSCKqNfaR28rzKrKDDQIVUycn%2FmWCQsSiedOHMTFY2suKhU6OzIydAC7ylDE5nVDRTa23UrbldIYJTTzAHBVITCKeVJsoyQIbdVEmPzZUcXLOeOhf2O9Dk%2FLLAfXHlie9ZO%2FIdHxC5NgWBhZmt7%2BKY2b3717i%2BSj3RGNpEMN4YT4OUGzNWorXLeurWotqJ8UzkV%2FvOP0zRJedpRr1GPFjSztThin6%2B4sAG3uxxPJVKN6mPFgyfpbJYXFRpqQr90c7j0VBr4erB7JIGLs3LptnNNqz2QYW76usS8g3iqJrmG%2FGRgCT8QIfFkXtRKCYAFBzV3Em8ZZuZqkOXnWtIvrt9HTspxpsqWPYx20dcmm7fdlL4wpE7vJ3ZDyIduSo5lqCkIqkRCHxxmek1FXCdOdEfe%2BNDahKrT6iXeKd2BM4HA1wkSWIPhuYL31dmlsxETDd6QvJVJjMIGWd51CkLOMbqp%2FqCI0HyYNs3JMJsZcRwQQgT4RSCCPzRq8eQ1zOa2EYL%2F6ZRKprnl8fIzvWvv43RwdP8765zoWVJixeFaf6iYFTkeFtCQQ5FslKc6o%2FIRFVRpJdJYPHePOXFeywdSebS%2B08wtL30zQY6pgF391AXNPE4qqu3%2B6BhQfjGDjGcsDVGNWmOQncKHGoAn41byhQXQ7JJ8X%2FtjXrLfSb7szNos1Y6yFMQDcs3mG%2FQTCXTI7kUKhOd8wzSpdB0%2FiWnVwBy%2B3w5AqulcKBB54Nid6M0psQVDLM9TXEl9D08pSYj%2FS2IQ1KwqupFB8NGlCnlGUF4R24HkxbzjfT4DdW6TispQqXZa3rx%2FVFDDEyiz3Oz1hkM&X-Amz-Signature=47a51d94feaaf17dbb771119451a03c695b3619826376d9aa87170ddd537d163&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OG4KK52%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIBpMRsQ7wArxvt1QIPfjklP57%2BtSu6HV0Y74Gym9wWF1AiB4gH0%2FBKUjjkTzXCwgIZCyoT3majcE8bDD5JKgV7vhFSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMqm8vUshjnVhWBCYzKtwDQSJNN4%2Bb6lWkojC7wBYt%2FTF4BwH4Rzki1oMSCKqNfaR28rzKrKDDQIVUycn%2FmWCQsSiedOHMTFY2suKhU6OzIydAC7ylDE5nVDRTa23UrbldIYJTTzAHBVITCKeVJsoyQIbdVEmPzZUcXLOeOhf2O9Dk%2FLLAfXHlie9ZO%2FIdHxC5NgWBhZmt7%2BKY2b3717i%2BSj3RGNpEMN4YT4OUGzNWorXLeurWotqJ8UzkV%2FvOP0zRJedpRr1GPFjSztThin6%2B4sAG3uxxPJVKN6mPFgyfpbJYXFRpqQr90c7j0VBr4erB7JIGLs3LptnNNqz2QYW76usS8g3iqJrmG%2FGRgCT8QIfFkXtRKCYAFBzV3Em8ZZuZqkOXnWtIvrt9HTspxpsqWPYx20dcmm7fdlL4wpE7vJ3ZDyIduSo5lqCkIqkRCHxxmek1FXCdOdEfe%2BNDahKrT6iXeKd2BM4HA1wkSWIPhuYL31dmlsxETDd6QvJVJjMIGWd51CkLOMbqp%2FqCI0HyYNs3JMJsZcRwQQgT4RSCCPzRq8eQ1zOa2EYL%2F6ZRKprnl8fIzvWvv43RwdP8765zoWVJixeFaf6iYFTkeFtCQQ5FslKc6o%2FIRFVRpJdJYPHePOXFeywdSebS%2B08wtL30zQY6pgF391AXNPE4qqu3%2B6BhQfjGDjGcsDVGNWmOQncKHGoAn41byhQXQ7JJ8X%2FtjXrLfSb7szNos1Y6yFMQDcs3mG%2FQTCXTI7kUKhOd8wzSpdB0%2FiWnVwBy%2B3w5AqulcKBB54Nid6M0psQVDLM9TXEl9D08pSYj%2FS2IQ1KwqupFB8NGlCnlGUF4R24HkxbzjfT4DdW6TispQqXZa3rx%2FVFDDEyiz3Oz1hkM&X-Amz-Signature=47a51d94feaaf17dbb771119451a03c695b3619826376d9aa87170ddd537d163&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HTRCZS5%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T122750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDxLRVSlAFD5ZOAFmlw0fN8IjQDvn0N1ti3ahY5z0YH4wIhALj2ascoLnLrWSe5D00ZuuUTtSzDNgTy%2FXPiB02Ds8hGKv8DCDMQABoMNjM3NDIzMTgzODA1Igxu1JSiuIujLx3KsBQq3AP%2BX%2BSLg4gf1H1XyD792rFC%2BRYV4F9a8yH8WcQN4ubjQvs8t45XBj4A4iDD0DDPunCFmnkDdbSuq5kh48qjXshZZRdHE9rNGDl0fIMFTY4R9prO%2Beb2m%2FLv5d%2BlX8rX%2B2UPbcIGGza%2FPGTr3Eobxf6gl2MRtzb8vPIIOv%2Fku0UJD%2FGFQx4sgxM6oS3wNY1GI5u6unqkHwckk8WFJdqEW%2FLMbpxsooMqrMyjMgwAVWTEHbA56Rp84gQIZdx%2BUUEFxtaButw8xcmdPr8wD15eccYo1rnDEyskEzZNm5hpd9tV217E34nhihWPpXCpcl%2FwW9du06aR0ikI9O4AeROTzTWh%2FjLDJOc0eHE5lSwrm1SEn2QLUWQNlCUwO%2F4QHdETjvZlp6Gv0e77PtJdP1XocJoRCkqfMV%2FVc5MM01SG3tarBmGfHu36MCxJ0xo1UOcDQftULV%2FQzNuGwCsGHTQI%2Bsqda2V2TRLo1UvZF5Z4YbmKQSp4CPG1endVRTf3hr3MzBXHAEYzBsHptT3LxkIRu3aqMX3FnS7gEl3hfcsej%2Bk4vCgbSMhF0%2F642fgS4OujJxFtMBdL%2FuV2z81%2Fa1KCZF4YccVhl8ew5jeyjQSYIbfwEMh6Sn5l9PaS9%2BdJSTDGvPTNBjqkAf%2FDiTTuVhPPHLZy2cb3vMwPLd%2FzAdYcRHjBQfbIX%2Byzzm4wy6YV%2BLJxtBt6MmFyAcDtwHdeRpaR8edBphfSXx%2F34CZ6hAfq2%2BTpkc5YZ8EVR37Ep3oMDz5%2FktJMdsqlqYgQMos8T8P63Z5qKRWuICv67jXpgYBWBK5mgXqxQE7HCL246oN46ganmzZ1slLCkhkYXSWy2eSujWqecDqDPgEAionr&X-Amz-Signature=ab13f2fa457a903d4f281c07529d9a026fa02e9b6e5d6814b443f4884ab36f3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

