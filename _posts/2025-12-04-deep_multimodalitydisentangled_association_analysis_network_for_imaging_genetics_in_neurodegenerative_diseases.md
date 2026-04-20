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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663DX33YK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQDK6L%2FHK3NcLVGZ6jMq4u6wgLarqgnaKdHajgcZSr2SVwIhAKe938qBzM3sqAvyE4PjRutEZIw6IKEVW669eu9Dbc%2BQKv8DCCAQABoMNjM3NDIzMTgzODA1IgxsXgz0DSUtNTg%2FCcQq3AOuveOEa%2F3ayk7QoRjgvCVNmKCqTGSXaPuYNVZvsZhwAfUcyAoMD8f%2BJE3qSqXebdcabefkhucIffxZfhHxdme6GTtPAgxTM7bw4l4Cph9KvUxr%2BmotjNoTz5gjKVN82nqIdUI8ask%2BxECADHkYd7RzfzZg3F3v0wGGDrmcWqjlSqMpGWQOvUmKO8ZRVGRb6J6cREho%2F%2B%2BhDb70rxXYb9yaXrg7aQPwW4oGFFzUGqsAufT2kjBNS8otE8MH4Y7R%2FdnMfjK9Upar23T5ak67%2BqA2gkmGkmOCXs9Lt2Z3pUwToYM4Yh1XrvJ15ckb2J5RhoKSUzTeYPaOz3FcRe%2BkyD%2Fn2brRh46ON%2BuhVE8RW4tTKHYjDGrqQ6sOG2NjLykvED8YH9zEZ9rwUBwNmLjk51CKb3F6j4%2FMKFJ3JNXLElz4v8bpKz0ftuidVOiRyQXaA2NNHOMBg3BefTHDbYzNQjlNFn8W0J8i%2Btp6aJF6SPE0dPKkK4aLuZIE%2BRhBHCirjdICKGifeUk4Z%2Fe6L8lIgeHu0pqL134riaRzT%2FpUeUfejFdNztV8OTOSctI2KTYR%2BbqjlJqJJZVhUl1qA79DJCIpbRsy8LgSN4GNK3fc%2FQNBmUFtL03zIvbdnxbbfjCag5nPBjqkAb7ii5XmMo25ZmJfOCqDqpusmoKletPVy0V2K9pZafEFYxrOi8%2BTO90Zrl3pZTbMmjZAAQr0nBdKEZojTbBwQ%2BqcETsnA4hfGzzoXrBzNDBCCzxnh9qnzGI4HFIHXvC2btqPAuSqEepClkPKW9joFLvSL%2FST7PYDwlxoY0rIV0fAOofk7fS6WHDnNv%2Bv9gPk5JEn9yNu5cVrAhCF6zR6L0PK4BDU&X-Amz-Signature=6632f5f32e452e17fb6e651a0f5de933e2f3f9037f3a4755add7194c491e5844&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663DX33YK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQDK6L%2FHK3NcLVGZ6jMq4u6wgLarqgnaKdHajgcZSr2SVwIhAKe938qBzM3sqAvyE4PjRutEZIw6IKEVW669eu9Dbc%2BQKv8DCCAQABoMNjM3NDIzMTgzODA1IgxsXgz0DSUtNTg%2FCcQq3AOuveOEa%2F3ayk7QoRjgvCVNmKCqTGSXaPuYNVZvsZhwAfUcyAoMD8f%2BJE3qSqXebdcabefkhucIffxZfhHxdme6GTtPAgxTM7bw4l4Cph9KvUxr%2BmotjNoTz5gjKVN82nqIdUI8ask%2BxECADHkYd7RzfzZg3F3v0wGGDrmcWqjlSqMpGWQOvUmKO8ZRVGRb6J6cREho%2F%2B%2BhDb70rxXYb9yaXrg7aQPwW4oGFFzUGqsAufT2kjBNS8otE8MH4Y7R%2FdnMfjK9Upar23T5ak67%2BqA2gkmGkmOCXs9Lt2Z3pUwToYM4Yh1XrvJ15ckb2J5RhoKSUzTeYPaOz3FcRe%2BkyD%2Fn2brRh46ON%2BuhVE8RW4tTKHYjDGrqQ6sOG2NjLykvED8YH9zEZ9rwUBwNmLjk51CKb3F6j4%2FMKFJ3JNXLElz4v8bpKz0ftuidVOiRyQXaA2NNHOMBg3BefTHDbYzNQjlNFn8W0J8i%2Btp6aJF6SPE0dPKkK4aLuZIE%2BRhBHCirjdICKGifeUk4Z%2Fe6L8lIgeHu0pqL134riaRzT%2FpUeUfejFdNztV8OTOSctI2KTYR%2BbqjlJqJJZVhUl1qA79DJCIpbRsy8LgSN4GNK3fc%2FQNBmUFtL03zIvbdnxbbfjCag5nPBjqkAb7ii5XmMo25ZmJfOCqDqpusmoKletPVy0V2K9pZafEFYxrOi8%2BTO90Zrl3pZTbMmjZAAQr0nBdKEZojTbBwQ%2BqcETsnA4hfGzzoXrBzNDBCCzxnh9qnzGI4HFIHXvC2btqPAuSqEepClkPKW9joFLvSL%2FST7PYDwlxoY0rIV0fAOofk7fS6WHDnNv%2Bv9gPk5JEn9yNu5cVrAhCF6zR6L0PK4BDU&X-Amz-Signature=6632f5f32e452e17fb6e651a0f5de933e2f3f9037f3a4755add7194c491e5844&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HPJDV4M%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIAHy2hdvROMFVlS3VqBY8%2B%2FHwvr4k6ZA2aco53T8ZmIbAiEAns%2Fy3i7vVa9sezGSd3DkXgqmgBgnUo3ozqpfpmHXR2gq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDOiYX2Jeej30%2F8wllircAyVbpbBsAfYiZ6ozZLbEf3cgN%2B0e5wT6Myiv%2F4M2Ff%2FHmeE5lZyg1fAmbN4xXZb68yr3YtDouAZ1YO5cG%2Fu6m4%2FFIh0w%2Bk0URcDyS8ugZS9jP4MhYORdHibGWRJkJybUQWEPyjv2Ke%2FkJPpFIXtl%2BygQB%2Bm8T8ZZ5FPO8mq3iBiTvckXRuRn7%2FU3NthHYm80jIUWuFcqjA6YpQuQ15ibIUOs6hvz6xlcwVSQTe%2B4cw0EyRt8lKIgu6kSXNMVg40gl3dG2l0Y0w1OhXAxn4z%2FTdiALePCOaeKvPIYRgZf5OpzD5cI6MO694Nw5HZtxJ%2B6OLrRidgGDnlmQCBeJ%2Ff119cP8GZMW2PASHZGByLeFvugKxDJFwE651XbWV6DZDENPoXYwjc088N9dAMyQWY1047OaeweR%2BbkC2tXxq1oRVRlAx2emid87Yc3vlx2y8E9WRTExpAU8KqK470MOZR%2FyM1Re0mC8ueLhJSYoEd6DD9Z56VaEGIVr1Pdk%2FGBIypEr893N%2BR28zlO22oajIpmu1R%2FrWbFk2EhHQF%2FghIMW3GjY51IbXWeDDyCb5E159pRqD%2FFUiH0yopf9JTjuh9dHqmF5jT7hgk%2FYjL8TfCyMmZjDbAFikWqmvEA8FVeMN%2BDmc8GOqUBUsOkan6rhHd4qYI9h7HcYXehjQws%2Fw%2FiUNiLDUALTWhbtkFaOgiGicZni%2FucABcR5S%2FlohWVyT8qhCFjXCIrVf43wQGidd9tsmI4Njiy1u870rJX31W9Fm9cFriq7zTtF63YHrC5az%2BQlxEaE3WIFjjnjPuYaKv3w9EPmOG9F4Z0AbR5p2Ld%2B3%2BWllNtuxhzy0r4ZfuFzwdf%2BwGx3k5nJgswv1vL&X-Amz-Signature=1944c0348341ac5992e40ad67156f82e90a50301114b7cd6f352ddf0bde02dc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJEXYGTR%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCICs4p5QrhXbmE0jRvzvLjL546IybSh11WbUbX3IE7WVeAiAdL0XDsAnE7kwT0IeDwNOKmNLOs4AFOHx54k%2BHsdGFCSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIM0g40CKmdcPqzL0StKtwDK9L69%2FrklSCde4RMeyPuMGIWAXcFfeXNPADF%2FZgHKVNCXTaP3zMiDrlnGCTvHZ9n0%2BAGWjXJ8%2FGqR6JW25N%2FRszhNyXH27WyymyapO16jmfjgkoU4PUstz33iKygl9Fm4jl0ljCdus916K91eQZ82Fbeug2ThSwREXNqHRFcJUPBTwXHwZhhKri6RH%2FcFbZCAib4DnssWjztv3hXtv5ph7wveMcwVldoUpyl56w9tRO65Qcoob9P1GiDGjSznNQ8dl%2BrzNd9KD10L6TqunrHwl15eTXBU%2FF2StRWMhfWUsD2PR0CG0F23Wug6VJV5JQ0uOKWeL3rVQnu4PsM42tx3maz3kz6xioWR4fzktaOm1%2FRcukzyIGOJuDnPKaHh%2BIB4J5zWIhyxlD9EoblX1xJt6IF1ocsntSXwAGd8whJDj6UVjkqQ65goJJTZODiiUlZ8Qwfl6odWTeXRwQU5Qr1RFSAp7pjDVKODuHHJQw0FTX48t2Rlo3zztlIlqe%2B9mg6ACB89%2FgwJAsE%2FeAUOu91LxNOGHHQootApo2CjjYSunC2GLn42H0wgSm5yqS9XTFZBZWob%2FrxQJrL2VASLTM%2FnToY9iYaK%2FYGTAgi8xhcsugGaOhQWbL6Xm5DKhYw2oOZzwY6pgHlUJQhwF%2Bf1O8D6%2BHidAjPmF%2Fn5wfFH2lOgnWhlBb55pasMn%2FBasq4v6dd7BoERiHuq9IzcKCxV%2B3mQUq4bAHeBH%2FEfGwYFAm88XCznTwk8U5XSv4LV%2FbSKdqugPQocwSL6XB6WZfbdFwSWthd%2FtqAlIRk83zRLGkTivE%2FTJ4z7ljkrmS%2FCHp%2FG8Abb0br1GO8GqXC%2B0ZrZHSozWZU14BWn1EMXARG&X-Amz-Signature=5c473824ded8e11489c6024ee72b607c5ea79bc46eb4871e379649a52811d743&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJEXYGTR%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCICs4p5QrhXbmE0jRvzvLjL546IybSh11WbUbX3IE7WVeAiAdL0XDsAnE7kwT0IeDwNOKmNLOs4AFOHx54k%2BHsdGFCSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIM0g40CKmdcPqzL0StKtwDK9L69%2FrklSCde4RMeyPuMGIWAXcFfeXNPADF%2FZgHKVNCXTaP3zMiDrlnGCTvHZ9n0%2BAGWjXJ8%2FGqR6JW25N%2FRszhNyXH27WyymyapO16jmfjgkoU4PUstz33iKygl9Fm4jl0ljCdus916K91eQZ82Fbeug2ThSwREXNqHRFcJUPBTwXHwZhhKri6RH%2FcFbZCAib4DnssWjztv3hXtv5ph7wveMcwVldoUpyl56w9tRO65Qcoob9P1GiDGjSznNQ8dl%2BrzNd9KD10L6TqunrHwl15eTXBU%2FF2StRWMhfWUsD2PR0CG0F23Wug6VJV5JQ0uOKWeL3rVQnu4PsM42tx3maz3kz6xioWR4fzktaOm1%2FRcukzyIGOJuDnPKaHh%2BIB4J5zWIhyxlD9EoblX1xJt6IF1ocsntSXwAGd8whJDj6UVjkqQ65goJJTZODiiUlZ8Qwfl6odWTeXRwQU5Qr1RFSAp7pjDVKODuHHJQw0FTX48t2Rlo3zztlIlqe%2B9mg6ACB89%2FgwJAsE%2FeAUOu91LxNOGHHQootApo2CjjYSunC2GLn42H0wgSm5yqS9XTFZBZWob%2FrxQJrL2VASLTM%2FnToY9iYaK%2FYGTAgi8xhcsugGaOhQWbL6Xm5DKhYw2oOZzwY6pgHlUJQhwF%2Bf1O8D6%2BHidAjPmF%2Fn5wfFH2lOgnWhlBb55pasMn%2FBasq4v6dd7BoERiHuq9IzcKCxV%2B3mQUq4bAHeBH%2FEfGwYFAm88XCznTwk8U5XSv4LV%2FbSKdqugPQocwSL6XB6WZfbdFwSWthd%2FtqAlIRk83zRLGkTivE%2FTJ4z7ljkrmS%2FCHp%2FG8Abb0br1GO8GqXC%2B0ZrZHSozWZU14BWn1EMXARG&X-Amz-Signature=470c8e9ed322f063f5e222f31236fa3371d47f588fdf615c0e8fa0b6860aee13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V223YBOV%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQDoWHqu7llTDewZNdmqsIyAAOR6oXFdxVNF3k529vwy9AIhAOrOjzArhNS2Fr9hZ6m9SGNdZwoSzUKqhuyrwyvV9uNCKv8DCCAQABoMNjM3NDIzMTgzODA1IgyreDVUwYyj1eNTkbcq3AOwoZ04Hs9%2BnTg7sTORGiI5c5qqY7qkOribNTzAlS65ZPXRmA199Qhq%2BIpco3qg0wR4IsmrqP4n0Lh0m6uR5q5cLR2Jd5Ulyfcy%2B918SWKsIQQ2EdqvAe2x72WOHSbOPel9ZNSXa%2FMO8hu2LK01Ej1iQUBhbwVtMbVy6w3ozxIXeBUkRsfqqz1wh7dOmm5Uwi1I0ticjXSKCH0i1ia%2BjoWF0yJwl42pQtyMq1knHKzzS2bLTOZkuQnLSmLiykscmSfJun01WrunPzqsejv%2FPTy7Kr%2FP0U2W0qSzPopR596YXqfyAqZZ9L%2BNONSbJOeotVBiHD%2BMurY%2BJ8kts1uzYlNsOEKzUIY92EcvMI4lDxsiWQjeDUTO2MW%2FVde4DVMkzzu9vGNQiBiCnl6dz%2F82YvUhkz%2FwVqpiCy6SPPeDlI2bTFdSzlLfe2275NPZxYa5NOisAZXxCPvkJ8IXa6mXjS6onu4soEUeaN9u4AamRp9wpyRJsl7HR6NEhxhfTEuii7uQ73kWwfBG5mectzZVJdbTTv5S1CCnHLSrHrL6ihwMTY49Ati7DXR3Di0Pd12LJdimeadixgD6Ol11Yo17HrSckxR6%2BxPelkchaqv6lGDNejlJ0Q5LC3j2D%2BEEBjC9g5nPBjqkAVbOrPvYFuXlklWFb%2Fyw5SZD45IkUB0bEi9xWd1TYyKwKvEZUV9RkfuDIYsk5ImCqhdCWB%2BAyP44zTNB7MUIzDbWaTnZefJSMTTlf%2FjE0JVh%2BgKB%2Bto%2Bqu467StF9kUyXXzPROBFKZo4OkYBdhlOmB%2BQNBHWqgv91%2BgfDtjA7D0bH1TkmmQPN8%2Fy3sItdtlf1JUsOrTJOq5q1mePFHNJ3Za%2Bu%2F51&X-Amz-Signature=9dc283ac483d38be2e4e0d3dacc30e70be020a4bb3b2f76243dbefa643e145a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUOTPSPW%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIFjRTuVbmZ5tDZYloSMNteqZB4Qm3t7fD5MJ7WswDZvYAiEA3xG84VM0V5Pd%2Fq9sPC39J20k3MdyjtBX44gsbs8ElDMq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDMMgLxCdSq1SSafzvSrcA%2FiEMU7FMlXwB9ruDRW%2FW6Ai19FQFJmlB%2FG53g8DuJ4OKG1sS7KGIbNdmJoEBDFBmjY4e2ABykEeFGZ%2FEZPvP3yQY9BFv6a6D2E2On1rdNPJMHYnRxG19dJCYv04OuxPSuFoQaGhG5aI6YkqOUUl2o5Ad4Jj8XhxcPmJoHtSn0le2b%2By2Os3uYLuG%2FtOC37htLqcUzBnJNwM6yN%2FJoMtzQ1JGRYquG8PxYcp%2B5eBjfxNIwipxYFsQSCeB9WfMsbAD8ebWY6dg5VvRfo6bhGFXTARLY6hqNYCwKSSeJKb7FKD7dlePmEyaWPr447A1GtTUd4rrW%2Bm%2FqjKa1ylPmlPq9UnTdyykzqRkovUVmoK4tzQUSQLwT03mIp8rJ0U8e4AoSh80A9JXKDLSvU0byNSDOmeHTRSrxB4mf2IRqtxkPOBkArcCS%2FM16gg021FzaA4JiFNnKRaiFI7Wr3CRZAYldQp2gfSBEFkWwvCcK7wrgxRI2G7B1Re6zOvJOl0UsnK6UXtcc0MaTDu0K%2FdkJ8vtsH3iyxsh3Fc1sdQiMPIam84GdOPb1U3UotS7swGKMCgVa7wgJ%2BUtmr6ijwvZm5ub%2FfLtf%2FMCov1OUo4HtQFoy3cPKxo5jivgxNsKm2cMOyDmc8GOqUBVBMv98Ee0Dluz3roXzeZvsrckO4KXRb7VxtZexleY3TLKFuuKMofCrWC%2Bo028T9BGxv48q3DNQTlzyHwVydJCM2NXkhKHflbHRLsEDuGvmL4v8RSWq%2FwZXWCviN8YMxiCxSeokSgxUCXPYg9u8YKbH1XnSf8hJie8D%2BqV0ABXEjcfMRnQLzn50auTjxeil%2Fwg4Iezj3kfRDD6ZM8pd1fmQyeFhbo&X-Amz-Signature=05e687a2335a3fdc51de5523ebcf81abe0ba36cac39f41f0979eb052d67f84f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XIYZ5EN%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIDPqXjZ3WxUTeqMROxOFl2ocgB38%2Fdt6z5C0UKOTtfZ5AiEAvhpMNLmhnzp6bPTAR5AdLdYqfjX6yPiYKZJnaTyXRWgq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDPoLtjd8j1Vrvg8zMSrcAwhyEBPRR4mpmv4YDbmAKgJSueTAfgksaIHna76biuvP61jmX%2FBiPO9cO1YHq0a%2BuUTka%2F01O%2BRTEtvPa3eEEw6%2F7AL2sA1owzj2HvRhuAGWULdecxeHEippou%2FGKEE150Vl2BBXo4nJ1CJupHRN8sZP0OkyUpwUPA%2F09SifUmYrKP3fDDGbaoKoTtVeCjn395QnF1T3dikTf%2BkhXBgsolvZi4Op3MWD6kNpDedryr7m7wHY1eswGWkz%2B2cTCJuA9fihSxf%2F57F0Y%2B61dMgq3WAvmAQh3wXcLi%2FG3TAv%2F3egLkQhlbEaiMNOU6%2F5cXO13H8dg%2FBoq63rfgzv3kj6SCxGMgSyiVgkSUHsD8QwLFS1GB4y4%2BWuADxguU4%2BDde6PxN5rP38TS8puouwjt6S5gM7XFpwIOo9wX0Grs0YUn1t4ARGmTE5zHZ7KHqtMLy71BsBhxKRnHXYytoLmBhykE4bx319NUlOMugJb0frFcoJtj9ETp4Pu%2FAJ41cC2Aydvrm%2F5qP3MkWOEgm6BLWmsyaWnS9p8o6Z4mJfPF2DPCfl0DnL%2FM%2FedYMXSi95Z20%2BY8sRoXdDovVy%2FzIYwHR0yq2vDUJSam9Ru1VS1DsOujAM%2BL4JgTya3bsdW1AHML%2BFmc8GOqUBT7n5PGLR%2FsBBRej%2B26XmjmfHuFyGaldnRlPadT0SXMyrM9yVfJSEN%2BPIOjkQcUdWmZGpP6%2BKqhFYgpgXIlR3TpjZEkW8PopVUyhLh6RgYrMN%2BSLnC%2FH%2FXGUkPbJIgGUihr2muHiYJ0qk%2FcwP7SVqz3i3EE%2BlcVT2ah8EkpoO8kFz12fz4tYw3JfSrziQm72g3QKSGnvYDoyhh6KMgYBMB2CcPCW2&X-Amz-Signature=f7fb61352d3c6a0ab806a26f09c855d04876eaba9dfcbd94a0413282996ef61a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RERYX5DP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDo%2FcXaTUp33Cs4YDcOsyRJiyRscCfNB4w%2FXWEd2xKKMwIgaMIwCEW3bgnjcQ9ZYC01kuq1XeUjTRm5RoNxw52dQHYq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDBRTq3IXYRlzqnqjvSrcAxK6%2FHXCu%2B8kW6k%2FO5BUcuNrGdUr5Wovsj5KNOrQb4W%2F0mgf7u85DanDt8sQ1gxRN3OGsyuGSO1VYPBdBf%2BxpBNC8JmrSZMN%2B5Or6Hr9U4XW%2B9Y35z0oQXxKFBdCUFFxKDMfTIFMAVyNfnMyRDmY92HTLvvoMNRbMNik%2B4df5EBpmpJmHlWzSMXl1dGb0UsocyHKdcqJyRcKZEvu9Z5fOpqtheErADXNdl%2FzM3jLd%2B7qcCXnX6%2FOW19Y7t1z2A2Ii1PgTcwZCXR003GRkZNqFpXPca2XDimFL8sdM3hE4JWkk6DhkdCVME6wlx6tcFM7x7hjvxXLE2oGrtilXhcGilZHuJw9GHiq%2B9izC1W7OQ5cy59cpKuMudzIQsuoFRbClb2rad693J2nD%2FFn84nn6JgP6CWz7mghqSRdqdtd8oiWxfWk%2F3ohIMtqDihmx65Sod45x9l%2FN7fHsCs9FuCad8Pvy1TI8eUXMAJVHzSCYYrxw4o1skkOHI0Kh0mo%2FIdxoaB2ANYBPWCn7PbKEiTfUbUu3j5Q7bHcf0nSXgtGerIc0fvbYfzb8eCrTKI1yKgxMonVQmjROrV7xV63OdI7oyVXT2MVd4dVFSDHjKcjnlMp8DEYY3WjKYpEGbSKMMOEmc8GOqUBkMVb1FGu%2BFzO6vDW29wieQ2zccdQzWg2QSPbyDbwOmsxvlEPiSbgfMg%2B4D0mZw36RYK5hLjMFhU9TS7ax7Ivz6L8PY1xfpHcegJhm%2BuFjpnN33%2FJztFDtoYhJjqbWaviHZss8t7av4iDMDaf42fZ1We6ySJJQUFH8ezFY0PUX1orLGSPNqq21eCGfQUDNJNABc9xsy4opbBMqhLLoXnjXiCeeZXr&X-Amz-Signature=c0b11f5bbe9d621e325a0cd98f75a57b24acb1d33bd06df623d7f67bb81f2cee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RERYX5DP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDo%2FcXaTUp33Cs4YDcOsyRJiyRscCfNB4w%2FXWEd2xKKMwIgaMIwCEW3bgnjcQ9ZYC01kuq1XeUjTRm5RoNxw52dQHYq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDBRTq3IXYRlzqnqjvSrcAxK6%2FHXCu%2B8kW6k%2FO5BUcuNrGdUr5Wovsj5KNOrQb4W%2F0mgf7u85DanDt8sQ1gxRN3OGsyuGSO1VYPBdBf%2BxpBNC8JmrSZMN%2B5Or6Hr9U4XW%2B9Y35z0oQXxKFBdCUFFxKDMfTIFMAVyNfnMyRDmY92HTLvvoMNRbMNik%2B4df5EBpmpJmHlWzSMXl1dGb0UsocyHKdcqJyRcKZEvu9Z5fOpqtheErADXNdl%2FzM3jLd%2B7qcCXnX6%2FOW19Y7t1z2A2Ii1PgTcwZCXR003GRkZNqFpXPca2XDimFL8sdM3hE4JWkk6DhkdCVME6wlx6tcFM7x7hjvxXLE2oGrtilXhcGilZHuJw9GHiq%2B9izC1W7OQ5cy59cpKuMudzIQsuoFRbClb2rad693J2nD%2FFn84nn6JgP6CWz7mghqSRdqdtd8oiWxfWk%2F3ohIMtqDihmx65Sod45x9l%2FN7fHsCs9FuCad8Pvy1TI8eUXMAJVHzSCYYrxw4o1skkOHI0Kh0mo%2FIdxoaB2ANYBPWCn7PbKEiTfUbUu3j5Q7bHcf0nSXgtGerIc0fvbYfzb8eCrTKI1yKgxMonVQmjROrV7xV63OdI7oyVXT2MVd4dVFSDHjKcjnlMp8DEYY3WjKYpEGbSKMMOEmc8GOqUBkMVb1FGu%2BFzO6vDW29wieQ2zccdQzWg2QSPbyDbwOmsxvlEPiSbgfMg%2B4D0mZw36RYK5hLjMFhU9TS7ax7Ivz6L8PY1xfpHcegJhm%2BuFjpnN33%2FJztFDtoYhJjqbWaviHZss8t7av4iDMDaf42fZ1We6ySJJQUFH8ezFY0PUX1orLGSPNqq21eCGfQUDNJNABc9xsy4opbBMqhLLoXnjXiCeeZXr&X-Amz-Signature=75c0b82ae2da4c4d42f9aea6007b1c3c1266c8cf32fd8ce8be1556bc3a5056e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7P3ZDL7%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIALAAzJqtFWfG%2FzB2WG%2FoWacEs0NPsBXQxUUVlujgcclAiEA%2ByMhUzP148K4Rj6Hw57g81iFcWMvIjLHIam7qeHV0Usq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDNyarxCmkUzzt5lhVCrcA8ojuJ9b5LXSZ8gotIPi3MSEZeZs6qRmCb8fA%2FrXdObIE1tBmI7VEMtJyotc8POqs%2BvoHgaguYRqxL%2FJdugOx4LPH6udrAT6V%2Fvzo8cvtVIRKoX6SoppjQ7KQ30LOe8RyTLXKio6zwcHrSWMl6h6cyuLRkmNxKkQnTuPQ0HvPDNNON96Py%2BnZIRDVHfoe4V%2BHsCGkBRYuqpstcnLci0cm5xim0bzlCi1tjzRP0Ec9xrXoh1Zat17QUCDYHGOgH3uBT9%2BTF6pIuQZ%2BcNZxTvYOnl2VT5J4N5CpPyt1cRpci3yjFcmHWD%2FyJp1ssdAM35YJz0WjZRLp9uQSjeU41Fq1c1h81Rn15aX1lSnPrK4N3n6HMBKJHupi8UpS9%2FQirKL4qIAlrvdldTnWDlX5Me0ToN3hFxIsiu1yc8tMZ9kZezB96NvqDGFklBhnEEz7ooQAwEcck%2FVxVD6lNrsPfTj8gy3noFQVjjQ2IPejahCxztrz2hjSLF%2F4ULLph%2Fm3Pv5tbHSoVSoG%2FfOZbI2yxeDUjTzVxPS0APzwkARwZTdQPQ0QQ89kaUd6zx6kz16N6R23AmpFN3Ups%2Ba7%2FIiISkx5Q6F23nOLUs8HLS21MDARUiK5yLRAYDXMlDf6anxMOGCmc8GOqUBdZyf%2BsOWh2I12I4ijarjlWrw0NoHAxIEHKz5arn36znRrlvNceODAa6JvDdVV5g4RtroYMHw60Xm1EYp1e%2BJo9wSFSl3rybcNnuW1tTJthcSzhmvKz4lERWT0oWOyF%2B1UY1ZPFqyKmCHbG6RwmwGqSBQ%2FOARl14KA2R9wWQ8UbzYPlJ9g6EByoE35N%2BpaKdts7McHNTzBvWm8QJOxXyR7Pgx5wJP&X-Amz-Signature=88763c030504bca7a229d7e0c35ada137f0c77fdb882ee58698036b3822cd329&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDMIKB23%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIC1Csr%2B5ge3ylQW%2BvkO8QRzsakBxUrN080Nb4ZOP2G1hAiEA6vHSVpPfrr%2FngzCcTDcS6IGbfdvEa%2FkJTOL42Ta2I2Iq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDEXJUHEUVVS4ePfgUircAxSlnLN9ofIcsaNO5IrUlYkb8fsbClnRZJL%2Fny2uEQG1bqoSXpKaAs5%2FG7fGpf2hAbcALtt17lTqq%2FkXSs3Zbp1%2B82VonIjViRtJXA1uqqb8RAxA9SX7jqCjgT8ZWsdLBp7OzAd92r3Ar1i5sXrGhRUDlOi7RXv%2BDole80Lwhr6xP6BqstAAiTKIfwMkWfURGmgne1vFtcALuMKkmzPI5Ohp4J47tHVooMipeI25dDQvTRKsb%2Fq1sHdPXRhWWdq41FkCMQq1wzolh%2BN6eYpBfpPWei4gUojRafaS4%2FpIQ6XS8SNS0tVpoUVUm3NeoOG2TDxgeFtUKlXAkwPYmyL47ShOOcAtijiyNrghQ8HBNpV1wPPLYJdTHkMqH1lcGG307Zoye5%2FMAtZy2nscmayyLOguFDUHzijDpriM93bFT4WprgMJhqJm5A%2FpWpXbJIr0Upfuw%2BX4XALoEj85F35aLx0vxBokmBT3dmvKrN%2F9BhdelIuOHGe1DB42CCKSsGfm4Oa87gUNRZ8KwilyKtNdLIG%2BjgcXRIwKGB4e689pgauyKa4UCiCKU94ayFEZERGGNXnGi79xgvF7jmNXRnOVDIQrY%2F9TQXdRDYiv2rdhsp37OQDxjjM2SoIukHvbMM2Emc8GOqUB8%2F0Kz2zLzII2HcI6KIfQ6Rc0qmm%2B5OyUQq7Tleg97ABeCWzoAzvi9P0IX0nnydfpbRlnOiFACbt02NpBm8UzpuCpAftUT%2BJm8nqNWlB%2FNZGSU2h9aYTVVy4EGSctYNNciE%2BfIWxeCi9BbfMsO8nwSFEP5EghMnQVPsCaOVfQz7tuOsMLLWN3lydVAP%2BDldno5jhp73xozsCUXuPh00V9UzWelw9D&X-Amz-Signature=cb8e54ec06f057b69ca7df7f4b7240b482b52878f35fccf5930081bb02a8119e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDMIKB23%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIC1Csr%2B5ge3ylQW%2BvkO8QRzsakBxUrN080Nb4ZOP2G1hAiEA6vHSVpPfrr%2FngzCcTDcS6IGbfdvEa%2FkJTOL42Ta2I2Iq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDEXJUHEUVVS4ePfgUircAxSlnLN9ofIcsaNO5IrUlYkb8fsbClnRZJL%2Fny2uEQG1bqoSXpKaAs5%2FG7fGpf2hAbcALtt17lTqq%2FkXSs3Zbp1%2B82VonIjViRtJXA1uqqb8RAxA9SX7jqCjgT8ZWsdLBp7OzAd92r3Ar1i5sXrGhRUDlOi7RXv%2BDole80Lwhr6xP6BqstAAiTKIfwMkWfURGmgne1vFtcALuMKkmzPI5Ohp4J47tHVooMipeI25dDQvTRKsb%2Fq1sHdPXRhWWdq41FkCMQq1wzolh%2BN6eYpBfpPWei4gUojRafaS4%2FpIQ6XS8SNS0tVpoUVUm3NeoOG2TDxgeFtUKlXAkwPYmyL47ShOOcAtijiyNrghQ8HBNpV1wPPLYJdTHkMqH1lcGG307Zoye5%2FMAtZy2nscmayyLOguFDUHzijDpriM93bFT4WprgMJhqJm5A%2FpWpXbJIr0Upfuw%2BX4XALoEj85F35aLx0vxBokmBT3dmvKrN%2F9BhdelIuOHGe1DB42CCKSsGfm4Oa87gUNRZ8KwilyKtNdLIG%2BjgcXRIwKGB4e689pgauyKa4UCiCKU94ayFEZERGGNXnGi79xgvF7jmNXRnOVDIQrY%2F9TQXdRDYiv2rdhsp37OQDxjjM2SoIukHvbMM2Emc8GOqUB8%2F0Kz2zLzII2HcI6KIfQ6Rc0qmm%2B5OyUQq7Tleg97ABeCWzoAzvi9P0IX0nnydfpbRlnOiFACbt02NpBm8UzpuCpAftUT%2BJm8nqNWlB%2FNZGSU2h9aYTVVy4EGSctYNNciE%2BfIWxeCi9BbfMsO8nwSFEP5EghMnQVPsCaOVfQz7tuOsMLLWN3lydVAP%2BDldno5jhp73xozsCUXuPh00V9UzWelw9D&X-Amz-Signature=cb8e54ec06f057b69ca7df7f4b7240b482b52878f35fccf5930081bb02a8119e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RINTJPHB%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T155915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCICay7p%2BJ%2F4vgHhcINm7tUaTJnj88w3yT1AGoc%2BxOTtTmAiEA4%2Foo2EmmN4QktdRxKWz1ZbkKuxDYvGsQEvptCf0frPAq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDAVMxu5%2FxVgRsl63syrcAzDWftMCvaMwZZG6%2BTV25bTdm18FaC2o1w9GGVkW%2BbA6ej%2BcaraGHESg2ww20YOzidtrzQFkzI3yEqafhui4bruCTOEz47%2BNEWsWUidISa7nMbCcCi37RQB%2B9KgOwz262ZIWzm%2FDYtEzEjDMnuYTpPYWDX4zmo2J3R%2Ff%2BFaXoLRq2BQRs8E7uhZK75wWcwsqgPpqm2eB189dP%2FI7XorDTm94KaLAfkwQBJjj%2FE7EgnjDxdKJAXrtHIGQqa9stcQQRgwXTxFmlBYIQuZKqHjcs9aD1eg%2F6yi02SVsn%2B%2BHzo98ycX2eXaBQku8fl%2Bxm96m3zaHv8X0u%2FlhM%2BY%2FOc11dqcMLErNBjsDkXA9p9azfELTPNTNxcMbh9UXbK3hlmUvjVp7CR7vb0YJdlCXB7D5n5%2BJ79wf2O92yZLBcSZR72xXKU%2FGY%2BzoiYKF7Suqfw8oyfc5dFr4e9Glw0akxqJBWDrdlxovHBj7F%2F0OijkCOIM9EB2KtZbj71UZMelUFJy5Gf8rccKdyIvUK%2FGJO1nBluuTYR81JDV5TvJp1bshSw4%2BqOJBdG1o6SJAl4MoWC20aGWLIumePhLiadDmLjv2hYHFhSvkq0AFbhQJeDPtdgP22ix4He0rJrSU9daYMMaDmc8GOqUBtmKHLEuwPsCLav6EQMfxy3byYGbziQ4JqHgF67uawFtcDCR8Rbf%2BOC2YlNP6nLwg2sLmu25ZYfstyQOiKsvGnD5h86%2BXSfc6llFfLy1QfmekjL0EpT8ru8q8uZmJcAVGQNz55v%2BO2RHFlrHxwLPOiksV%2F4wD%2BGFk3HX1Fv519%2FRCxkQjPWvcefPzhyadfNPeoAjJxEfRgvU1dBPgmO%2BzlrKNTQ8R&X-Amz-Signature=5e9c41e09e17e681d433add6edd1a502f0d6aacd56e17e57cf2aef4c8c2cf5d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

