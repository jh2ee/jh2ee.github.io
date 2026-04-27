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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z4DDDPV%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQCKrYjB6jJNTUnY7D4DdUNDt3q5EkIloq24ubwkypfhBAIgGJc1J8ktbfzQjzYqCA82c4lm4ZXjpFz9SikuOZIOdeEqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMq0svSVXc0lkzzrdCrcAxC3hNFGVEP%2Bfbh9cN6RInOfiuLQQfBOjNGVSATsB%2Fzf7iyVpp32mbCuTodIhLLfhWhxJGEz%2FHq0HBLZqN4YNkv%2B9qVRlp3lAdf0tKid5KGheaKzMQuwOJbb6vctZedACRHAiIMpqG390qeReezz1ECESaM3w5UiqqIzWwuvKU6RvwwcMwiDVkVz3EtQy3%2FQjqUV2L28E2xcqGiC7dZG0Z2LmMpHG1LdKybOoO%2FpHDgU60cD7uZQUHfqH%2F74ZrYKKkeBOrPSAcCG%2FDod2xDDF8u0EgTONZkhi8ohoqFeg5QuU%2BEeYys7ugXbxTalwAsME2JjxHnEzy4FIk1nmioz205vBGLeHC%2BKBwyqEOjVhrEzsmoIFjg6x3Z1bYZur6xvcPeMeHV%2FHG6x%2BWBx2gOC%2B22vzn0iGFMVFyi2uBSpmUA2tLfMBumLJPYOC5I7izAyCa%2FvxASNFnLT5O8Q0TMcX3ufciUazZuJ4UcNUph3OmOg0E3Te%2FRSHV1PBJIkq08XhpX3SfS1UWw%2FWmpAQK48s4P8b0BGJOjfoU61VTzcA8ZcoyDQhd1bVLGiWGhY9CwceJsB1g0fAfPUo7DWuUqvy3W92wdKUN6xdXEafRAKRMl6npMD%2FjgDr3WSSFd9MI7Vvs8GOqUBsbZLlaaevuujGCnXyc84YnwcngrP8ezUjQ7er4rLwKosCsN3Mg4b6b1y4t1e8l6CnV5uxPZltc6iP0IYSBM0LEo3reYw%2BdjQ2NSgorD40cZYVyFvOmNq3p7oFlySG7xDbFSDReUHtdLkstm1obuvvN7oQxDqDF%2FEzHp9GJnUIwf4zDzu68CvIpShZgy3n%2B1PUAe602O8Y1VdjxzxtX254pWJDrxK&X-Amz-Signature=b069ddddbb1b69fe38f3a5ddd647ad36182d1beb4cfcb5f2a29b494326ac2458&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z4DDDPV%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQCKrYjB6jJNTUnY7D4DdUNDt3q5EkIloq24ubwkypfhBAIgGJc1J8ktbfzQjzYqCA82c4lm4ZXjpFz9SikuOZIOdeEqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMq0svSVXc0lkzzrdCrcAxC3hNFGVEP%2Bfbh9cN6RInOfiuLQQfBOjNGVSATsB%2Fzf7iyVpp32mbCuTodIhLLfhWhxJGEz%2FHq0HBLZqN4YNkv%2B9qVRlp3lAdf0tKid5KGheaKzMQuwOJbb6vctZedACRHAiIMpqG390qeReezz1ECESaM3w5UiqqIzWwuvKU6RvwwcMwiDVkVz3EtQy3%2FQjqUV2L28E2xcqGiC7dZG0Z2LmMpHG1LdKybOoO%2FpHDgU60cD7uZQUHfqH%2F74ZrYKKkeBOrPSAcCG%2FDod2xDDF8u0EgTONZkhi8ohoqFeg5QuU%2BEeYys7ugXbxTalwAsME2JjxHnEzy4FIk1nmioz205vBGLeHC%2BKBwyqEOjVhrEzsmoIFjg6x3Z1bYZur6xvcPeMeHV%2FHG6x%2BWBx2gOC%2B22vzn0iGFMVFyi2uBSpmUA2tLfMBumLJPYOC5I7izAyCa%2FvxASNFnLT5O8Q0TMcX3ufciUazZuJ4UcNUph3OmOg0E3Te%2FRSHV1PBJIkq08XhpX3SfS1UWw%2FWmpAQK48s4P8b0BGJOjfoU61VTzcA8ZcoyDQhd1bVLGiWGhY9CwceJsB1g0fAfPUo7DWuUqvy3W92wdKUN6xdXEafRAKRMl6npMD%2FjgDr3WSSFd9MI7Vvs8GOqUBsbZLlaaevuujGCnXyc84YnwcngrP8ezUjQ7er4rLwKosCsN3Mg4b6b1y4t1e8l6CnV5uxPZltc6iP0IYSBM0LEo3reYw%2BdjQ2NSgorD40cZYVyFvOmNq3p7oFlySG7xDbFSDReUHtdLkstm1obuvvN7oQxDqDF%2FEzHp9GJnUIwf4zDzu68CvIpShZgy3n%2B1PUAe602O8Y1VdjxzxtX254pWJDrxK&X-Amz-Signature=b069ddddbb1b69fe38f3a5ddd647ad36182d1beb4cfcb5f2a29b494326ac2458&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673SKY7FR%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQDu4ww1yCdpXw476yq3HNX33vx3IHQh5j4h6%2BXl4D%2FbZgIgYDgdF%2B7O78PWmOY7TqQixJvPzX4R1%2BzzNk9jbCBW4K4qiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBhQGsjgfT7YLg4meCrcA8esVMj25R2vThpmANR15Z6S3lCrLKSLoeoBS4hLanow4Gf0qpZEzVWy4bsooCBqtQIF2lf6B3MPssGA0f9GgXco4gBnoiUuZnkvqNtuEMatxtTD%2F4bzj0MTtV69UEGYSOcKmBUyOpBhTt5u78gEklwawEYDNJTotqLxTauSOu1%2BBt1PFJw83%2Bcv6p%2BqmpMc3aP3orJPbfAlBDC6srxfEYSKkY4gT8jThz%2FSs4nuaw9unUAvCUdQgRU1tTw3VzbNNWZFSxxx8lJJSkKoJVCp5oLjZOrj3HGa7apM40UEW5QxR8B4VUK1mfmMwQObOZOFjsMb3DFUyEEcOXSig0li4o0Z%2BytzT4b89OgIjYsk3IT63g2j58LCbWPuiQNdS4%2BYFiokRoQBwcXw3QEXvmxEDYg9AQp3w4IweXh8ZTp7Ok1tGY%2FQGaeCu38DCsENRYpAGSZ3P6UL7%2BFLDgCXdU0uI9UWRHLQ1Gu1Ui4vWCQ%2F8%2BSZe6DuOtvZiz7YNI0UIw97aMpvGNQHDaDo1EUrzY9oRMOPzAy1BrYydtZiM1fHiS4HUPTlVUzb4l%2Ff%2B0GwRfJB9nKr3br6Js62oyV2UhvuU0HCZplVyUc5F9yJpP0jhlMhzbn%2FsE%2FvVRJdKx%2FbMOzUvs8GOqUBOqrmLWbrh2MYKwdJgeN%2BryZCVm7EUjrjJSsIwOChdjIDojzQYg3txTp3wDJymscKJ23SWjQblQ%2FtC%2BrjDr7hgk%2FGByRTJGp9L9J1K%2FDxGzeuntocNn2BsvPYw%2Bbny0%2BV9kClQ0%2F3nXcUD1Vu6aiX%2FrSfKFhchH02ihkfOINXx1g1%2BZyHrteiqC1eMXmNZUe6ysBV%2FZ5eLdr7NZApanslMR4dl85t&X-Amz-Signature=ebff2d343c44a247472b8e6638ffc866753b6d780ddd0b8404c05fd410b8c21d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3B6WGR4%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCID84LG%2FjaFqCXtFFbDsE3DZVqQHowGgguvMikwhYC5sgAiA7YH%2FA0ITjiRbhbYYbStQw2L7Y%2FuOoyQhpUbRDNSyAuyqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMI1tEGDOe%2FEAxmnoLKtwDMENR8OOU0SWDhlOBWhfH7JsV99A%2FCRG85CkcViDCzTsTVB1i%2F6DJVoZfhCMuqy7YG%2FzkZWaAtzqxS9TiVoUEuS2JPgyxje5loLeNuAYArMG9Oxgp5GlKwL7avMI1%2BgUHgxgXDyDsPchEIfsU%2BZR9BHFxZ6GFyiFhd%2FYnBJ%2Fv2L58JoK864s0SxYMIse%2Fiy0wM0AvWEB8cUOWPSqndzxnA0bsnvFPLkGyfhXML1upGpL1beq9fVxTJ6mGHoV4vbG%2FHXVhxhla8Rbqm9rWKLcw0otZlX8NAEdR0I3oUyLIW5jXSKGKBkzcP4NkWw1YzctCGjm%2Fy9fFaJkLVyP5JsFoGtlthVhS%2B3j6vfBvp5hKmBTOv7kAIhBUiC3WL3wHV%2BHiWWme6s%2BaAL%2FEfKrtqGL7CbHfEFZ%2FeSwO%2BKsUgx1R8MlAFverB4NV76R1ucm66U5hrNxwm%2FB9xmswCMHlTIXxyjMuBjZJs6C03el2w4D2yzEnIzTd%2B0HJ%2BaPnyYpN9CtE235MoUosGbuEkgvYNJ94aC7o9qLiFsykT0efK4Ygbu%2F0P5Xal2uoZ4qPMFuXNCYGh%2F9QcsgdXUrGvuDIOK%2FsgMr0tKtpVQuphlCViPt4TxHwenUrjDcsHGJovxUw1ta%2BzwY6pgFonpsh6NDNPUuuKvY9whEscNz1odKIWb5Lwqs%2Ft0CGRdqNxg3iAb6XREL%2Bz1RJVzkLJOIzPUztYG%2FNFOFthLlz%2FGSHtzi7f2BvF6ajrahIF%2BeI2kj9jAripmvSZtj%2B2WhOz5dcYe8wQL%2FbgHikhJyV9SPa0lniOzz8KpFrs1wzy0GB%2FJAlSqGKoGyJJbnkETSzG7mfVmthUcfAe0zTUmQMKfXhM0%2Bc&X-Amz-Signature=96d1960eb379213497bf050ef40eabc0632ec4d587ad0f838ee025ce0ab0a62a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3B6WGR4%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCID84LG%2FjaFqCXtFFbDsE3DZVqQHowGgguvMikwhYC5sgAiA7YH%2FA0ITjiRbhbYYbStQw2L7Y%2FuOoyQhpUbRDNSyAuyqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMI1tEGDOe%2FEAxmnoLKtwDMENR8OOU0SWDhlOBWhfH7JsV99A%2FCRG85CkcViDCzTsTVB1i%2F6DJVoZfhCMuqy7YG%2FzkZWaAtzqxS9TiVoUEuS2JPgyxje5loLeNuAYArMG9Oxgp5GlKwL7avMI1%2BgUHgxgXDyDsPchEIfsU%2BZR9BHFxZ6GFyiFhd%2FYnBJ%2Fv2L58JoK864s0SxYMIse%2Fiy0wM0AvWEB8cUOWPSqndzxnA0bsnvFPLkGyfhXML1upGpL1beq9fVxTJ6mGHoV4vbG%2FHXVhxhla8Rbqm9rWKLcw0otZlX8NAEdR0I3oUyLIW5jXSKGKBkzcP4NkWw1YzctCGjm%2Fy9fFaJkLVyP5JsFoGtlthVhS%2B3j6vfBvp5hKmBTOv7kAIhBUiC3WL3wHV%2BHiWWme6s%2BaAL%2FEfKrtqGL7CbHfEFZ%2FeSwO%2BKsUgx1R8MlAFverB4NV76R1ucm66U5hrNxwm%2FB9xmswCMHlTIXxyjMuBjZJs6C03el2w4D2yzEnIzTd%2B0HJ%2BaPnyYpN9CtE235MoUosGbuEkgvYNJ94aC7o9qLiFsykT0efK4Ygbu%2F0P5Xal2uoZ4qPMFuXNCYGh%2F9QcsgdXUrGvuDIOK%2FsgMr0tKtpVQuphlCViPt4TxHwenUrjDcsHGJovxUw1ta%2BzwY6pgFonpsh6NDNPUuuKvY9whEscNz1odKIWb5Lwqs%2Ft0CGRdqNxg3iAb6XREL%2Bz1RJVzkLJOIzPUztYG%2FNFOFthLlz%2FGSHtzi7f2BvF6ajrahIF%2BeI2kj9jAripmvSZtj%2B2WhOz5dcYe8wQL%2FbgHikhJyV9SPa0lniOzz8KpFrs1wzy0GB%2FJAlSqGKoGyJJbnkETSzG7mfVmthUcfAe0zTUmQMKfXhM0%2Bc&X-Amz-Signature=988fb960c59bf79ed56c4286451415475d3c4f129947a85c023ac18d01cd302d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632XXFP7I%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIFjP62%2B2N4V%2BPYiEpwTPVBZ0dng4g2A4sQstbkSfb7%2BAAiB63BC3ZzFT%2Fp8rH27kFChKKZMfyAecMtt5vLAjo2mkDSqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMA%2BHrNvo4bQc9Q7%2BQKtwDblyAJXSgxTtwg9yLD6gGrjAFuXntK22uIXlT67tHaEagdSTv9L1fgiDm2xA0HjrCcBmR69X0Ur3CMOSjOhEbxUgiR16uWGS5nmqR9TgphoiiklZ7SNi9ZpU8ysqXN3%2BbsUIE4VqqIdloL1aT%2F3CRaOz82uybNFJQIi0usho78rPsv2iRh6mgJTZYzIO33jB%2Bni939ytT5dKgUidMHc5VGXq9yELoY0aIFuNYgQP4nu0IWXjJ6dcmkfjRPjJbU1Dl%2F%2FwiD1VpEn5OMohqztpD61sP5yKdiPf%2BR5b1Hojgb%2F8AcR3Nm2UZVmTWC758vzUUPrEqAQ3jSYnuG0gHy%2BWmMdrCwIgPv4t0jQatKkm1rZ2XKO79lkh3ckamxi7Z027wFZmotU7zvMIieZZP4koBbpBDzld5iZaWD3yrx7OGDJbCXhwq2cprSibKX4WVnzwyzmRY%2FH4mznqFCtv7SasfaIT1gG3%2BqeizmBneGS9idevhrzmWmPSjUTv71WBgriGWxKNEKLOWGxpAYIUcke3h06VEVZ0oF4e9WBh4atG%2FEGYA3KgkFBDAu%2BU2PSS1F%2BvPLND51BOOkox%2Fed6bvsWGt8ZTqvtNhnL3HZE3yjDhyXq5vRNCeIYgS16tvTUwh9e%2BzwY6pgEvh%2BvCaF9uslxHKxXMFyXz%2FYEMJqbtVijWEEeR9MYVclOJAK%2BMdqLAO%2F0OuUuS4V9xRBowRH7hSlWzjr%2BxuRxkMuIQ5aD1SKuZn4uTw4iuwxxhzj31QN3UHSwTRNgZLWfNKUwnGQwCnGbHNzdVMIn06V%2BlELbBsLyp84FdPzkMjpD42eAZA%2BwTDRfhRos4qYImJcpmjjMRVnfJ5REJaAl%2BnWFPrk28&X-Amz-Signature=161b1e50c4b71a27a7e10f531b175e8154cb7f03818115d9ae042eaa63ee3c97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5F3M2HK%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQDrVA2v%2FSW8BW%2B7RWf0Zcsp5VpesB8lmCopoxjZJPytUQIgPVJv1oCN%2Bea1qXJhdDH%2Fg46yG1u13GD1F6%2FrFQLrpSgqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAfTUJgdxYR8A03RsCrcA7vcLpPhDAxTHfVRoXJpHQL49MeJmNtNTA9qa9vUdq25wU5leRC9Zbw1XEOrA1ekZAF9b3m%2BOUsRDgFDUtkhG%2FZgAiguGhzYAgbqQRYQ0%2Ba2%2F8zB04WGt69hvdjACrX5Qej0RkLZcQ47FTcGJa40KXsTK835iLpsfcHQR7MAGMXdq%2FjNrLKvpS%2B6LOKU7ZrrUBUEoX%2BIFI6StaHHWnufxcJpffuTKWNRrlRFPfkqd61W0QCU1v3f3zAUsYmEuZsGZmMc%2BZLPnRw5Wek6kN6YMiLW85%2Ff47OGLZVFXEw5jmCKMivDe0BYznyJ8HQcFCpf%2FWARLm1qBpqO%2B5Yzyd8b7iV4OaozwKwtADKfIPhMVJe3XPbMIfHOT8qzYtKuhJhvWHcBtJEGYCqIDHSg5SflTCoFPSsj2oTRXTGfsIErJUh%2F20vqiF1S9GNpzOiy2olN3exmWiTfZxR8XPSZ%2Fz%2FIxWSz3a7%2BpO3agsmS9kIav%2BAS5ehf4mgEeyQRPt%2FPrYEcFjWby7E9iVZdL18ZuhRQ1TKEQ2YY39XLK7%2BWw%2FQyi5nvJJrGp6PQ%2BiaHLxXlT1k24%2Bq491MTxnsncicD6HuNMsF%2BnsZEUUMtcfQO8aMsMKVeda9tM1tbPw8a7jH8MMHVvs8GOqUBEMvWY8vZKz%2BtzSFZ743miQzkAqEY9O0Fkjg7YZXD7T9JCRpM5seFxBWM0IkLC8VmgGjatKTCK5Z3MPn3aad5%2BjVLHo2b%2BKO44cxGI90d87PQKTuR2OjQdSwCZLv1EhOnMlVEGAgo9jEDEJBuOM4Ku%2Fdm4koJBLtULczzf78k2w%2FPJ7vVlUB%2BV8Ooxfc6nnsOiRFcRR6r5RxTYZllu977YO2KFHF1&X-Amz-Signature=069c86b4a9b9a3db064a26bbb6062fe07abaea2ecf04123bcbaa6003bd3d3a67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NBVI7F2%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIEv1k2u%2Fr1NhUQCcSOCpV9kQEMVvcKSc56tOM3XqpLUYAiEAoyFgRvL%2BsGuN%2FCpPsOJtRHK%2BMtNEVdByQ7TfzhAlz%2BoqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGvYpcWJ6IeflNVbhyrcAyrOKNgHyd4CiI7Zzl2k28%2FeFqKjRHqwBWUaGEJsp1MZq4wYwU9QdfsU94f%2FNbSztjNChEHFfWR5ZTCzbkQGsX0gyVbFN5oJd1%2B%2BPD39NLizv3k8dxlhZ20WK1Hj6iz5A7x6O3Q%2B0pLKtSBs6ZWUltuOKtkZlQ707HXjm7xvvWvfVaJMNcda9a2qomTV5yefejv8ymAMcbnjU439bqpyCQHcS6OU6J%2FR%2FkSt2bh59dnCERdoZUKW55Y1QO71XW9JKyuG0kTuEJdbdv%2FXHHdHcNtkiXfHKyxzzSKy7uO%2FCI11OiTnmJjR0qujdGEXJQb6eH5R%2FC6wromT2BP%2BpPKhMQlbAYyA4XgJNY9qn%2BOIXZxL7Tv1tNo5cPBa4RCSKYu%2FYPRbODpHUyTtRDvcqPwsnw1s%2B5laecMlfhktVSxUJw%2F7KsK064x%2BZ7tYD0uEzQjgCluWZvEdSgZwaYM8uTj8VdMNFPYv9An9yI0ewJHz6w1xWOG3rpjYHVrCnXcy7FDfKrHeaLzJ71ndibwgBY7%2FKxAY1Ip4ZkECV3AvQl3RhswdNpxwb1AWUjGA4rwYBRNkzq8GyDQI2dyVuOLQ%2BBs48ZgkgUX%2BquEK5NkR9yWGhnPf5giJHIC%2B7tCJuOWHMN3Uvs8GOqUBxrCe9pncQvnfGRaJb63dkxTuXSiUfatcAFVx%2FZDwbRI%2FXAmnTnvN4TvXkWc50Ylve4t143QYzxg%2FIr%2BS7BMXw6uCedIWxbBxTKLgPTZEpXsthegxDvKIsYiIqaO48eoFbvIOV67bKa1s16GsyGReCDn1vMn7a80a%2B7CtgbtwraPrppt1v97CuBgW82L76GEF1oc4kFq%2BNGyPj1gV6b9KQmPPYM%2B6&X-Amz-Signature=6a0532488dcee8bee054b5afdea5faa4385448fbcc7713154d46df712083e5a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPLZEE2I%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIA6soH2kXFsQwSOO18iSOwIhFdApXhEknjw6gUE%2Fo42hAiBcpWQxU2PgGXGB3dHfmftZkVgF%2FAUB5QTnczNivIGAICqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlO4v%2F4%2BOXsAdipb9KtwD6Jve49qosbcyidJa8MKpE8Mtvgmd8WFIcGCPesuLQVL8dNYuuVEYju%2BeI%2B6I9iP%2FfdbBKURdwDZhbC2TqiebhBm1u6SeJrbat2Nevb1I9ZyugN4appWKQQkiZgIOg94Jq%2Bb0i84psK%2FRnhHAhYaQR%2FISPciemIq7JVUnVPdUgPxghWXFB8JIvp0IouWpbhfcgT2WHqtlEucjxLf3kAKhcdP5435VTbskEtvcjV2b2%2Fsz1yPdjgZVU0NWjnagE3zDTTfQUbnh%2Bm4xuGCzuTZdK7xZ2U3VDIfjcU7VrqQw%2F2GROsr0lO%2BIFr%2BKOGOtvtCSmpKlQOyMjtnjUe2Vb2X1HNCbao7ELwf8wPY89RfqtA2PeIbbu6fuqKtdereT8Q7DehNiXIb0SBME%2FNm6rKcX%2BuzjtnDdINM%2BNcbET5wbhc6E5rNDwPuiWUVSQGagq1glYP%2BTUqKDYkWx7WV08MxNv38GS7S%2FyDsrsgvUVzYJ%2FUMjMyNKhqyFwjUJUhCddZZ4inXSNH9Bh01uz536n5zn33%2FbsKUNhYqdsRnpAVChXXi8cSumxWbwjV24ld4XxAt%2BpIlf2F6meqcFwfSnHFzZyfV1TomaC3aMGhmCb22f7KE0VMc0100KxigM1z8w69a%2BzwY6pgEokYK1o4KxriwOGNPpck2kfJDhkg65gKbFEMYe03Y3zpfSy3nDkjATbIWgtxHalauiWDnFaBnF3hqYGmC7IjOqhbn3EKhk9KXSgL2wsEQ6AGKqALozE9jzaOWabOn7J3msOy78knaelAo1ofV%2FiARqwP0%2FteexZK5cBk814jZevy5IyD3wdt%2Fa9GF1RhgaEjXC12HHFlBK9%2BIz60MBZp7Xe%2BrpohQ3&X-Amz-Signature=ac075a1b6c20649fd051d4c7f913cd8dbae15fd3752d4d87317385fbb4d8ef4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPLZEE2I%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIA6soH2kXFsQwSOO18iSOwIhFdApXhEknjw6gUE%2Fo42hAiBcpWQxU2PgGXGB3dHfmftZkVgF%2FAUB5QTnczNivIGAICqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlO4v%2F4%2BOXsAdipb9KtwD6Jve49qosbcyidJa8MKpE8Mtvgmd8WFIcGCPesuLQVL8dNYuuVEYju%2BeI%2B6I9iP%2FfdbBKURdwDZhbC2TqiebhBm1u6SeJrbat2Nevb1I9ZyugN4appWKQQkiZgIOg94Jq%2Bb0i84psK%2FRnhHAhYaQR%2FISPciemIq7JVUnVPdUgPxghWXFB8JIvp0IouWpbhfcgT2WHqtlEucjxLf3kAKhcdP5435VTbskEtvcjV2b2%2Fsz1yPdjgZVU0NWjnagE3zDTTfQUbnh%2Bm4xuGCzuTZdK7xZ2U3VDIfjcU7VrqQw%2F2GROsr0lO%2BIFr%2BKOGOtvtCSmpKlQOyMjtnjUe2Vb2X1HNCbao7ELwf8wPY89RfqtA2PeIbbu6fuqKtdereT8Q7DehNiXIb0SBME%2FNm6rKcX%2BuzjtnDdINM%2BNcbET5wbhc6E5rNDwPuiWUVSQGagq1glYP%2BTUqKDYkWx7WV08MxNv38GS7S%2FyDsrsgvUVzYJ%2FUMjMyNKhqyFwjUJUhCddZZ4inXSNH9Bh01uz536n5zn33%2FbsKUNhYqdsRnpAVChXXi8cSumxWbwjV24ld4XxAt%2BpIlf2F6meqcFwfSnHFzZyfV1TomaC3aMGhmCb22f7KE0VMc0100KxigM1z8w69a%2BzwY6pgEokYK1o4KxriwOGNPpck2kfJDhkg65gKbFEMYe03Y3zpfSy3nDkjATbIWgtxHalauiWDnFaBnF3hqYGmC7IjOqhbn3EKhk9KXSgL2wsEQ6AGKqALozE9jzaOWabOn7J3msOy78knaelAo1ofV%2FiARqwP0%2FteexZK5cBk814jZevy5IyD3wdt%2Fa9GF1RhgaEjXC12HHFlBK9%2BIz60MBZp7Xe%2BrpohQ3&X-Amz-Signature=242ecb9066e9f5171ca80099d5d60422d5b46668e8cd395e55edc6ced4990675&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CWGAE33%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIE%2BnrFpGdTHUxO1%2BE24bBwJRGcuhoK%2Fe29LTRfSd1eftAiEA%2BqNfBtxF7KuK2banm8vE2azVHR%2Fm%2BZOAuh6bn2RedYwqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHEC6vw%2FTy7JK5deLCrcA%2F7NalH1Dhxf6y3dheDhkSYTOP6thWXYE%2FMa%2FxdTeY2O%2F73ZUoPzFyFT4jtRm%2BK%2BKeISynzhl4X5tySUOCf8xoqgdAHaNCzx0jLA39itfs7DGy6H8sgARt9JOVrR3An2m1EASiT6svWwAXA1RTkxoNuEp3M9VT4OgtoF2eM3Dy1bYUOhUqsVxhobLRqCnlqMOYhs6mdgcyKWUkW0qu12MYMTpxaMtwi2rsAe3LbIQBFsI6BXD1OVwOmrhORUTumDWwu%2F4nq%2FY6iAGZyGodYeeIQ2Tw6uDmMDRAvqBaabY8LaK%2B11dxO24k8WYasMKGBSGONJ03N0WtkwWncf3okpv1Qhs8dmKLeB3uyG9TSJiAbn9UoUWBwd9zNhQHOLbpAz%2B%2FpQLq3ONQQsedtn97zjulO458SexuepYgDuNUNlSB5xrQuRHGv7ulY%2F0VkMTcxbVX65BObAvtjW3QwGvdo3AVZba4hVcmMW4QaKUIfSfAGbGrf4WB0FvHJI30egRZqkeQF2lzHNPza7zXS5EVqclsWVTBinVC8PVEtA%2Bv8KUU5hXb7tV2t2%2B83GxGmIWrk%2F8MTltH6G73YI%2BcFf%2BvGgXFeulrd7CqJsu2Or3xqglWLk6moBb3FZHCkS6lniMJ3Wvs8GOqUBuc939T9S5Vrfz%2Fp9LJqeqyCSGHAuFxlYsmNtgMkj1P45CBinNVAnVlNr6UOXCwnmWjobI0ANdRLeWBEiEOBhRGBDEHCJry1aNYAYrlgjtS2YRsG7eVkI0T0Eu%2B9BbYr8Xv7Qym3KrZsMPD%2BbXmIu%2FWWlPr5DjEsxZipowkZ7KT%2F2gOKdkieo16DE%2F67c8ttBZJH%2BO%2FNvxm1og4UPz4fyVqmgbVeK&X-Amz-Signature=8df2a11aa8795402b40a245dbcca4f08690880c11f1eac174d55751c11c841f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644IGB2HV%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIGsikF1ZojPBqU9tgLnQb2nW%2FrTJ%2BTqEErH6cHR1vT4wAiEAp327VjxT9wQuoxZtpnbHnPJQ0nlc9KRwLXcmFSa1VHwqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPax1ytYFAzF%2BvfH2SrcA6v6wQEkoXD%2B43QiPP52yXG9GWDrOt6B2LqQNZyfHBd13DL7TO2KOU9WoncEt1m%2F2PGzafEPdJ0F4%2BufS9iGxdnbHKFkrKKy0R5xNnh9rl3cXaMIu2toN4BBu9ZZODmnXRWP9IayQkNUrpIfieRjaJx3TJb3FUH%2FL9AbBiN%2Bc28OizYFfxXRDFS3DpVUyyAaVDa6nDpYEdDdkPxUA8e5xt0EoeDeREgVYn5P6qGa5%2FlWwcTVR4G6x7J43Nj5AWkHB%2Fdm43nDtpTKnq0SiqhIlWb0UeZhAcFq294NdF3WgKk0t8FurZZ21RRbY7ZJ2meZ%2FeJ0wHHE4QwPg3f24MKCLEcYljZHEceKQkAA%2FOgNmrDckI1TWBZiCtcddhrrmvqdZNQ1kRZBaiPfNN%2FTSYs7cI3AmGeV72pEO03Uk5QHVTVHQZaNfMCZGsU%2BTmR3wii9%2F7FGWY14CXpwXrh48dTfcPfyBWSH5XzALrfnv%2BFWr1fS3VXoeO%2BRAt%2FmYA%2FKHWxxvhrhnAzBQaJFfWVTuUchWfJX78L09tqouDY0nS178OjZqkHGppQxnEntcSPiKYbhFWTYLlFd02NYo25ig8R5MjykVdMgR7oh7esSwwyx00zzOfHhCUoYvLhdZLz0MIXVvs8GOqUBnD8auTiwt%2BHCOhSahc14VDvOYCC4Umm3q5l6Jy8snbas5hCsRQGBvE7Opg5AvMkm%2FH7gm2GGjf%2FqH41%2BMWVKQbD6502hiOPYqmhM5bXVWq%2BtTHMb6RFMLbYurVtEGuKNUFiln4JL2LRyWE2oHHEG%2BFzpCbHaW6vxfYsQy%2FD2rizooEsxy4Bzqvcfp%2FSDEUKzSnBWLBSj%2FW1jEKCshzRv4Czq%2B2Jr&X-Amz-Signature=026ad58f37a1067a2ccc550449dcfaa7bd2b751dc50b64c99b26e9f77c42c7e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644IGB2HV%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIGsikF1ZojPBqU9tgLnQb2nW%2FrTJ%2BTqEErH6cHR1vT4wAiEAp327VjxT9wQuoxZtpnbHnPJQ0nlc9KRwLXcmFSa1VHwqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPax1ytYFAzF%2BvfH2SrcA6v6wQEkoXD%2B43QiPP52yXG9GWDrOt6B2LqQNZyfHBd13DL7TO2KOU9WoncEt1m%2F2PGzafEPdJ0F4%2BufS9iGxdnbHKFkrKKy0R5xNnh9rl3cXaMIu2toN4BBu9ZZODmnXRWP9IayQkNUrpIfieRjaJx3TJb3FUH%2FL9AbBiN%2Bc28OizYFfxXRDFS3DpVUyyAaVDa6nDpYEdDdkPxUA8e5xt0EoeDeREgVYn5P6qGa5%2FlWwcTVR4G6x7J43Nj5AWkHB%2Fdm43nDtpTKnq0SiqhIlWb0UeZhAcFq294NdF3WgKk0t8FurZZ21RRbY7ZJ2meZ%2FeJ0wHHE4QwPg3f24MKCLEcYljZHEceKQkAA%2FOgNmrDckI1TWBZiCtcddhrrmvqdZNQ1kRZBaiPfNN%2FTSYs7cI3AmGeV72pEO03Uk5QHVTVHQZaNfMCZGsU%2BTmR3wii9%2F7FGWY14CXpwXrh48dTfcPfyBWSH5XzALrfnv%2BFWr1fS3VXoeO%2BRAt%2FmYA%2FKHWxxvhrhnAzBQaJFfWVTuUchWfJX78L09tqouDY0nS178OjZqkHGppQxnEntcSPiKYbhFWTYLlFd02NYo25ig8R5MjykVdMgR7oh7esSwwyx00zzOfHhCUoYvLhdZLz0MIXVvs8GOqUBnD8auTiwt%2BHCOhSahc14VDvOYCC4Umm3q5l6Jy8snbas5hCsRQGBvE7Opg5AvMkm%2FH7gm2GGjf%2FqH41%2BMWVKQbD6502hiOPYqmhM5bXVWq%2BtTHMb6RFMLbYurVtEGuKNUFiln4JL2LRyWE2oHHEG%2BFzpCbHaW6vxfYsQy%2FD2rizooEsxy4Bzqvcfp%2FSDEUKzSnBWLBSj%2FW1jEKCshzRv4Czq%2B2Jr&X-Amz-Signature=026ad58f37a1067a2ccc550449dcfaa7bd2b751dc50b64c99b26e9f77c42c7e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXUV2L5P%2F20260427%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260427T190335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQDXFPCHx1BZeGkd31bLAsYCYV58hRlULET5LD8murZ2dAIgNI7KuKfa3L0rbkQ6Lbb3Kvc6Ir2Mc6NAhB9BkqvzcUMqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLeQ6kmJqQiQV3LpGircAzSj46TlVN7EBnkOTG%2FdUFGFH2qBPpVW4Zc2%2FH7YahXBfZVl3d3DcndH5opU4jbujQPv9TSaPHXKEf82A8Duioil3PqSSMR1l8eR5%2BXXY8OcZydtTGZlZvfqCzINs5rc7sMwo2w6DbsrJ6yOItZwiZ%2BYLnUfV3VsnmtrKa3C1J58CxUNMalRMwGpDVE05jPVEP0tS2b8jSaGsR14hnpc0fhXAbR62XEq6Tahy4jYoqc7EQwZZQ6OICX%2FADHc1M9i5PQ1Yz%2FwzUKflPzzZEL1RLj2JhV%2F6sG6zX8PABlflM%2FoZXSnMBN9fckx2n2axZLg%2FgVudiVsFuEyMjfTNRcP%2B95KSj9R26CFPblEgxxwVMSQpms6LZUMTjnvUUn9qlNzPQuC67ZC0md5k51hFKBtRUBUl3AJl3qsMNVpX6VvkLwaATuCmVfzsyBaCd%2BYTNXLzVcBtE2UxMbbOt%2FP4XZcKU3WVnQwzw3IBKSt%2FDQmAnKvu61LdD%2B68NM1qKBVNX9LF3OPbJAk%2BUAQ%2B77pylgYA4SdKOowTt0b7emg4O5mgt%2BUB0Vg0buGnk%2F8fs9ZsiP4G2TPk78gd6T0VLx%2FEurxATNRfI5rOEmO374ZJQspt3zhx%2Fxc5rVgQE8Y3OiPMOTVvs8GOqUBUi8cignOiW232T4Dsy%2B2%2F%2FCeGpU%2FtGrzVrsw%2FHmoSoMigSw5kNmww7u%2FJi3OjHE2W1jQXChwgQK5AtCjZrdfnbdfKbB%2BPCmcSyUTEKemWvkxIgdd0U%2B%2FDk7oVHvYKzHy9ha9WQGkTqq8y5QYHrTL9zog2I6qGj9d8wYC%2Bm9msZK4zSp%2FrgGsJIp%2BevjlLBmnIDhHn4RSlZWbtQcf0OFTcHsGFCRQ&X-Amz-Signature=eed715897faedc92ae8369ac366f2175dbad35d79d12548ca0274f210edc6175&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

