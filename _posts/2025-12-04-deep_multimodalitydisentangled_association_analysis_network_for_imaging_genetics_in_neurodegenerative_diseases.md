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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THAWMWM6%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIGGCypLSDUv2iTddexHzG9qNGMZ4f7g4q9knzISC%2FSEnAiEAgpy6FTTQ5%2BQHepaeJSqSt3gM5sQQvFzLmKN50qXKc5Uq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDCDV4jKuGPwmX1tLuircA3BZSNTMD0UvJ3PpcPbOvk7jz%2Bj4cgqkZToenka2RiOzJVzJwhdOoDp9sRKj%2F5p7j9Cf3aw6YTwGemoCpsdOgyI71A1GHZE1ekrO3zubyM8w6LfmsdPhcaXSMqhtd6nRQjIzysJwt%2FOehK3fO6vWGyD73hi%2FOX7JvSgu444hopFMe8ofiQ95Zyy%2FDLlvLn4M9j05LAwLSwARUMTynBtwQLPMqVCbgumy%2F81J1HneRYBWVovac%2F5cqVtn1SB0y%2FPB05ECo4epXXZwf6gDWKw5U6DyN6P3iu8YuaoXKBKKiJTNDfUxj8Lt8WFEsEaIs8m4h3zbCjBJvLirfhS7wAnQbai9g6oji47RzGdmWBXSzAg08ByS58sPdOiWKXFJgJdTLf8eGo9I%2FVRum8XzfMlD0k%2FXm6gpu1FJxfJSCxNJEbTeAE5nfR%2BZf7b2TuodyP0giKi8TzHTGLZdBkvtxZ5zdLQ3VqtybCdSu9H38pO1fjkIcGNHObYbkRnhAVGZTnLyo61ShIH22DiYiXiM9laCUhzoodtn0aAN65nCg%2FZUvulDj69GEScsbqlucBmf%2FSMLtGNz3fGV81%2FUGyR%2BBbZClF9u9XJ8jmLDeLzpMun1SQs6E8gEhVO%2FiMr34eYjMIGQ5soGOqUB7FLLhz1EDbq%2BzfwLHGvgbmT%2FPLZczpAPew25oejIEgfkv5iTdBykZhwhvbqI5yYpecw0osqtsiSRgvcY1WKfwikRl%2FSjOVO8yam3M3gMpIhSU0%2FxzlTwUmgUOuOnjUGPTSZiS%2FoIllpLp%2FSyaNn7M7OeZzpfEDF9eJFzvact1Gnf2sgy1%2FjX9o9VXyLnh3a9apwR%2BUAUjH7T4OgKg7TLCSCM0l8t&X-Amz-Signature=5ad2876640143b4721fad4d553b5d52ce942238a4d3c0994f6336a657002b176&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THAWMWM6%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIGGCypLSDUv2iTddexHzG9qNGMZ4f7g4q9knzISC%2FSEnAiEAgpy6FTTQ5%2BQHepaeJSqSt3gM5sQQvFzLmKN50qXKc5Uq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDCDV4jKuGPwmX1tLuircA3BZSNTMD0UvJ3PpcPbOvk7jz%2Bj4cgqkZToenka2RiOzJVzJwhdOoDp9sRKj%2F5p7j9Cf3aw6YTwGemoCpsdOgyI71A1GHZE1ekrO3zubyM8w6LfmsdPhcaXSMqhtd6nRQjIzysJwt%2FOehK3fO6vWGyD73hi%2FOX7JvSgu444hopFMe8ofiQ95Zyy%2FDLlvLn4M9j05LAwLSwARUMTynBtwQLPMqVCbgumy%2F81J1HneRYBWVovac%2F5cqVtn1SB0y%2FPB05ECo4epXXZwf6gDWKw5U6DyN6P3iu8YuaoXKBKKiJTNDfUxj8Lt8WFEsEaIs8m4h3zbCjBJvLirfhS7wAnQbai9g6oji47RzGdmWBXSzAg08ByS58sPdOiWKXFJgJdTLf8eGo9I%2FVRum8XzfMlD0k%2FXm6gpu1FJxfJSCxNJEbTeAE5nfR%2BZf7b2TuodyP0giKi8TzHTGLZdBkvtxZ5zdLQ3VqtybCdSu9H38pO1fjkIcGNHObYbkRnhAVGZTnLyo61ShIH22DiYiXiM9laCUhzoodtn0aAN65nCg%2FZUvulDj69GEScsbqlucBmf%2FSMLtGNz3fGV81%2FUGyR%2BBbZClF9u9XJ8jmLDeLzpMun1SQs6E8gEhVO%2FiMr34eYjMIGQ5soGOqUB7FLLhz1EDbq%2BzfwLHGvgbmT%2FPLZczpAPew25oejIEgfkv5iTdBykZhwhvbqI5yYpecw0osqtsiSRgvcY1WKfwikRl%2FSjOVO8yam3M3gMpIhSU0%2FxzlTwUmgUOuOnjUGPTSZiS%2FoIllpLp%2FSyaNn7M7OeZzpfEDF9eJFzvact1Gnf2sgy1%2FjX9o9VXyLnh3a9apwR%2BUAUjH7T4OgKg7TLCSCM0l8t&X-Amz-Signature=5ad2876640143b4721fad4d553b5d52ce942238a4d3c0994f6336a657002b176&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DT2KRID%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDnV31ebg8cDHp49pdj5nHn%2FStdH0BWESmyHRqbrAe6ugIgJcxUQmPxsgoXFCUAD126GGWwg7f2rApxbf0reDZStTwq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDMmw19WVFib3wF2PTyrcA26bYHNJUY7r%2FquEK48psbDA3IzMZ%2FISU0c%2FwfU%2BjTtSLyXgT4Fqt2N8Vx%2FD9hjr9y%2BdzQhfuTOEePs1YySMeV3iTm9arYqL8RlbLYbpyLZTZHVqV%2Friskxckn21QoILU0Ay76zke5gxlhhUZUVjQzF%2B0CtQJp8GDE%2FN0UEIoxig58P25E9YHfuTCJlRzNlkWX%2B5iUbmnAmzA1Ln6Bl0ORdi8QcApQzOHk2p2x4HuUJIn%2B9J2pHYFsYC%2Bw8RcB6v4B9uD2%2FXMjnRL6CM5w4SWtRQcuPZKILMcWsVoFbdypethrq%2BPELeARh1hOyDD2I8QhwgoRxyfJa7%2FJ1iMuXkmGHhVSbGwva68OhMUmvkKc65t19xxNztz7OjXy2V8Nc46M5SI0cYDCre9DvPHUuwzrPzVS6uo4tdt7Sj8ogtP%2Fg4Oe%2FJIRua2EjgtMvdD%2BgZUfZUrmT48n4jdJEi3mqttx589MRrnAfEokNfvOBPOEtrkopKZlhE8c4AkCTdcV1nJcGBPvqosWHuDZIeIrdKbXmL8dvYNwAYqFx0eM0%2F%2BPFZOClyRxm%2F7KzjF3XoyRVP4KzNvr0iq%2FzscWT8LFsY%2Fr1YeBYY55gVFxwd9eOZRMpNs2ENDVfwkDX0b%2FtzMK2T5soGOqUB7Yn3MEwKoYgfaV8gxw3HoxY6B0U9Sw27DZlIm2a706BEqIBTj2iMFgrMpLDpG04I4oB5WgZghrAiwJcx0W%2FUrGCZaQbQAXkwW%2F6wOAHCRDXi6XIilmJOk45JgeuLZsqglY9EaenB2Ru%2FzNndylveDL2Cpq0vM4iq71ZqFr%2Fkf%2BhXF%2F6sOdjcm0NuEeLawHcl%2BoQV1CSNc3WLOTDeVJpccAlaEA3T&X-Amz-Signature=5caa3a80a8d44bcf005a28752ed29e8948405e3728cfa8e948907a8d6ec5ad4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOJX7REF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIE9vn%2FaAHwcGTQEchv0FJeYOWciYjXOsza9%2F6xAR1mBeAiAG30SWnucRgL9RLBVP40O%2Br2PYkxMzIvaZmRkmWrqLKyr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIM5IbYevKBJWEq395RKtwDnhZE%2B1W4KlzM5z5pzq8wFNGzY6beozNbWfnmVqLwbuoUdF0%2B3fyG9QjHCdH8ujDetteXFL8tlZek1VCZHPNx1GsUcDqMaIkBNP8m%2BsgtHoochvZn8dKvGXF5HGoUnyn9cpYvM0bLAW6iNqHFoVtMNoBDkzQSVOk7kb9VzF%2BQzAS2hrfKmqrG8AkH34oU2kh0B1hxbj%2BBU8%2Fq%2BPg5n2lrG9NmppNETrO91LqYeEbG2hwYuAHTNjD00plzw0CXgt%2B7MQaMJirh1AUpKe2ajF3i0s2qRr1wJHWKrul8DLAupBmjdpwXXr9qubxfR3vDrkI%2Fi1h8Ksnxu94c9vtuR2nqY7TQmBoMttG1ZAvE8Z6E8JG%2FNA8c1RhGCeoaqr5e%2FOBYqpP8tUDUt%2BrA8AX4TWaxjwf%2FhMm56RyLbFMGHv1gEwiHOCpQvZOVPaft9ia5hZHhW4yLwoPj%2BBD8jjWWdxgCcJMwyzWPFwGwTOH%2Fxvz1pUjqjZsJeegOiAqLS8VgzgT3aoxsrb1kq8jQPBKm9hyVPpvvqXMtcBcixprtxnPZp7RPMIL7FsydnY09X2trEN%2FXHpPJ%2FkU36McPB6sivw00aZRQpWadfCQnpWvy%2BDJc5GlbbshGhMFGIbvyh5ow94PmygY6pgEpcjiePI0lW%2FzuN8UWJ6r8QPEf9SG8n7KyAgjSXEm%2BMz6VL4gQGP0TBu25uYHY9On3fJKY4DTHtpanD2pyTyUHzIrDb%2BP%2FSSHzodH7Db8owN4oKNLfxdwo33z2A57QN%2F3N6wTN0tvMLDyo%2FfvubM7HxPaTXuhoZlC%2BMYOWRlzzMHGNzthT2bDYN9WoAiFKM9Mn76FZOhiAVBcvHUybIcC%2BWC%2BWtVxf&X-Amz-Signature=f75091246b88ea28b0efd4b7e0e2ef9a8c555af8424404f326dc8b8aa6d74e84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOJX7REF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIE9vn%2FaAHwcGTQEchv0FJeYOWciYjXOsza9%2F6xAR1mBeAiAG30SWnucRgL9RLBVP40O%2Br2PYkxMzIvaZmRkmWrqLKyr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIM5IbYevKBJWEq395RKtwDnhZE%2B1W4KlzM5z5pzq8wFNGzY6beozNbWfnmVqLwbuoUdF0%2B3fyG9QjHCdH8ujDetteXFL8tlZek1VCZHPNx1GsUcDqMaIkBNP8m%2BsgtHoochvZn8dKvGXF5HGoUnyn9cpYvM0bLAW6iNqHFoVtMNoBDkzQSVOk7kb9VzF%2BQzAS2hrfKmqrG8AkH34oU2kh0B1hxbj%2BBU8%2Fq%2BPg5n2lrG9NmppNETrO91LqYeEbG2hwYuAHTNjD00plzw0CXgt%2B7MQaMJirh1AUpKe2ajF3i0s2qRr1wJHWKrul8DLAupBmjdpwXXr9qubxfR3vDrkI%2Fi1h8Ksnxu94c9vtuR2nqY7TQmBoMttG1ZAvE8Z6E8JG%2FNA8c1RhGCeoaqr5e%2FOBYqpP8tUDUt%2BrA8AX4TWaxjwf%2FhMm56RyLbFMGHv1gEwiHOCpQvZOVPaft9ia5hZHhW4yLwoPj%2BBD8jjWWdxgCcJMwyzWPFwGwTOH%2Fxvz1pUjqjZsJeegOiAqLS8VgzgT3aoxsrb1kq8jQPBKm9hyVPpvvqXMtcBcixprtxnPZp7RPMIL7FsydnY09X2trEN%2FXHpPJ%2FkU36McPB6sivw00aZRQpWadfCQnpWvy%2BDJc5GlbbshGhMFGIbvyh5ow94PmygY6pgEpcjiePI0lW%2FzuN8UWJ6r8QPEf9SG8n7KyAgjSXEm%2BMz6VL4gQGP0TBu25uYHY9On3fJKY4DTHtpanD2pyTyUHzIrDb%2BP%2FSSHzodH7Db8owN4oKNLfxdwo33z2A57QN%2F3N6wTN0tvMLDyo%2FfvubM7HxPaTXuhoZlC%2BMYOWRlzzMHGNzthT2bDYN9WoAiFKM9Mn76FZOhiAVBcvHUybIcC%2BWC%2BWtVxf&X-Amz-Signature=8b16b4ba9dd62acf4fb0d6bd02256457b4d509b83e3fbd49fe7c161f6c4689f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJBYMHPC%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCUIhGb%2FL6MEYm1F3qLtofehhXDc3Wo%2BSBEXEw1kbpXwAIhANpbNNEHVkmORyvaCPl9huTxAqJ02bfwJl6fpd2XMH8PKv8DCB4QABoMNjM3NDIzMTgzODA1IgxEvQusfNxUgrH%2BW%2Fsq3AOMQgfKRCKseVKSs18CdK6gBlGYoI6m%2BzxTqqFYKcGPzhCmwa%2B60IUsYaj0EcVvfpy%2BDC%2BAd%2BDHrMUMBTQFSbIbsj9AnceFX1Yn4OxU%2F97PbVwK%2F761M0DNd%2FVzkQMmtuS37TdzNyP4Cw1UmG8RH%2BrvMYDz%2Be0vpqsR4s9BqdAd6JKALYC9FSXgU0qHMSuw2KrYz6vZKQYu37bXpJRbmggefc%2BZIv6W9khV284LMAcCb49kyvnuwQdgO3ApciJ5OYiqRnPi650%2FF59LYcOc%2BxqUnFszTnRriAzkZRAhRvd%2FUVvexnaqk9WMsgF9KTmqeFU3APMcPBdsOkoqwg4yMA9NCLwnMtQePRHQFnSXQCeke3fb%2FwstCijOp2KnMMzi9cl40AnXjBrmZBzxaIDLyjHEBioEqNr8Brh0cWgx6iVEyUjrL%2FKAIiT2Gm8rqSZQ3sVhrQoumdrn1tp%2BQLX9v%2B9FwLwhZI%2BCTswtVd%2Bs9nGhSnL8Bxe7166VipqfQ0%2Bw8VTyR7Cn29GYQ%2FjPNuPokg0PNrX%2FwMX0Hnp16y9wbGvBESEfEJkG5UmmVVO2hEmL%2BGAUlWigx%2BUkGTNSkji%2B3DAa46G5ucHwZFlr9Ysgact7xBaDp7%2BCjlJOpCVxBTCmj%2BbKBjqkAcMSEMp1eRK5BqGEuRSqi5lj2wK3haRC7ecausdzV9NfcONi4JdDdy8ptlYGE4AL%2FzVWiGQpFYHunFEljkAB4qO0Fk%2FUakDNpiNDZi6nIvbxTOnP2nPVkiM4Xb%2FnD3XiRDvIBkb2zIvcgPU%2BeznbgCFnRd7Y0x3o8W70PRdaT%2BC6Ohethgoina2LFtu3qpxlaxOAz5uCcUuqHF46iSXgoBryWZLH&X-Amz-Signature=e6545fdad29b3e4050c51c335dc22fff8ff4932c29b4d59680831ae4f0b6a9ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S26I3KGI%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIENxevp1XSSIWTJP%2F%2Bbp0vmxcnSVLHayj96wJAZCRXehAiBoifh5NQUPVJkuRy8FM64sSnBGLYUd4ME70ITko1jPWyr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMigbaOPoQDsr2v5NsKtwD9zPVaqemcnKlCiggekc4xzFaieGHyhLvM8jaU2pHLB86gdRT9LPAgniTP9HXla4C6yzOgNFv%2FqJ65%2F%2FfJ5LiHbcEpfV%2FgvG6I8xWzQNDKsQGB000Mkl50ABjFnaBTa4CcHu6xdTtZqQJfNQjZoZDGfziGCY%2FbMuBg19Z4hWeBELmXxdJuGP3W9Di7WQ4bRmZ0zYd%2BGIrZYQUcpRhtuQvIQV9QE23cGN9ei%2Fd9el1d9T9RWjAAQsQ5bht2EVtEp%2Bbz1Hc6POOR4WWTLK5ndtJOE0cWET0e73rJDrJKeLkvM%2BZ7nAQmBaelp9%2F%2B4V5Px8Dw%2BxwFyMNMFvB2r1IP%2BcKtRlYnqWh0LPCuDYZz4IT2QQmemggUEsl9rm%2BpIcrGsJwCbPMOMWEeHMA5o3yL5KWejW29rM%2FlZRllLAJKaqIu1oLDIg%2FJ5sBkaKCQ0zbe6G5eSu7b4Fl14k5GLJ6GGySqNZj1ASQHiKa%2F06z99ZxOBZ7gxCypnpVB1lzckF6u2Qp8B3LevfIW74MBVyySx3TEZneQuKX%2BROfGc7Kq7sFfIa%2Be1Qfe1CaMvteiLBIRo%2FuhgDEMJfM0mXClAleAy6WgVdyXblw5LIMkFCc2Ox5B0IVac8c5Y6ZekTmxqEwjJTmygY6pgEj%2FyfRkD2APzvLwnF5oU6w3tFTlEPJlV9Cc9bHPWXdT17UxyAami9z5piLZDBBS%2B52B6qnM23UKwoipX8TKDnEajnzZmd1d5g8A57DSR6dlbBXozalqT%2FjxSXqiNGQzZvn%2B7iCH2nRfoPLIb0AdJ0cYwB6KceAwuE50EjNuNgTkO9A05CPN%2FpO%2FQzF0aYHCkH85Ldq7b45BorACbcBXLc4NzrJQ0ZU&X-Amz-Signature=fc58c1b84f7b0e4fe9b632b8d9b0979584925b45b7245a42b6a1a99b18cb8858&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RT6N2WX%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQDdmQeB5%2BkssdwkzzNz8r2Gel%2Ffz%2BJj8nkDUXuaHZ8u7wIgakNH9EOCO6%2F1f%2B9LapH8cvEu2bH9DkRtMu7zox5aLEAq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDGmiBG0ET4GhDF8n0yrcAxfskS%2FDgDus3YaQeWHZynrBnZ49GoDHHDMmSit1FOFXecVknR9xTPpj49HfnoPZpAudWXaEnUBj5tVoziDt7jfxVLGfMV%2FwNP1rWzyP0TY%2BlgMXba1j3RZYtQdE441Asy9rS1YTKyYdroxVhX4QlrfU6PriVvt2KUzwIK0M%2FmotyvqEAzY1eZGZHPV%2FVyiwVvgyv9YNTLjOQFx660aD1MetgF93YRet%2BhTANR9MXHpKLIMB4NDdawnWt7eJFEUAoYs%2B%2F0ixggQNyjYW98oM3yy00rbaOa%2FcKToRwpUSPN1eeu1R4niDM6bx%2B%2BNUgoln2O9Y7Wx8fhYV6Qu%2BmiQ8IZDufYpomPjGJTVHxmKN2fqw9crImEYzY2E62WfDx4YTKuIpETBrEvVvc%2BUXGyJmFGAU59GRE5JQ%2BbGaDURTrAvs9GUdQjym5RXTUbaWDHafSs2Amyv6CFV%2B6kt5qHKToJo1UOrXkPXjeuu8S%2BAekEFYjRM6UP28lbunFC9Q08dQj3JIs1hpKazFZoqXSVwHtMtu9nLwhjqoGofiqkcU97Qe5te6U4FpLPqjPiTmh8XOt9oq1lcKbrlnwXPhR6ZdDTG5NIkf7YQJq0PDr1xH49Jakn5UZOP2EtjIHtCyMPeD5soGOqUBqmKXHFrJG1U3rvU56SLfx%2FtOMIaRCwVjfrzwVWhqDPUcoO3OlmtL%2B%2FZLU5dNPU3KVR8OXsD3lUXJnD4eXxdSQQeu8OoDiDzpQUAyqWDxLExtmCxleEClqBN84TL5Om9NdluyGA5HA7hzAhNmC3MSfL9JjUmLPpLOCHpOGrANEKBMy7LwHj6BVeV7sUaie9%2B4FFhxHip7gvNDtIjdxvMdKfueLbB%2B&X-Amz-Signature=5870e677474e74d7236c2c271100871d4d72305640ac3aca0a15e85eb48ed265&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMJVDSZF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIGkxaQT53wKkuNQl5tUMVSnauHMoosqtuyG39Awi7oIpAiBArk%2B2DdgUkTStoWm3jEXfbyS5YyMWTxUzNAminaMfJCr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMFQ1NjDy7pEmqCH8LKtwD3HvuSaj1huOr3A3Ytr1YQ3GdKPzrKNyIAmVusm6ffAUwkVyKYgVGAJZANBBOZfFlNZnBckLasX1fr%2B8k3gWOntHVqWIZvMk3T9ZUBTHy847GVAPMGEWi53a4j83YUsKefmzqYfIf8cYh3gkCAWzIBAgvjlkrIUweSz%2FDyA1mHPuJglbq6SJkFG28kB34cq%2FNq5wd%2Bvr%2FyASzdXpfuk%2FtIN7dolYsRhZDSm3DSp1qUlWVzEGc4Q%2BeG5%2BW99TbD6DpUzeEsdaBzi8LmSz16qcxqmRj2p3%2Fi4RBOn6DDtizbWVrt0woKVPK5TN0kFIR%2BaKCO%2BYrDHZWkrOiC%2BjrLQmBzJisTj1Nhd9arsk3ODp4Eb29mVAbQ8B6KAEQmMNVItWlYWVet5PbKiJY%2BE4k0Mg0PqBO5ALqaQoDyIG8GFr8pIOUtaiRe7y%2FhcaHx0hFvLsZntbKUeuKUbXFNavYGPfmHYQ7Vr3X3IZLSjeqpeT%2BPMP7boGT8PRoTkwXsm9tcUC%2B3d5o4FVElVH8PaxjG%2FnTaVwgEKD3npyiYjX4Bfk1hZhM0pmFYyDFjZdwviKy%2BQMCom%2BL6KGCm3sYsGmpAkA4q64UziRaF%2B1RryN1%2Bxi0VzkbreebxikaphvAYbIw1f%2FlygY6pgG94sSGJW3CxyFvXepo8qL4LhL71W3WKHRVEee11Mx%2Fwu6ITJuHle%2BxvevXxrI2r8AQjCli4DAX2D5c6AE1CiQfijvKDOpF7Jf%2BaFfWu89ngn0UFQKGC0SAO0E4XOzwTgEpwF6bA454Vfs49fZ5D9Mt8KzUjpcLInzPVveuR6WubzWlObDYb9%2FXTB4pcqKBbesnKuFt4Ag2NOgYdoylRcE3JwMjtIPJ&X-Amz-Signature=06b6a20b7da98748be6cb3a1fb84a57016f6254ac26bcdd11209ca1935b04fc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMJVDSZF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIGkxaQT53wKkuNQl5tUMVSnauHMoosqtuyG39Awi7oIpAiBArk%2B2DdgUkTStoWm3jEXfbyS5YyMWTxUzNAminaMfJCr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMFQ1NjDy7pEmqCH8LKtwD3HvuSaj1huOr3A3Ytr1YQ3GdKPzrKNyIAmVusm6ffAUwkVyKYgVGAJZANBBOZfFlNZnBckLasX1fr%2B8k3gWOntHVqWIZvMk3T9ZUBTHy847GVAPMGEWi53a4j83YUsKefmzqYfIf8cYh3gkCAWzIBAgvjlkrIUweSz%2FDyA1mHPuJglbq6SJkFG28kB34cq%2FNq5wd%2Bvr%2FyASzdXpfuk%2FtIN7dolYsRhZDSm3DSp1qUlWVzEGc4Q%2BeG5%2BW99TbD6DpUzeEsdaBzi8LmSz16qcxqmRj2p3%2Fi4RBOn6DDtizbWVrt0woKVPK5TN0kFIR%2BaKCO%2BYrDHZWkrOiC%2BjrLQmBzJisTj1Nhd9arsk3ODp4Eb29mVAbQ8B6KAEQmMNVItWlYWVet5PbKiJY%2BE4k0Mg0PqBO5ALqaQoDyIG8GFr8pIOUtaiRe7y%2FhcaHx0hFvLsZntbKUeuKUbXFNavYGPfmHYQ7Vr3X3IZLSjeqpeT%2BPMP7boGT8PRoTkwXsm9tcUC%2B3d5o4FVElVH8PaxjG%2FnTaVwgEKD3npyiYjX4Bfk1hZhM0pmFYyDFjZdwviKy%2BQMCom%2BL6KGCm3sYsGmpAkA4q64UziRaF%2B1RryN1%2Bxi0VzkbreebxikaphvAYbIw1f%2FlygY6pgG94sSGJW3CxyFvXepo8qL4LhL71W3WKHRVEee11Mx%2Fwu6ITJuHle%2BxvevXxrI2r8AQjCli4DAX2D5c6AE1CiQfijvKDOpF7Jf%2BaFfWu89ngn0UFQKGC0SAO0E4XOzwTgEpwF6bA454Vfs49fZ5D9Mt8KzUjpcLInzPVveuR6WubzWlObDYb9%2FXTB4pcqKBbesnKuFt4Ag2NOgYdoylRcE3JwMjtIPJ&X-Amz-Signature=922dc02408f8adc1ab3dd11f9941d27fc48bd22638aa9834001a4294e7af4be8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YR4X3AX%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCa4cTn%2BmCau%2B%2F9fanOy0Raztq%2BY5NNqubvefOTjM5iIgIgXELW50G4K09%2B4HtpORKiubQeJwiQS5AzvI03p%2BCsx%2B8q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDNdG9mIHUIRlcvs81ircAytn4OsDMQlh6LAIds5ZFR8eL3VKjcx7kmPzDD1ltQ2R97D5RhnaKS4FT5EONi9%2FFBGTQXJQWywb3OTWOBS9iqq4HgN4Fximy8mtYbe%2FWLGjbB%2F4Flgd9L0kTT4W3PgWnmpbRsw%2BH1GYAtMQ%2B10NBNjzrVK91cqHtfDHazNdPLF2Gr51bsWlb80wSBeGwY8G4WSSzMRNndDGuaZnrlqu9scYws0zIYMRTP8YctQ0tSyXlIEEzRNRjy70RTLfLGMaz3Mn5mWTEazHQIXOeP43JRiBTxgAPuLatyK8eGN7c0cftnbRWpAB4DzxV5jWg2%2FPizxavEkUE6eiaUZQSRlGULsuGkmnP5w7Ld6HQC3ROHQBauR0vS8Rygs4AFHgstD4%2Ffl0c09kuHAX0HkL9I9qZhrIZ9SPZO%2F%2BV8KAuOfGFABCU2PimlR%2Bb8l2f%2BghURDch2i%2BlOelBFaR3s9cCkxhaZDY%2FASP2cgJwZkUUTLCpwze9m3k%2FlNPFYvRsGWtgBkjUEF3v0s1UpHJC627pLSkeQWvTEx3gVmmd9R9x%2FaSrI91rNSQpSp6fcNPyvcklH%2Bi%2BcDXUZayfHt4NwJx9t%2Fl2zwPifIX6hTA%2F8fUqLD%2BZi00pEd%2BL29z2A4Qss3BMLyO5soGOqUBuxse71l%2FMh7ZYrHfjdcLffLB73KAcSpxAKsp82WUly09RaJ%2Bj%2FEB%2BwLpYS4Zdac79NfTK7jhVxpVhDAAPUlOq4R73L%2F94r91io%2B4MZtK4dbk%2BBTmTMTqK4Pu7KpN6QfmGyCL2eCTRp%2BZw%2FeI3vTKQB6GQ8XKfNMw3Fx%2BQOTrYfvPsvo34c6isI%2BwmAGDvYf0zBZOiPjTmCnRPWYWyrusM8Ee6tc4&X-Amz-Signature=0f0b6e57ca40c38e8795c315cd499cb687574a5f996c937ceb2315ba817a4529&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCVTTPJ6%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCxDbGKyKihMmMN62CEz76nsEyx7eT%2FvlzLJug%2B1U1OLgIgdyN3t4Or1rCUXkkJGS01p0DFFm3tCt4nP1FilHt5KdUq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDBYr2kS1RxfG4%2FaN%2FircAyNQHrb6Z2Ecc2ydgpcrwj9VrjaP9R5xapU4vbe69zIEjML0y6m24bbcoRIssucMYkptLgEzoG1HZkeKMPsfnNBMBCGwyi9HQZ4jU6dS%2FNwqI%2FtPna309jf41mTbuIpWeQxBQuROMhazbdVxiGZKxQUXw1AVIsIyron0jx530JvatuTjKfoOzYqUvrdlQdIr9MdYPlrxgiEX5XAgL4GcMFc7kaiLsjG62bt2Ktu5a5vMshFZ8rbc6bbsdPkA3xhg3kdZm32BFCKmPcTaMt1p0Actvf5DN23yWX4Q9%2F4%2F23tg9WjMHc7ovVsdlxvjXC5eix8hLh4WnguPiInxSYq3sU5tbiQZkb2oTsRmQicivfe08ZFbT8D64HMXRhXlYWxRaNXFx9SL1MwSj42myTYWmxBUplqcZ7dS38vygr1Sw43%2FMIIQR5DAn6Ajx2jRLIIk75udZRYncQFyeXcsCx5sSfkVSLPvpn6DU1uW2KsGCcCTpKZfATLTdifpJhW55pCWFDWIGtCB%2Frz%2BLA%2BfFIuPs1Hrjlgj%2Bdf5ohE12tQvMsexLePClIp7olf%2FiqvE17PfqCBd6YxoI3sNFOGl5mYqgVlZXb6hcNH5W5917%2BhrnD3icbG%2BvatqBwQ4CWnlMP6Q5soGOqUBE8JIuWQGmlPt8gEBb3EZh2eWkCuS%2FolFdscMWQ9L25a8KSNDhmqXH3vtbtUL07iVpymth63SdLEY7onKLVMosVN%2FP5gbgXv%2FDowtLARptVbbyGVa00K1DSwp1hCmkSdh3UnEZ6co%2FKe0tJAMav9KQazfTxdsAI1RF5ye4HSrcs4wV%2FrgAdAiB0MRLem8yKHPRcbSSINBfkt5aqETKejfsLzrq0bW&X-Amz-Signature=0a29609f5bf4d5990d25a5b264b6ad7ad7bb540a32b46c147693e0f1293a4351&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCVTTPJ6%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCxDbGKyKihMmMN62CEz76nsEyx7eT%2FvlzLJug%2B1U1OLgIgdyN3t4Or1rCUXkkJGS01p0DFFm3tCt4nP1FilHt5KdUq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDBYr2kS1RxfG4%2FaN%2FircAyNQHrb6Z2Ecc2ydgpcrwj9VrjaP9R5xapU4vbe69zIEjML0y6m24bbcoRIssucMYkptLgEzoG1HZkeKMPsfnNBMBCGwyi9HQZ4jU6dS%2FNwqI%2FtPna309jf41mTbuIpWeQxBQuROMhazbdVxiGZKxQUXw1AVIsIyron0jx530JvatuTjKfoOzYqUvrdlQdIr9MdYPlrxgiEX5XAgL4GcMFc7kaiLsjG62bt2Ktu5a5vMshFZ8rbc6bbsdPkA3xhg3kdZm32BFCKmPcTaMt1p0Actvf5DN23yWX4Q9%2F4%2F23tg9WjMHc7ovVsdlxvjXC5eix8hLh4WnguPiInxSYq3sU5tbiQZkb2oTsRmQicivfe08ZFbT8D64HMXRhXlYWxRaNXFx9SL1MwSj42myTYWmxBUplqcZ7dS38vygr1Sw43%2FMIIQR5DAn6Ajx2jRLIIk75udZRYncQFyeXcsCx5sSfkVSLPvpn6DU1uW2KsGCcCTpKZfATLTdifpJhW55pCWFDWIGtCB%2Frz%2BLA%2BfFIuPs1Hrjlgj%2Bdf5ohE12tQvMsexLePClIp7olf%2FiqvE17PfqCBd6YxoI3sNFOGl5mYqgVlZXb6hcNH5W5917%2BhrnD3icbG%2BvatqBwQ4CWnlMP6Q5soGOqUBE8JIuWQGmlPt8gEBb3EZh2eWkCuS%2FolFdscMWQ9L25a8KSNDhmqXH3vtbtUL07iVpymth63SdLEY7onKLVMosVN%2FP5gbgXv%2FDowtLARptVbbyGVa00K1DSwp1hCmkSdh3UnEZ6co%2FKe0tJAMav9KQazfTxdsAI1RF5ye4HSrcs4wV%2FrgAdAiB0MRLem8yKHPRcbSSINBfkt5aqETKejfsLzrq0bW&X-Amz-Signature=0a29609f5bf4d5990d25a5b264b6ad7ad7bb540a32b46c147693e0f1293a4351&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6ARRHWA%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T220105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQCoKkO8PJrwU0F1wIis0gQyjoNr%2F3LPk4mQiNkUdO9MzwIhAKXsuqmzzs1y8ue5JTM0g6OjqUlWI2%2Bc%2Bn6laLYu1XhhKv8DCB4QABoMNjM3NDIzMTgzODA1IgzdiyojXxUerIB0nDsq3AOtKgYA5UDFD1gLVSjtnxjKJU5u4yUmxH9Qdu%2FP5sjaeN2a7vBOw1vVvqSi1xkBhciSwZRFd0WcJ2HNhOWCRiVSqxBsW8vhhOnd7eCZctymUdPpe3yqswLgCWaI%2BR2j%2FiKb3UccmxVm%2BrcH%2FnB4%2Btp8%2FtLy3RiULAJFxajvw9nypbU4GLwLQBl5HiG8PUswk08%2FRYUmqvYyKZOCAzJJLSB3cZa9Vm%2BfsRP4rSLRVuWN54HCdeYiuroaSkKYRM2ZPH0Urce19pv3HEqE4JX86xZ1BYwzxKlaYEtYYg8lhnWZ0E9CFhsfZVMWjUfW4mxDD8gH1Y0Ir28dUGSD947NSGktsE5Q%2FMJNLQcuqFrNRubAcsHfjgLT7LCZxl3AJTV8DCGPl%2FbADGrZPexND4hT%2BzMGMV4vsQL7LRF13DC1kCktj08Qdx7EpG%2F7goglZdW68JG763cE3gV%2BdtX8HjceK2UTgv45v%2FMBkuKJCOBTJyVaFV4JWIRDqwAD5iHoysL3HPFaKnUBPsSlbwHlUbUR2wIgqVeFWO7w3a35hywdEzbzm3IWenoCIWEkAMxOs%2B3H5Qw97HNaaMj6pmOchAgr5fKIkurUwaBpCS4WIliubFnAoEzzQ4YqyyiwKIw2JjC6jubKBjqkAYdogmL64xjkSv8lW8vrdZNv%2BEJvizFY4e9MhhmUmIzLSH0O4Nm%2B99Yyegk72cJvltaqyRCDBjbAUc2I8JgFb9wl0jGo5NrLyOePQ3JAq1xZLyOM3jbxgvZvLeUn9t%2BV8yomhQe%2BhpAUbBTn%2BKZ58Yj5sjwm%2BRrLhw%2Fg7EqNiwWmcx0934pRtHPImfkVlFbvrDQpU7RUlyTFyfDg5Ao%2F%2FGx06NO9&X-Amz-Signature=8b94fe4732e8366684196adcd7268e86e60f33785bfa339731af0001d949182d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

