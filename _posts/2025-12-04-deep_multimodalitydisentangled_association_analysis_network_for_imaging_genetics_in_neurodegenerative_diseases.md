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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAV5CTHY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDa8bjf5c4tYIDlhnxzND8gNeZ2SFa6EClataH994hO2AIgOrxZBjNc850hh1Yn7TZxtaimUBtUHytTz2Gs6466z%2Bkq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDLy1g1vzcIaG2msxiCrcA50O86y4ltkpEBYTQuYQj3K%2BMrLRGwO9kLxWu1MnYJThPhmV2%2Fej0NPlaheaqr8v%2B4LnkuT4Hu%2FpQvDuBWdathqfCvYUDEg1cEroyxWc%2Bnff%2Fc0HpKaa8jJPpobq3D380N76TaNjtIEkatpjm5FxgSlVorRYel%2FR5VHc2F1YkpbMJPf4F5jGs8pj678YjHUES8WNBq0Wg6vzLxiO%2Bh715myM11t9uIuPA7UYDSY3BeCO3mvLfiM7jrk1%2Fk5evL%2BXrIvL8wFvfIrvkvs6fm2Y8hDDkMbT2DUzXb2WAlF4xlNVz%2F4awrajuWF9uhaQY%2Fgy4T%2BDf8iOSd3OVVaZ4iZepuwkKYIxIpGM4SqJMi0dlqFQVT%2FhKQm0t8jKjJ%2BQlW382vXlXKyTEtOjkhIDkDHy1iUdSbJdVy27zDUB7c9osI74R46Z6OeKFf42EaYOcrqDQ%2ByZ6XCZCQYYFrKwApPzlbl2qOiop9xUlJ2x4ACOogpVtJ2ZFUo78eeGaE6ien%2B2n1%2BqFuS5opBr0W0mbF8PYRdr%2BOUtEbMyrm7D3NDJpmqWuiQhzrgerN1miXuq8RKKmfT%2B0PfdeDvgYfLrkX3uLJ%2FP2TH09ZTh%2FE6G6hTpuyIxSnXj7qOxK3igIA2aMPrBpc4GOqUBdEVm2ze5xBTi4%2FXNpOGG7m107tU9gmEjOGmt6%2BPhKUXqzH4ewvbuIRHMXx9RbuBzvjKLOoeZBt7Duf5g3jA8ZCnqnLHeywTW6WGBbt%2B44cIMTKg68y0dD8OYtw7tA%2B8c8VtN%2BwgAi3q1VO0DYXq3McBvGS%2Bag9XlrwXnCglqd90rdqu56x%2BBNYM4hf6GVBxxamGZ1xy9Wygfw857uCBHhCVfNbBV&X-Amz-Signature=cdd84445da75edc4bf1cb428f33f46c08fb319c8b345d6ebfe73c792f91008d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAV5CTHY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDa8bjf5c4tYIDlhnxzND8gNeZ2SFa6EClataH994hO2AIgOrxZBjNc850hh1Yn7TZxtaimUBtUHytTz2Gs6466z%2Bkq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDLy1g1vzcIaG2msxiCrcA50O86y4ltkpEBYTQuYQj3K%2BMrLRGwO9kLxWu1MnYJThPhmV2%2Fej0NPlaheaqr8v%2B4LnkuT4Hu%2FpQvDuBWdathqfCvYUDEg1cEroyxWc%2Bnff%2Fc0HpKaa8jJPpobq3D380N76TaNjtIEkatpjm5FxgSlVorRYel%2FR5VHc2F1YkpbMJPf4F5jGs8pj678YjHUES8WNBq0Wg6vzLxiO%2Bh715myM11t9uIuPA7UYDSY3BeCO3mvLfiM7jrk1%2Fk5evL%2BXrIvL8wFvfIrvkvs6fm2Y8hDDkMbT2DUzXb2WAlF4xlNVz%2F4awrajuWF9uhaQY%2Fgy4T%2BDf8iOSd3OVVaZ4iZepuwkKYIxIpGM4SqJMi0dlqFQVT%2FhKQm0t8jKjJ%2BQlW382vXlXKyTEtOjkhIDkDHy1iUdSbJdVy27zDUB7c9osI74R46Z6OeKFf42EaYOcrqDQ%2ByZ6XCZCQYYFrKwApPzlbl2qOiop9xUlJ2x4ACOogpVtJ2ZFUo78eeGaE6ien%2B2n1%2BqFuS5opBr0W0mbF8PYRdr%2BOUtEbMyrm7D3NDJpmqWuiQhzrgerN1miXuq8RKKmfT%2B0PfdeDvgYfLrkX3uLJ%2FP2TH09ZTh%2FE6G6hTpuyIxSnXj7qOxK3igIA2aMPrBpc4GOqUBdEVm2ze5xBTi4%2FXNpOGG7m107tU9gmEjOGmt6%2BPhKUXqzH4ewvbuIRHMXx9RbuBzvjKLOoeZBt7Duf5g3jA8ZCnqnLHeywTW6WGBbt%2B44cIMTKg68y0dD8OYtw7tA%2B8c8VtN%2BwgAi3q1VO0DYXq3McBvGS%2Bag9XlrwXnCglqd90rdqu56x%2BBNYM4hf6GVBxxamGZ1xy9Wygfw857uCBHhCVfNbBV&X-Amz-Signature=cdd84445da75edc4bf1cb428f33f46c08fb319c8b345d6ebfe73c792f91008d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVVZ3E6B%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIE5XIJmO%2FbugD9fUnj7S9NwgfMCUGBeEtAJe3v7MOCgJAiAf3rDfIo0d0UhqjEWZG7W%2FLb0YLosOeWwBfIYIVdTHhyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMQb6L2jQOhnEWLd9OKtwDYPOwYc3RVVHrewxzYQ783PVLHjSeg%2F3zETlG%2F%2FHX7Wm1lbwYHYi9SsM%2B2%2F9n%2B8iDaKDY4RROVaUKDWelG9ynES4ubeQlQ9x0pu9ZbpmjWWMGg1oLLxJzRBkFcfstuyp5uIMWA3o2sS5FC0I%2FMi4NlmaBTex81d2tXiohpFIbfnEqI8R6DaVdUghCLhJ65HMxVSfZNiczvJ2o20guSFoZ1redApF9AFJbuH3PK%2FneNPy5MH7OwoKKmjIFPSkqfhCMNRf%2FKJMaygqmaUAGicmlmQIt6yV1xbwjcXHarz5KtLfAX%2BUAmG36kUhKU4v8DGCqGioer9ubqNE%2B4SLy%2FXV27M8H5YKIFOmUCNoQ%2B8zofMkF3vRKnJRHEz%2Bf3jif1c5itb6Kl3u8C8qbqN9zjtSya91KeBzTBUQB%2Bi9A4vn8D8J5zLGRsu2Y9DlxZsdMxPgP4m91EIjKts3lMRVgMyOaeGWzoiRu%2FVJ1LMKVAtTMQ92p%2FxWCinJ61yJsPsTaxuZwAXs2O4Jtkp2Z%2BrXmlHvVvdzLAopiZIgnroNhleJpnTnFXnzRvZZ8dalW%2FHIL6e0Z813v7k7OaYbWUNcTaNrj%2BPYqtNZAg%2FysIqR8gjI7TICDhiRbiVZo2M0%2FOZ4w48KlzgY6pgF9p14M1swfedxOnjZmojb3vN4PY3Me%2FOrs7YG9w4M3jkzHAVQ9JUwSLpRrYd1GCz4yxeTIOPg%2FXUzbBkegXGicmk4A5h0%2F3o7fYAZg225tThJplxmLUfX4S7Zgur1aFLEGYTQYflFSx9waGBi%2BSns%2B2QJ395tLXEUwCT7eN775U0vUHcZyNZdS8P2VXfaFPUo3zxs1Q5du8Bi26JJVxXSAbNGRdmoT&X-Amz-Signature=1736a8c0d428b857f91e6f0d0ed8728daec9b262e44f63c67643276f66f408db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TI3YFNPD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHB3UJR6gQPZBX3XseqJKjVU5PMTa9i8lW7ISn7isDaMAiBZp%2FguNbNRRLQ9MAcI8247N8DN9WHR9oJI4vWjJFmFnyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMzEwGiU4ar6LEOMsaKtwDTMPxxqh3TuGa%2BvHH%2BDiAQVviLNQG2K%2FhNDcPoWOQCWtPv5T1QVhiew51p6L2HIssde9K%2BTCFnrOgXt3jVyVa08j2FBre37oFmpqIBRF2n05fOT4h7YqHJkZSDsRLQQvGuCHr70vVHzz%2FynEuKtSYCzHq2TfH8Fr1ioYUfuApWt1iCTi0DRnVM9yoJPB8oSlsUjiXDFXT2xu%2BQX7me6SOHgLWt40Rr46RsdBjqRo%2FfcdiqEW%2FxzWB363bxUg9kRshTQvIWyy%2BDRzKVRhQEqMzs0AjCWN0L1r68qJfZR0SMM9JcMQtwFhWf7ymynVyEystXtk2Wpe911we2y5mSJ%2BluhljbtV7Eq6gD2TdisFXqdy7ArsyojWED50PpdtZfcFAuev025bOtYK2SDunCuHqKCEMozFj6QfliwzwlPxJiuGrr1dtiHC2anUYEh8FOb6zhiATozqLjwwjvhyDNkHjNVet3nFKNGTpRQ73T30ixeOCH4DqvSuCmHlkEOpZiRqkxROwfpuJtqSjfFxvsxDldKkbmAyHQezaN7llTHUV1DcNd15tY2OkhmBRej2uFkwN8K2L4%2FOPtY%2FBpT11w9%2BWdLykBY6tl%2BtX%2FwvzL8YuqLnDdSnCK08BhpTecp8wx8GlzgY6pgFREezbrMPRODQEk2Ir2JmL3mkUoz9D2Ui9ORBpeYSM2Xels8BMVNaFUhp6H%2FdUgPzkqoZW%2FB0uxfYY29qkMEuvPowm8bvSq%2FkoN22oRYE2DPpsPZUEnsUeHxmlCa2Zv0xP74k3IvaMc5qIK00xPuWnpcx6EBpnmnZ1bwuG%2BsiNLkvkaeZnzdCgfnD6AxqkM%2Bz%2BClp5UvvAzN8fwFtDcdIHj8uIUESJ&X-Amz-Signature=a8640deb20c1a6469aa2ed65e10d5c1d75a49d0d3f35503483ec966296ff4dc7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TI3YFNPD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIHB3UJR6gQPZBX3XseqJKjVU5PMTa9i8lW7ISn7isDaMAiBZp%2FguNbNRRLQ9MAcI8247N8DN9WHR9oJI4vWjJFmFnyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMzEwGiU4ar6LEOMsaKtwDTMPxxqh3TuGa%2BvHH%2BDiAQVviLNQG2K%2FhNDcPoWOQCWtPv5T1QVhiew51p6L2HIssde9K%2BTCFnrOgXt3jVyVa08j2FBre37oFmpqIBRF2n05fOT4h7YqHJkZSDsRLQQvGuCHr70vVHzz%2FynEuKtSYCzHq2TfH8Fr1ioYUfuApWt1iCTi0DRnVM9yoJPB8oSlsUjiXDFXT2xu%2BQX7me6SOHgLWt40Rr46RsdBjqRo%2FfcdiqEW%2FxzWB363bxUg9kRshTQvIWyy%2BDRzKVRhQEqMzs0AjCWN0L1r68qJfZR0SMM9JcMQtwFhWf7ymynVyEystXtk2Wpe911we2y5mSJ%2BluhljbtV7Eq6gD2TdisFXqdy7ArsyojWED50PpdtZfcFAuev025bOtYK2SDunCuHqKCEMozFj6QfliwzwlPxJiuGrr1dtiHC2anUYEh8FOb6zhiATozqLjwwjvhyDNkHjNVet3nFKNGTpRQ73T30ixeOCH4DqvSuCmHlkEOpZiRqkxROwfpuJtqSjfFxvsxDldKkbmAyHQezaN7llTHUV1DcNd15tY2OkhmBRej2uFkwN8K2L4%2FOPtY%2FBpT11w9%2BWdLykBY6tl%2BtX%2FwvzL8YuqLnDdSnCK08BhpTecp8wx8GlzgY6pgFREezbrMPRODQEk2Ir2JmL3mkUoz9D2Ui9ORBpeYSM2Xels8BMVNaFUhp6H%2FdUgPzkqoZW%2FB0uxfYY29qkMEuvPowm8bvSq%2FkoN22oRYE2DPpsPZUEnsUeHxmlCa2Zv0xP74k3IvaMc5qIK00xPuWnpcx6EBpnmnZ1bwuG%2BsiNLkvkaeZnzdCgfnD6AxqkM%2Bz%2BClp5UvvAzN8fwFtDcdIHj8uIUESJ&X-Amz-Signature=5624f31e505c780f3f9f711f040b422ac6b88d3d4580c4337c6a81e7bd704c3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTKB7JAY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDhCFHbuLPXj3XiBn52%2FcajxqDvqL%2F9thmbPFt5%2FQjU1gIgJzeBNHHrm5kBU5Ow8SRKaxqPDF3BtEth1W8wFrQ3Y40q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDFNxdnCNvV0SDvTl5ircAx4ZXz2MdeA7tlizU7TwSxkH1tQSQcFkq9Q2%2BV6skIPq6Xt8XNbmVq40Swfvg9sSNFH72U%2BMX9CYW5a4B%2FAGuP7IUDpmvgHaV0lUC6o%2FfSjNcpxm7jFToi%2BHNvVNXukgccV2TzAJEmA0KiSoreHv8uzDKEzaXVUYhwrhXcclEVCx4%2BtgE7Ew0DNLEe%2BybVTVoPdnpUI3Q2StAcxvpc1b6o5OVzog4FvhXe33pwUaVgg7K5EkWlTvp9zQKxwGDz1i%2BQNV%2Bmshrk0Pis87C15J7UGO2YQvghkzwKlZ4aPyCU4oc%2FSZrreEzdyI22VDypdBA5aK5Ulg6JE0GSp6ENrdJdiQFxRVSfKlpBX4GKAuDGuGAKkiX7lBMzZRmuCAPDLt%2BV5NF5AlzQnB%2F%2Bkm1D41jdDmXKL9PFC4eSEHnctvZILDPQHLH9gJgJiJI6wHtlsmdnZDuLqz%2FlbIod0Ofr20xZ0pa2nstTtOhaznSWVNFlDujW%2FVbKqO3QGmrhqWQxA2MSJsKteeDeMRDNMHNRdMNH5CdHzvObRoWOHtz7A%2F%2BGseiJhKtcPs%2BH8BQPvFICoGT%2Bi2%2BxnXB6F7bhREthIi%2FaHQherdg1e8fLoovD1V4Bj%2B4lOf4dyFsNvIIGuhMM7Bpc4GOqUBkjlQD7iTiVNtt0%2FjmXmkQL7o3hVTgfCqJJZbK6vshaLioBgbB9Y6ijr46LnwKiqPfyWbmedugjvncj23vmQQavVRVSUfPjAh5%2F8%2FbIrXNuZR%2FftuCZF2cVHcI8IJvGyCuGRkUgDp5MBFq%2FVRIDBluDE9yWSyz4zWCS%2BQD0%2BF32OmJ2LYGKMyLBA42qrxgL2Rlk%2FlX7hqTZSpB1%2FQCHtIUA537qns&X-Amz-Signature=8971686f54c2db0b6b964215b73c0eb09aee6e9bfcda6d5e817ceb6698a0917b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627LXCJD5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIDTLHnJ2gmZ%2FCC8XH55JcedXsND9gWk%2FCR%2FtKH8uWtj6AiEAmSNk%2BIJVTKCNRThjGaHkRJ60tbAs8%2FkY5PRWgH6UzNYq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDCDTon96V88joHcgTyrcA3aF6qWHyYVGn4b7AH%2BOJrbJnAQRAFoq14GMoX95mm2njHIEHSIuWah1ZY5FF46cNe3JJrSIPp23MjLGo4biaKELTN%2FztCQnWEvoqS%2B85ethhTJziluPklJLU9iobeLs6uZGGDd%2BPTBWjwWWC%2BqYwj%2F%2FRC9SdFdgTEAKtRzhYAWgibeiDVL%2Bt7n73qIvtqM8nWZtjqFI4bb8vXYYr62pT9cTJyLvttkjnwSVpf62ZiVDrsD00HOzbqSbCmPR0GBSl76OBBd6sBCs6MDMDNZoEShbPBE3cd0iHIYxRIdcMuTO%2BQZToDkierLeyXV8bPlf%2Fxzf73Zv5sDPOiAX2UUJKqLZifgWDawmTdWM5mrGcroXn2%2BA9J3T%2FlboMkiQRYWwovWXkpew1RxW3vAi0xYn8rBS0%2FLtqRcQJyw6%2Fzbp0UqYxXkW%2FdLus8%2FwD%2FpjCSokdRb6b8L9ESilIRVfWY%2BDxW36cpj0Ru79uCv%2FSRmhmJDGUeSmCD%2F8suGz8s1qE1%2B7WxVaGvZnTajkT3kRZEs8cTYwRQ9G%2F722ktdnxLnVIMNEKq9GSbIQoAz7t%2B0T06ORZY%2B1nkl3rWZ0FOXa4DFsv6q9ADPG0Twwvykxs67NdL8rwg0wAk3FG42OSAl%2FMKzCpc4GOqUBMGPHbenBBmrwWL5CiZH%2Fhg9k9ljQ7DlDXf0mkFG5JkVnlCq2TRRNAmGv6thv17h2dkIS2wreASL%2FgOsSjG5Q6rUtixrpWGej0YJpSeXsgjuBVTjVs9FlOGlDhtqXz7A%2FnP13%2FHvXL3%2Fs%2F5yGFgQJJ%2BsaqO%2BmkSPWxUyR123O4N8R3UV1i4fochsIBTBeE1lT2SXQ90nddYmXqQI1gWJMGvjtkCtl&X-Amz-Signature=0b23055d32d1c7894bcd6136a3ba44275dab17ec54e06b42bde88c0547bf86db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S75QH5QM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIE5NQ3ghXcgbu8VbMMIK6sJO%2Fl1P1JJAvBGcFuOQI2BJAiBwtfuH6EXqyPqX3aKNww1qROAbY6WkD7M4c7MMtAvZIyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMME%2B4AmuqMKfFv%2FceKtwDYjTolEJXq2q993matqJkh1ppEMgIuOgq5Dmn1Uc02By50Zy5PIAEsWu4pfF7Sj%2FbdJvNgjKKwwv5Q5LwX5548RuwVS9iuP0i3JKOZMWrDoRUSwRNIPlF6gQWU40fTRyPIJsNn2A18ikuw97wBMw2i%2FYg%2FBnXQqaGTj7hF28xkkB0HDsBDDgyE4KB8JJm2G0LN8FDWPfTzpuQv%2F8uL3FDXT3RiAcqjKzzs1O6JSMTWlkpD4NLTfWDnaf%2FFvqVCRp2w87in1O1njxAb3jRx7U0%2BsPjmv5FXBp6In4HY0eKBmd1spdhlnSo1WB84oE6lWM4M5G3cjfHRWUco708VcVMmi%2FR0ra0v4dBrTRivkw5ApUUc9lATcNbRE05hmmgoX7bk%2Fd%2F9P%2BDm%2FSWefJv2QRozoTwC0gRClzVNJqecwT2hBrWOmQ8bgTgU8VByRVTRApm5XXkBOtsvWFR%2BQI53bwf0K1CSyGmfvFXfNbaPx6axg0iNG2fhwUfjKhTAot0nek7B3%2BYs8ABxjHkP6WkIcwg3qtoZ2juK38hy2la91jICDAs96siFWFm6PYWUn1Lkm8lbW7zf93r4qSIr0hp5uEG1U%2BUSzbq7njy486ZJzifY2%2BZefsVWIwlv1SrrDQwwsGlzgY6pgFWIXrGb8xNzhdKPAuD0kjgTylFRGq4nRh%2FBiKohsjboFJxFINmpi2xfhwdriOBluSlIvIDNbdoYAILzP%2BsowEK%2BETsYeTU2%2FKAZU0AYCJrV%2BRNHWSc%2B5IYQLVxFWKkE18QdSFZt8wosGLh6iXYghKGz804CPvxL6yPWPO1M2LgxTLFUxN%2B8TapfzdiMIARnhcMFGC%2B30B9tZr40U1w%2FqIJdb%2BFckZQ&X-Amz-Signature=4187097555d753de32ba74b75113b7ef3728b79651f7d1952588152994ac4702&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZDXXZFU%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIGV%2BrquYQguSykrPdrIwM%2Bf3PmXdqYhCI71APAPACSF4AiBL%2BjAKSaioUo%2FvsYznto5Ro%2FpIhQSYan%2B38%2BYv1vviNCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMk%2FYT6fB7SWHabLE7KtwDyK3pi53VqpVa8bFPUHw7qqlo%2BsLbhBdVpB%2Bcl0xo3EwTGlumgZWqkYKV0mNRE5SbiIsZQ9vKqAWpAVdUEZvkRlmFfX5lnhcIWbKKEvSIrKZzEvlZLMLEOC2dSAAi5MTbfh6PhwDNcw9ThiT4QCHJDkJ88XBNr%2FqHl7d0Othby9y8yCZsbrmY%2Fuf%2Ft5gmN7tXIQUrGjBJ%2BT43wPgxqwi%2Ft1SDEIez3aqnYPgxypBNwV4vKwstnS5uP%2Fj9X5je5CdU2mRoTKfLTG5AXfuf547hDYIf5C67l2kQtJtMYF0ohw2V3Op2rZry%2FCxYgHXDFmtrGoOhogSXSJY76%2BLgco8Pvr9ElZL7VZzD6rkahF%2FtvyKHF8dj6mWecSw7uF1Rvw%2F4oo6%2FKIIO8pk6QFcN8NZ1FlPnKBnAdnYiP4CUBxfFfsnaaLbhAq0IvgCDaaeiL7eUwii%2FR7tSfWJhKTN%2BWTrrNqeDnnWNVE8ThenCaOg7qtbAelK3LhxfJJ0Xgn6x0ntRFh93L5hUDe5Rdm1awG1ugB7zjSkvyFIroKHDyf8eF9bHbjiFl9kZJNK52iGJkce15xWFHKt5ZfMNCeHzLLGi7KHAH9Vi%2B%2BAs6Bpe84bCkWapM2qHWPyvJvrzbyQwssKlzgY6pgHoCyCdFr0Z%2Fql4UsOI6IC3x3hXXylJ2rGe2g6EoNw9CD%2FUDVmWSI1kYvrCy2T31KyJ71LZquDqpCwzzvRE2Fh7MpoA6F%2BBkTemjNd3sLQSLMIGQj51x5RO3qJhBXQCBhoG%2B5yc9s5SNG2%2BgImKksMp1N%2Bedzuku%2Br32OeWacZNr1%2Fbdrw2UoYp8995edd1C%2F740YdfaB24i8n0rlQrCxE73qvYEHUx&X-Amz-Signature=f52c3cbb49c5c0f4b3a6fe11226a4e7cf195a1b3825dd937caf186c237babdd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZDXXZFU%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIGV%2BrquYQguSykrPdrIwM%2Bf3PmXdqYhCI71APAPACSF4AiBL%2BjAKSaioUo%2FvsYznto5Ro%2FpIhQSYan%2B38%2BYv1vviNCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMk%2FYT6fB7SWHabLE7KtwDyK3pi53VqpVa8bFPUHw7qqlo%2BsLbhBdVpB%2Bcl0xo3EwTGlumgZWqkYKV0mNRE5SbiIsZQ9vKqAWpAVdUEZvkRlmFfX5lnhcIWbKKEvSIrKZzEvlZLMLEOC2dSAAi5MTbfh6PhwDNcw9ThiT4QCHJDkJ88XBNr%2FqHl7d0Othby9y8yCZsbrmY%2Fuf%2Ft5gmN7tXIQUrGjBJ%2BT43wPgxqwi%2Ft1SDEIez3aqnYPgxypBNwV4vKwstnS5uP%2Fj9X5je5CdU2mRoTKfLTG5AXfuf547hDYIf5C67l2kQtJtMYF0ohw2V3Op2rZry%2FCxYgHXDFmtrGoOhogSXSJY76%2BLgco8Pvr9ElZL7VZzD6rkahF%2FtvyKHF8dj6mWecSw7uF1Rvw%2F4oo6%2FKIIO8pk6QFcN8NZ1FlPnKBnAdnYiP4CUBxfFfsnaaLbhAq0IvgCDaaeiL7eUwii%2FR7tSfWJhKTN%2BWTrrNqeDnnWNVE8ThenCaOg7qtbAelK3LhxfJJ0Xgn6x0ntRFh93L5hUDe5Rdm1awG1ugB7zjSkvyFIroKHDyf8eF9bHbjiFl9kZJNK52iGJkce15xWFHKt5ZfMNCeHzLLGi7KHAH9Vi%2B%2BAs6Bpe84bCkWapM2qHWPyvJvrzbyQwssKlzgY6pgHoCyCdFr0Z%2Fql4UsOI6IC3x3hXXylJ2rGe2g6EoNw9CD%2FUDVmWSI1kYvrCy2T31KyJ71LZquDqpCwzzvRE2Fh7MpoA6F%2BBkTemjNd3sLQSLMIGQj51x5RO3qJhBXQCBhoG%2B5yc9s5SNG2%2BgImKksMp1N%2Bedzuku%2Br32OeWacZNr1%2Fbdrw2UoYp8995edd1C%2F740YdfaB24i8n0rlQrCxE73qvYEHUx&X-Amz-Signature=4736107f16d13e5978fa87372a3551db77f944c2c1077e6462306d8aae7bbe2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OC4CZO6%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIDiEIqzP7Q8ut8JUay%2BIRcQyzUdqA95ECskJ2SNc4an3AiEAugopVyhIlWLdR8proEMSMBJvXmldaT9R6fiejLK%2FbHAq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDJ8AUuEQ0eu4qA9tOyrcAwZeQeSTGgrnY0i2wu8T5II6%2ByClejs7dCtzOlXzwc1ZHOMCiHeNQpDwy4onL4bXu4OWOYin9ZaqDa2S4HoOFPm8mm550OM2HtSj3ueWasTrDeckuHT4nDdnjZf2HlXvVaNNmEclUhCcbL9FFdTHEEzLrAMK7w%2FBNeSvxni7tObpA46J192mcgCK5OJ2mfJIBvd10n%2BUqBWENM6WqNZb8AGwmZuMNC1REtadGvcIo8CZ4rV2cc4VSCuqNo3Ek7Rka4BNM%2By0sK6gWdqi53Q5y%2FjyGBm24vYLnWjmsrZ8Xi9lU4TNhKWwUC9Ff%2B3KD1YWdjWYe9lq6McI%2B0O3G5kS5nODLchgBwcHdXnJAPXy8iksDuR3cTWgA4EftrCw9Wa8ajqEwpCjJ%2BQNQGMPHdRGoGPrW2ndt1ieol26gMxkQilwSZCOgpoz2N5NBgcO2maqZDLKMsPJTKk9sdgSySfui4tWS0jDditLWz%2FhoJrVH2rRB4Zhk65FC1C%2FRNBMdMLAghEpva7e6QU3%2BeFl2f%2FW5q0YlnISKRkNnxb1E2amNzIw1zf8QfPXdmAFQ%2B6NxTNSRTF9PTIybVKuKCOGj4O2pFumMyI%2FRw9Dkz2QVWl9kkx25A2roO5mLMx8SALuMJvCpc4GOqUB3y4L5LOInvDlXzkKTkAvd3s9w3X%2BJQZx8Cdb96dAQ4PRAs0Wu9iZap2pZX36Ji1qk2uS0uFS%2FP9Ejkvf%2ByMAkR5CQFpsKu%2BJEI6%2BLY6q3d8CSCLUZOCSdXkh6wtmCPy%2BdjpjHpeEJNimDN2eTPzEwqlg6d%2FP1R3UwJ0nJohFfkNZ3svPC030NlfI06hlMWfXPJP%2BvsGOxNVSUrxi5oiUCVGO5HdK&X-Amz-Signature=29f80b34825d64d4a9119601d3301ae194da59d7ae9b1a6981e31bfda7a2578d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XWGPQVJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD8OKuCLHw67xxLpSBK039QIigr1xg1kiEWIVVEQYvj2QIhALSN4hPRZybYsL%2F6SyI680gLW8jKNvUumay2cqzcolWcKv8DCBMQABoMNjM3NDIzMTgzODA1Igx7BhDJzTZrdLYoNmsq3AM7wl0p4kKJIsUTl4hmIFozZIEgdOTIce%2BObrr2ORQZAvVN9E0e1LXTAVYiZetXKzMjt6SKANiZLoq5ytXzQzg7wly3blLQkD45PsleaFRl8Tc0RaaYBXELXx43X%2FRV7qYJf6zLR0ehFmCwxhn5Z%2FMM8JtLBBUN9M4DGCipL2CBdZ%2F5NNEXNpfjKEEKyBDgN%2Fz6d%2BEVMHpPZkljqnuJI4ATwwpDLAgfjDc%2FBLkc8c36%2FrPTWXUVC3cck1FEv3MftSnt8KikQfZPkJpUGcYr5S%2F8FgWGH09Ux4KEV3DPpoMgYyzHNJvZMWs8am1ftP4AoGn0Ruzklt81JTwyMniKwg6B%2B0TWsirVvA0HVMXzFMfJbMsnyR8u9AiPecvEpOBxRvQbjqklFaOFAkiZYtSbPjVF%2FGSVy1MB%2BkjCo0kB7rdizdWRjhFUYxw8XTXnHl3feSudE%2FfNk2vCU56g6X9b5LhPFoqcwOCXdo0WLEUtGQOtZ6uUScubuWaOR78LbYgng8u0%2BQGHF%2FMk8Y%2B5gwgS5Uia09bKc5UbJOCJHfWt1ugrSM2nIiIZ4rR0o2m311pg7Ty%2Bo1wVTH1ZS69VP07AbvUOb1KaSCmkYz1RHKtfuWsJKL0J0T7zMmOhEI5lcjDbwaXOBjqkASYo46k3CFeVJ8bgQLAUeZ8tv6mDZs%2Fw1pkpkANNkaIsdIIHT8hUtTwK7MrWMUx6wwOO5cPOxfSNFEjWhk%2Beidd5rBszn%2FH%2FmVZfIPx5KhwTpd3S7GSGMmKLj1V8Byq6YfuxU6zuWMrBwdS1eGENsTslKGoUm16XjLEjCAgJn9qsPCsprecbHTCF9pO8tCbDHf7%2B44yJtW%2BX4rjfK%2FZMgglpXTPY&X-Amz-Signature=5ff3fd8280717e6059cd3f412238d0285526d8f7d5a7e76e3170d90aa5867472&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XWGPQVJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD8OKuCLHw67xxLpSBK039QIigr1xg1kiEWIVVEQYvj2QIhALSN4hPRZybYsL%2F6SyI680gLW8jKNvUumay2cqzcolWcKv8DCBMQABoMNjM3NDIzMTgzODA1Igx7BhDJzTZrdLYoNmsq3AM7wl0p4kKJIsUTl4hmIFozZIEgdOTIce%2BObrr2ORQZAvVN9E0e1LXTAVYiZetXKzMjt6SKANiZLoq5ytXzQzg7wly3blLQkD45PsleaFRl8Tc0RaaYBXELXx43X%2FRV7qYJf6zLR0ehFmCwxhn5Z%2FMM8JtLBBUN9M4DGCipL2CBdZ%2F5NNEXNpfjKEEKyBDgN%2Fz6d%2BEVMHpPZkljqnuJI4ATwwpDLAgfjDc%2FBLkc8c36%2FrPTWXUVC3cck1FEv3MftSnt8KikQfZPkJpUGcYr5S%2F8FgWGH09Ux4KEV3DPpoMgYyzHNJvZMWs8am1ftP4AoGn0Ruzklt81JTwyMniKwg6B%2B0TWsirVvA0HVMXzFMfJbMsnyR8u9AiPecvEpOBxRvQbjqklFaOFAkiZYtSbPjVF%2FGSVy1MB%2BkjCo0kB7rdizdWRjhFUYxw8XTXnHl3feSudE%2FfNk2vCU56g6X9b5LhPFoqcwOCXdo0WLEUtGQOtZ6uUScubuWaOR78LbYgng8u0%2BQGHF%2FMk8Y%2B5gwgS5Uia09bKc5UbJOCJHfWt1ugrSM2nIiIZ4rR0o2m311pg7Ty%2Bo1wVTH1ZS69VP07AbvUOb1KaSCmkYz1RHKtfuWsJKL0J0T7zMmOhEI5lcjDbwaXOBjqkASYo46k3CFeVJ8bgQLAUeZ8tv6mDZs%2Fw1pkpkANNkaIsdIIHT8hUtTwK7MrWMUx6wwOO5cPOxfSNFEjWhk%2Beidd5rBszn%2FH%2FmVZfIPx5KhwTpd3S7GSGMmKLj1V8Byq6YfuxU6zuWMrBwdS1eGENsTslKGoUm16XjLEjCAgJn9qsPCsprecbHTCF9pO8tCbDHf7%2B44yJtW%2BX4rjfK%2FZMgglpXTPY&X-Amz-Signature=5ff3fd8280717e6059cd3f412238d0285526d8f7d5a7e76e3170d90aa5867472&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SACKP44U%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T182231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIG6q0e10m6okSBg3YFq2py8CktLS6yhyHWP4dXR5EYndAiAg9bfmew%2B%2Bu88fkShn1G7wMdE8%2F7xRMWju3qZpXILrSCr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIM5pZi6iSYd8bFmLfzKtwD3uItXNaW5EKyyoG4frUJ1%2FincUlQ4DLDIARbsKBmvwsclEKLpguLIXjkrZKgOMoZIwP80I83IcOdgS%2Bk%2BP1DC2ydt76HA3cxrP2nRUc1oYD862wDiI120ngfwpxhTLYtU%2FQ4uBKyYUwVDNlTFkPdpSX9mPNipK4vfMxsQuOK7nlxBOu3GugL4tjvUeqqUYOnNVzpSQhu%2FNmtFNi1YOFTn7VXsvvKTOK7W6CmEh7%2BnCtQBg%2BrC57WgZpUUR9xOInKQFVgXctMnqJ5hM4cNRG8rIeCNAHXjuRQRAmKcdwFcHgSU5yBTGkgLsgfnGuF%2FwPtgA1GjqDHhfOFO%2Ba6oib5G9PEVMSZIx7c%2FHDrE2IquWFeuPzk7RC3c28qVmLDNuIEzuu7dO9k1LjAPW4x3BtEojo1b%2BKnIjCfLL4jbj2u4bn4evuIe%2BeVp9JOoZdO57FVaYO8yxbnBJt0XSGesDM86%2FYHKT9BcR5rjqy1%2BYMQRIeOZumxZQgqGYa0m4VVKxE92zg2%2F5cp%2BRlRMMNQ%2FH4N%2FHcGRp%2BNKC2ep83dugls2gZySBc29DV3wORc7pLWoZ4ap0MPFKc7OnfvjwY6EJle2KTIVc0095zlxoAx6NQBi8nQNF6Nj8VYXcXfzJIw08KlzgY6pgFawzNopPo4vJMherGzRFrhhpNzm%2FDkPqDyoH90WRPrYnuJxkQc8nz5Rzc7gt5bf%2F3j%2BrKPr3kZ0Kn4AUXPjKd2dBzpujZGIVRcqOGINhVt0AmjeeCfSbnXJ3L0jewC60DJWnWZspqaEbDHDj6D8T1luDR4e%2BmWUGynOtyWYCI9fZvXEhoactyCg1WVaHMNIj4dVPCWsm%2BCfSqyDxea9jLgLzIMdXua&X-Amz-Signature=ce84372564e5031b94005b794e5464571ec87d9f74e57f4397b9d8aa6f131406&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

