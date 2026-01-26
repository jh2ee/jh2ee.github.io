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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R77GC37V%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDRLvtUmwcB4dc4AAebP1x76os2492tuq1H%2BO83NvRgSwIhANG8Y8sMNLdTk%2FbWpJpuk%2BQB2mzoNX02ZqjoRe6pSlSOKv8DCC8QABoMNjM3NDIzMTgzODA1Igx0alIRthz%2F3mKNOC0q3APcsrL%2FUtDnBz987dJH0RbaSdUutrGcA%2BcpGmNnkgyjQnj%2Ba0pOFR9d%2Bl53CAkx8XybM08MQEjiCLr3AIhvWK9fd%2FeSq7IPyk%2B%2FmhaZA6Nz6muAk%2FPNhINfGBAEh2hg7e3saw5iIHUxE5w8W78vpjpdABStETdFi1c5W8PRngHTdwuucw3t8quzijAbZipv89rkmPoOZPQRhjXmlnHFtLhuvD21YBK%2BP63w8Bj8UlPqhJtGMmf9sb6ysX3kQCOniBlvv5%2BbS7v2kkvtIemKyCrP%2BUPYBAP6fE%2FG8kaPDy7xBT7l0rV4UmjP2yeAv18iYEAYjfjDH1RQk8KKgb6KmJy%2B33xp%2F4bri4JIDcr0TT0tdO7OJlFGUY0ve%2BctIYfP3Mo81C0dQzNEIAZfLMD1BUnbY2X8ZwG3iMkhc%2FLjRU7P%2B42Vyce8PbcxzXBAWXMkCNpyKuccDiwqckGwUctYP7sIZOwZnZvoMsvGQI4m3cVbIAVHvOHQ5DYP3aLZCQKKn2UrHezWIJAee%2Blm70BHgcQIbACwFaLWHYcgFgnWFKsoPXwcGAm0FqTy99FxP4PaY0knKqzctcLYoOp0KkfwAMDNLJxkWvmgINPUGkooT1Sex17oWvChXrEaiCqOQzCyoNrLBjqkAXNjo6oIDKKJTLliCckbTweKj4G%2BL5Hi0TNNVTHr61zytCcPVqAy9VKPeFmZsWBfZx1eQBwLfXSJ01eVmC6PC3lueeD27sHUmC1VoGSpKpDmp6XhfgaJghOSXLKU%2FAyhbXjnAHtmOZz0ruG8cLmtawmCKrFuid5HgHstxczmvr6%2Bdt6IFPj4XvaAogNqBJFsDYHQ0jfFupAL2PS2RKBxr4dAgQXN&X-Amz-Signature=e8a271e6f7379709b70fca74ff5658bfeea45cc593614ce8adde937c85a623ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R77GC37V%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDRLvtUmwcB4dc4AAebP1x76os2492tuq1H%2BO83NvRgSwIhANG8Y8sMNLdTk%2FbWpJpuk%2BQB2mzoNX02ZqjoRe6pSlSOKv8DCC8QABoMNjM3NDIzMTgzODA1Igx0alIRthz%2F3mKNOC0q3APcsrL%2FUtDnBz987dJH0RbaSdUutrGcA%2BcpGmNnkgyjQnj%2Ba0pOFR9d%2Bl53CAkx8XybM08MQEjiCLr3AIhvWK9fd%2FeSq7IPyk%2B%2FmhaZA6Nz6muAk%2FPNhINfGBAEh2hg7e3saw5iIHUxE5w8W78vpjpdABStETdFi1c5W8PRngHTdwuucw3t8quzijAbZipv89rkmPoOZPQRhjXmlnHFtLhuvD21YBK%2BP63w8Bj8UlPqhJtGMmf9sb6ysX3kQCOniBlvv5%2BbS7v2kkvtIemKyCrP%2BUPYBAP6fE%2FG8kaPDy7xBT7l0rV4UmjP2yeAv18iYEAYjfjDH1RQk8KKgb6KmJy%2B33xp%2F4bri4JIDcr0TT0tdO7OJlFGUY0ve%2BctIYfP3Mo81C0dQzNEIAZfLMD1BUnbY2X8ZwG3iMkhc%2FLjRU7P%2B42Vyce8PbcxzXBAWXMkCNpyKuccDiwqckGwUctYP7sIZOwZnZvoMsvGQI4m3cVbIAVHvOHQ5DYP3aLZCQKKn2UrHezWIJAee%2Blm70BHgcQIbACwFaLWHYcgFgnWFKsoPXwcGAm0FqTy99FxP4PaY0knKqzctcLYoOp0KkfwAMDNLJxkWvmgINPUGkooT1Sex17oWvChXrEaiCqOQzCyoNrLBjqkAXNjo6oIDKKJTLliCckbTweKj4G%2BL5Hi0TNNVTHr61zytCcPVqAy9VKPeFmZsWBfZx1eQBwLfXSJ01eVmC6PC3lueeD27sHUmC1VoGSpKpDmp6XhfgaJghOSXLKU%2FAyhbXjnAHtmOZz0ruG8cLmtawmCKrFuid5HgHstxczmvr6%2Bdt6IFPj4XvaAogNqBJFsDYHQ0jfFupAL2PS2RKBxr4dAgQXN&X-Amz-Signature=e8a271e6f7379709b70fca74ff5658bfeea45cc593614ce8adde937c85a623ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTWRM2FR%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCHxZ6hFJmRySMP3b1tVJWfCzEkZYr%2FyFTc5CltxU4DyoCIQCBMZroyoAw4998LwD%2FtGhOGbNqg9r8DufuQY2rJ7ytSSr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMA9aS0AFyUbk%2F2wFtKtwDm9Wh3WDNufRfy9Euy0NksoO03rHyIG6bGAt98ONwc9wP5ATiXbWrAIzvXYgSlEW4TYAkIZyR7xmjRdBkNmhVkDjFWG3YCCiqCca%2Bbs9vpy2gZthKBIgrrvnr%2Fk9jIDw8zfG6B39Ypz30x0ERRrLXMv%2FiEp49N%2FRyUfz3MLQoiVoqGESTfBnotFdG82%2FIWCGLnqFQEzscYVDPQL9djd%2FG33eFEIwYtA1wEBfSKl6iTji6k0vcx09vowqZFYjV2rd4OaVPCMOYO8GHdQ%2BFxuSC8Ea%2BKkzvqUMpA8pc2m1G7Ir6HFGg6YzZ6wVmmLWmhPTCeFTVEg%2BIMyh6iIyADJ5%2Fxt83Rp9dI%2BlxSkvCViIEEr3AO%2Fh1JB%2B0%2BielYn%2BCmKZgQDpGyxlKTZrNaEgnU%2Be7za6xzQOk031vMGycEt2Ywe1AcBM8lL5rtTeTQImRwmQRdqxMuSHvIncCXpoztPJucd%2FOQLRxSmW1xIGsMpkLr7WkXTTZpj7mbUp4vV4TZ6vgwmrL7AJ3y8E6DJyMLD3FsXQsAtZNbnoTItBmXC1AIPSfbOO1%2BEvgz%2BaFrcFiXzXaNmFj63yw%2F0axXzF483uYzYR0JeBV3Ougi%2FmYt0CbRaiViSX12WTn116HH%2Fow%2FJ%2FaywY6pgE6CU%2Fr4JO%2BYqmTo4OHmYr2SnieCCk%2BS0wXQWT5ZEVqY6VOvUNk%2FcV1fVY9Mxsmn%2BJjo5TiIKb64B6CYP86MUY2oHWRmwa%2FaeSn9Ghq%2FFWpw3OFuPEhb8USz6HSu5DKe%2B4EFS6I1f%2FiqcKcUzZPZu6wMo3DRYY4GOJs7ZOTfXHo4bocBpeQx1zjpKSS%2F7H8P%2BwxBN5OSe4Z0DYkwP09t%2Bp3ht5SBTey&X-Amz-Signature=fc662eb996f8e3547ed248563bafb197356b091dd849da79b55afdf6ff719808&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XGF25IX%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDFZE1KjBfRnhpITn0lJ3a0KJQWfu5o4kp2hTzqxOlYfwIgbI8dNnKyY365fcgTvmakyoZoMskV4bMsmJnZ84fK9%2F0q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDPmqX4Vs5tT8baRgBCrcA12ODZ9JZ91gprUk7faA%2Fmp6YVTEdKCoIHmgtzYUhXNelmUReFGI5daYLwTzi1Nb1ZWsWA3%2Fzwr2lUh4lS0LPPmA%2F1CB27IQU7ws%2BhXcszyhzh9kILqy3hngOZhWiObT8h7UhH5OFmKBKFGGx1qoqvhM%2F%2FCWRnzp4RWo6SHjGmxsrxBNqDo16wEjvaU%2BRGyYJc6q82YyKeyCdDRiGMj%2FVCKprYNpYF1Y%2FsTUI%2Fu58zlCR0deIyopUzjXczynoE27SvYS1oeBFRgTlt1CEZFBY3Ebasbw8AEqgZHZLLwIz6i%2B92IejkSsN%2FoIX3DwG4OrSTBXeXYESibx57O4B1m5HbvvuWxOm5q4fFiMyo%2FD7Sm2pMgs5vJibif0RAs7vBaKi1W8Qca1Czqg8X7Zp6PYAX1reiuSXs3wjnr2cnwlgpZOE7uOX%2FYg%2BNP%2FBsUZdboXuLwwPo0z3DXcETlrr0%2FRooZr0olB5AvVZH68s2u2wkeQ8DhwwITBUt2yG76qcx7IDw5ozGQIZz5o%2FSDErc7U0F2L53B1T9qQRcaacO0zlk8rWP7EKKDltP6O4LBAddE4zr7TkF4QhyhWS%2F4SIrC1krO0MoVPTHQ6VrkYNWtDG%2FYCM6cIsOMhyfQCxfyOMMmg2ssGOqUBmTauYbYsvYyYDBhbHl0m6uB5e741FEMLfoBWXn6iPBNrJkGfRccRvPi5uW5jwpsBH2O9WQnPdo62jGFyBVEFCLig2xBbeCUvTjashDVvm9a4O%2FlQrj%2FDkM675q0XHT2d38sHJoGxCzIf724mHlQ7iTlBm7i5YC0bi%2FEYjX41BwGO%2F%2Bp%2BCDTONiaa3NJ6kS0OT5VDO78bMgwgVRqJtyHdVldL28Tm&X-Amz-Signature=1764d5c5c03b309c2784334de22966d82d9f553839a6e6d00289908029a1f39b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XGF25IX%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDFZE1KjBfRnhpITn0lJ3a0KJQWfu5o4kp2hTzqxOlYfwIgbI8dNnKyY365fcgTvmakyoZoMskV4bMsmJnZ84fK9%2F0q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDPmqX4Vs5tT8baRgBCrcA12ODZ9JZ91gprUk7faA%2Fmp6YVTEdKCoIHmgtzYUhXNelmUReFGI5daYLwTzi1Nb1ZWsWA3%2Fzwr2lUh4lS0LPPmA%2F1CB27IQU7ws%2BhXcszyhzh9kILqy3hngOZhWiObT8h7UhH5OFmKBKFGGx1qoqvhM%2F%2FCWRnzp4RWo6SHjGmxsrxBNqDo16wEjvaU%2BRGyYJc6q82YyKeyCdDRiGMj%2FVCKprYNpYF1Y%2FsTUI%2Fu58zlCR0deIyopUzjXczynoE27SvYS1oeBFRgTlt1CEZFBY3Ebasbw8AEqgZHZLLwIz6i%2B92IejkSsN%2FoIX3DwG4OrSTBXeXYESibx57O4B1m5HbvvuWxOm5q4fFiMyo%2FD7Sm2pMgs5vJibif0RAs7vBaKi1W8Qca1Czqg8X7Zp6PYAX1reiuSXs3wjnr2cnwlgpZOE7uOX%2FYg%2BNP%2FBsUZdboXuLwwPo0z3DXcETlrr0%2FRooZr0olB5AvVZH68s2u2wkeQ8DhwwITBUt2yG76qcx7IDw5ozGQIZz5o%2FSDErc7U0F2L53B1T9qQRcaacO0zlk8rWP7EKKDltP6O4LBAddE4zr7TkF4QhyhWS%2F4SIrC1krO0MoVPTHQ6VrkYNWtDG%2FYCM6cIsOMhyfQCxfyOMMmg2ssGOqUBmTauYbYsvYyYDBhbHl0m6uB5e741FEMLfoBWXn6iPBNrJkGfRccRvPi5uW5jwpsBH2O9WQnPdo62jGFyBVEFCLig2xBbeCUvTjashDVvm9a4O%2FlQrj%2FDkM675q0XHT2d38sHJoGxCzIf724mHlQ7iTlBm7i5YC0bi%2FEYjX41BwGO%2F%2Bp%2BCDTONiaa3NJ6kS0OT5VDO78bMgwgVRqJtyHdVldL28Tm&X-Amz-Signature=f34b121af29678d85640b9d16418d8ecca47a0389c6eff6110f1c44bb0aa1cfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCOCVXIF%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIF7C0XbC6QDq5JaVRApdsdcMyXQvzmehqJEXoKNzmBH3AiEAzyi%2BqcRRwPmYyPz4u70L7gcSyvnFvhXVNP3SnO04UJYq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDPO0fRJ99tIusluQIircA2F8Jbx3uJ9OAeQhr0dn7VvujwFrwlyVe%2Fuq%2Bl2Bt78LHtz6FwWkBKLkVuM8PttadzBCKIodqAM%2F3Tgy4jN6FZYTskk2IsVcpncve0D4%2F%2Bq0oihRDFgqtWLZHkkvoHHALQgaQ6OIYL7kcyIO93HEaWMbKfZcItiIT6WvANpaqWSGNZK4BU7z3Zhr9Hq24s%2BTIeF2t2vqRa3y3ImMuNCEpCVKauhvMfweC1yrRPAhvP9ik2UxZt2GXwNc7yKK4B6xXE%2F7K89V31eg%2FwMwVuTMYHWgVMbWnnhn95bxGyurtmXX7bbHD9rgroOurIFXDMvM39BsG7dmA3KKniQf9IkuFv8MQ9q%2BVbuV0M1zF4PJSwYnCuEhc1tlCSMPxBKaiTOlTr%2Fw67ch%2BcgLxHU1CZ3GegZZzj7pf7w5ZmzVPElls%2FlVEqN6jtDkFAJH%2FGj9Dl%2FMb%2BS9HV8658NV0lhd8Yh07BFcTgR6kW7LDPsSbB%2BZooq4IlVfFRKtkHG8xzAbUJhD%2B2b1v14rU6%2BqE8XjcFYKA9dmY2wohfC%2BuUjur1v0UzhjQ%2FUg%2B%2Brb68l1jfcUc0bsy0xVeAhlsPMuWvtqlnVWgveis73N7%2Fn5r2FG89Du7c3Bd8Upcpq12cJIMyxCMJef2ssGOqUBnL3HO7YtB4PrC1cIu2uPg3Fl2HHVBq02cYG9N2cSTBgAjHTlp4eedy7l2P4WNz2JPjbu0E5GLLLdvQUclgD6vAyzdkU3bqAz%2BpP4rnV9OghAHoyigouTr8%2FQR798czCS9k%2Bw1GUkChdmYyfNFsuAd4dW8UIlUlxKUr%2BaZhkdQrV0FSjqmA%2B5zkRDsJLgBvuePL4yVJXAPYZLrFtkTwWpynWzxKhO&X-Amz-Signature=abb941fda82c3eedf2f75e0339f22472fef7c3c3296ae9a5a93e3c130ae0f5d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6URUSKF%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCrcgfG6kDlFnpLtNe9e5wPDF1Mu4BCT5%2BP%2F7I54GMYxAIhAIBd9WzMnYuoqas9vHvd6yx0526DvvN8E3Fnn9lwNsSuKv8DCC8QABoMNjM3NDIzMTgzODA1IgzsRTURMjUFc6lHYnIq3ANEaT2jjpEE9Sc1tFfOqddp2nakcub1DBGknotzWShhR36aPGvfMjaf42N86LDPNuwedNaaoKjk94DFozeHtHkPnmgzwg6K%2B3WgBKSfxkim%2BhF4YJzNJnfQwfWTCuUkhP1DTbrrBpHH9UwrS1ITkLkxLUl%2FUsTJEpi4Veczoym5i8mbpBJaJKzbHSEXxP2j7e0AWmMbNewA%2BMGfEC62lEHtYdCdlTiBTXtqV0mgDYh7I3J1SK49ewFMMUYZBpMOW%2Bk%2BAHOuLdAaaj9uT6svlaOiNyhSnzaRScf1LyG8cul5MpbJUdNGhs9oVLeAorz0S5DIlRNAbKMMM9BdAOabiKXxJIDxsdUE4lLbFwjxWMTrpVhucXfqLXIoUaMTujuRAvUXpYeD4k0CGVXjn9EF8V%2F6jnXxWVDmZdPPX%2BMTW0lYqDZm40cy95%2B6aPTF3sm2%2BhZIUgJjjrwRqfB3%2FKVFh4AQsOdnqz8xZ8yLMm7fcBE4mTLsQVa9K2u2IYUYMCwvXg%2Fhu%2FdQ4d%2FdZBWmLJs7uudobYSHEs5%2B6gX%2BbB8Ms%2B6rtLIg2diAlGx7RdKpAfRNP3uERNJO4oDZ92Xm5CISY0VYA%2BCGYkEpEcQfEhm%2FYmr9OikaeVY174NTwVMo4TDCoNrLBjqkARHGgZYVZy8AGM05FKl5qHsw1v7yD%2Bubhtepld3lqhCd2rpwm0k2kRU34NqXvK5SqB8%2BenyF3RpDkr2Itb34Sjho37DeqkUiLZ%2B%2Bvlof54jV5vFRkmJkRpa%2FhSh4SestkOoQNdXfJ1hkH76Z1EW5JoTQufMiGfm%2B6mM7OXnsWowkmfZWgEKGYxWo2JBbUDDxF8GxJTyBjbgDxxaJFFuNt8S9Rxgp&X-Amz-Signature=418129da9b6c128b7a1a05b2ba0e689b22eff10438b513582831419b27c0bef9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4GQKZLE%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCICMgMUxS8kxos8po6%2BQPfj4HXgPtgLjcHCI92snibz%2BfAiEAt5XANMaHbHexLiJfe9AjYEBl1E6eQIN%2Bw4B51b2nAugq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDOArGLEq%2FWM1NN92wCrcA1cwKU3qdfkUPva%2BC7ygTIri%2BZEllI3dotgK7sNH7Ub54GY3Aztn%2BReiw%2BzVpnrmE8nXm1NodTiruueDayvCl58WWYT4BkurvayLJpQ%2BsJb%2BsYfj774uYLSPf3Bt1tFLukdr%2BVvRGgy2O%2BMU8MFjffUQw28%2FBNAP0uisPIOm8CFanr5xeQEEE2lR8VCz%2F%2B00kspDNZkM2QWOsGz84sVWvN91pGq1FVSR%2BCU38mgSVXXbC0q2TEfSxC1GTaircEMRVqK34i1z2WbE5gvUv99mxxZLUp3Vclog4abFPl%2BDEXxu%2FsxBrEYvn3KTmfQG16PS9yLF%2BY6XR456srjJWPh2i9Eg1eEkdeECUs%2B0wpaint6%2FJrvFWpSEofl0zhudNqDqAFEXBFxrajpdP62XD3uOwW%2BZl21lkkKnlr5ZvdgS3MEtCCPR5dgqcZJqaCEBqsPZSopU6pKvdQ1M4wxZ4e7iU%2F%2BPmVQKLDpnbWzB96KbcstHnEkUurVm3IuH7cqQhR4d9g1Z92VrgoR%2BzE4fq%2F6%2Fbb6OEBa1ri4jFaFFSWEX7s4yZMc3IMfegh2vTNFWG4tN83Y801asrfFg66B%2By%2FymVYyXG1lJ9HP4J5744lbAbSe2q0EzIMjPj4BIH6OrMMOf2ssGOqUBnUIw%2B3z4wGCsLjApmUlI0KmEsVFCaXLkhO7PRJBQS9zMwr8UKS1xAPa2BBOW86kslBPmyauceKEdLA4smBznp0sUw39%2F8pgTyT7AjHsErlNSMHCydp6xEcewkqKFLq%2B917D%2BoveU9FG7QQqofxYFKjlIcJ1pp2l0aASq%2B5NWp1jbawtsdafk0YdAONw29Zm1vmO%2FPF4c3l1DW3Ohf15mjzSbAOLY&X-Amz-Signature=bfba2687665561084921f733434bba8ef48f47f948e85981e919aa4d7d3fb471&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7YA7GKL%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCzoDArtO6aiT3aeRgcFtdYNu6FP3q6K37pdGnqQd4LRwIgFRN%2FpRG6V2Wg44dwSVG29sn5sNqp2HzJiVFSHh80IJ4q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDHgbnGbo2%2FDlWl8USSrcAyRJrAikYlhs%2F0x%2F14DF2NreDpiquGD0Bi1cjF2DLeN%2Bx4ngpPu%2Bovo7x8nBcLNMEoZLgnWNyF1U4CCVPGmi7%2F7hX73xzPNIT%2FFBX4IQhcNJqjlCVXgiMyK4gzy8LFWO8lEVtonCkLCxSjFsib5MkarlDxbd8PA94TrDby%2Fc%2FyD1DzI4bFtOXVvFSoyi5rhok2rMHqnwF1IGzU%2BGwRR5DrJYVk1xGSAwnHr2%2FPiOwkzUGHt9lYWae75%2BYhip0EbiaSNt9KXKEedCLjtd7xFcfdwwesTXPQs0DwFPBf0F9%2BH6XYIF81fbskQCvAuqeLPv6xB7fmoKh%2B5hUUz6NYHlxnqQspc3Zjqg4mMtObbItl1JEjejui4ta8MR1jftga9GPr%2BXe0QgKUaY8PEPm61c6WfSiLALAmR7ZL2s4gFgWATZCeQeCAxaTB31ADZJVt4JJWBGJi%2Fgj4FYgy3GuVhuFduYGuamlU2gt3ao8%2FZcDfq7tLLZwA1IpZUT7DrD%2FJpSgB7E%2FJuqhtG4GeaiWdllLoULZy%2BSIuF9kaCKyQVhQI2uTkKpWCvml%2BuWAE8RJpdkiesQnxt8b%2B%2BlBvxTqs78Xnsjj9UUdkVxNGBwejEnYnKzJPPZBls7yfkUWlmUMJyg2ssGOqUB6fa%2F%2BFyYm4%2Be48ar34wDK7qTcopanRvP4Iv%2B0oL81SM80SIJF%2B8mKr%2B7H6NaRKnH2nSsmpQuKulc1ovmPf0%2FAMon4DbUcKwJusXU5LT26U%2BZEPlWsBeCuT4PDkmTy%2F7q%2BfoZP2rGpSLt40AQQ3kSGLBxv1CwQTQfdPignTEMt%2BPKstrAinLkmF3TGAkKdGo3b9qtfWbURaUdMqrKcH3QI1m7zZ5L&X-Amz-Signature=cd5098dfc703f5fc9d09034d881fda45025ffc39068314bf5824f4d15a99c02e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7YA7GKL%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCzoDArtO6aiT3aeRgcFtdYNu6FP3q6K37pdGnqQd4LRwIgFRN%2FpRG6V2Wg44dwSVG29sn5sNqp2HzJiVFSHh80IJ4q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDHgbnGbo2%2FDlWl8USSrcAyRJrAikYlhs%2F0x%2F14DF2NreDpiquGD0Bi1cjF2DLeN%2Bx4ngpPu%2Bovo7x8nBcLNMEoZLgnWNyF1U4CCVPGmi7%2F7hX73xzPNIT%2FFBX4IQhcNJqjlCVXgiMyK4gzy8LFWO8lEVtonCkLCxSjFsib5MkarlDxbd8PA94TrDby%2Fc%2FyD1DzI4bFtOXVvFSoyi5rhok2rMHqnwF1IGzU%2BGwRR5DrJYVk1xGSAwnHr2%2FPiOwkzUGHt9lYWae75%2BYhip0EbiaSNt9KXKEedCLjtd7xFcfdwwesTXPQs0DwFPBf0F9%2BH6XYIF81fbskQCvAuqeLPv6xB7fmoKh%2B5hUUz6NYHlxnqQspc3Zjqg4mMtObbItl1JEjejui4ta8MR1jftga9GPr%2BXe0QgKUaY8PEPm61c6WfSiLALAmR7ZL2s4gFgWATZCeQeCAxaTB31ADZJVt4JJWBGJi%2Fgj4FYgy3GuVhuFduYGuamlU2gt3ao8%2FZcDfq7tLLZwA1IpZUT7DrD%2FJpSgB7E%2FJuqhtG4GeaiWdllLoULZy%2BSIuF9kaCKyQVhQI2uTkKpWCvml%2BuWAE8RJpdkiesQnxt8b%2B%2BlBvxTqs78Xnsjj9UUdkVxNGBwejEnYnKzJPPZBls7yfkUWlmUMJyg2ssGOqUB6fa%2F%2BFyYm4%2Be48ar34wDK7qTcopanRvP4Iv%2B0oL81SM80SIJF%2B8mKr%2B7H6NaRKnH2nSsmpQuKulc1ovmPf0%2FAMon4DbUcKwJusXU5LT26U%2BZEPlWsBeCuT4PDkmTy%2F7q%2BfoZP2rGpSLt40AQQ3kSGLBxv1CwQTQfdPignTEMt%2BPKstrAinLkmF3TGAkKdGo3b9qtfWbURaUdMqrKcH3QI1m7zZ5L&X-Amz-Signature=19a8f51c80f97a49e3228ebaeca8cea62cf51298b93d683db0e4f4e2deabc483&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYQEDCC7%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIF8SJ3agQ500iB7RQ%2FlVWHJx%2B%2BpECtQP87TFbvr2hnW2AiEAhgzSrHFRUR11YE7f0OcFzpBPCP2TLjpd%2FjJkHW1SmwUq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDCfef1ZXUwb%2B0nP7NircA8azP9cPZo1S%2FwhMLIoncLK0x%2Ba5iXo7jTAOjBwCD4eUXe3M1KPNZb30h0rquJCPLOJs5OydWTyiSlmftL%2Bbxmy9IiVVNFkw9gho7TToY5u9RC36zT5B4qJQc4Ep8IvhLbCri2CYdbkGy1BoTJdqsDlR8xIGH6o8M%2F3psJBN%2BidvG4vkLCp3l30oihZBrOjn0TBs3H9bNhWSv0zQm8DyON4Rc4NFap99oab8Z6XeAzlC%2B5tshoOLaFp81vt%2Bus%2Bnev46HeAImc%2Bkbi2DL8VIqKikKRaFd%2B7EVVrl0%2FBmoBp1nNN0m%2BCzsXLRaKgFMJON9F0MyPgbLIdgh6QM9go6P%2F99ftnVatQZdLapYTPGppqrn20EZEH9bu7W6KA00CUYfs8r4ROZm9HHfqIvTqQy0x1x7bzgIclDPUEAuZRU%2B6NNoUo1tQILSeDbq82Rs7qBxmiXk8HVtSLqErFLbLQnaMsKr1BxPpR8hAPiW2Oy2gmhP6dMXp9vSXLaU5Grv1oLirfb291SsIlmps5exsS%2F5vFjSjJ3M6GRl94VGyi74rP5NZCpdrco343sPU%2BdGmSGl4HwrqHkClhPH7Z1wpuPgHBw4eP589h%2F0m9FnbzQkkyFJuluggc9YfqLTQnDMMKg2ssGOqUB7P2MpE3M6p5iuwveb3ff%2F7yiCjxf2F1jEuAoAW9mbM72rZiNsrRcvuicG1PsEzmZGmYBVIP7lLiyIq2OI8hcJKaZCO8JqDwWbmHh5VGmhH5SXEQNVu2GbX9cM4oGRPbMTJAO53Lz3f5KxnSV7yQyHy2zYnSd7TtntZ4YPeS%2BYiITv42xwmi%2FWUuQ%2BIGN0IcVmV3hjkULELdu7DMdGGF8W44juUB7&X-Amz-Signature=36e0a8a54d1fcdb2baab4d7bf260bf68688a55aa10734486f20c1bd0b52fd5a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAH5E762%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCGYEP95paEKLv5vQEJ%2BctLNM2kdJcdDea0%2B5wgqhdfIwIgaPgjN2FU2kDGND0sM%2FjZTDCuqUev1OOCdguMzz8oEusq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDL1AEsE0sVPXQ4xK%2FSrcA4iYzbMPDS%2F1751Eg3wx3HMhxBdPHM%2Bsy%2FIkgePrsPPxhnyowJU1OOIyTdEnpQ7dnOInfNP1%2Bl16DPMfb4TuZ6haYjxI1RkUmds4U7vj2m42iwOHdFZ%2BQ4nestZ0C94k5kiSn5fGrpdaRMTcSOQSPtZrtRPuvnxCNYYUNdxfcjrC4w%2BQ%2FJFr8XCBmDDyK%2F47BfY6mwX4NX%2BTu7yDQccyXoDD0FW84ewDWxEsYPXzCANidxGpLlv9jUNsDR4xWENSpvnWxj2FnG6QnX0ytC%2BMjfbEyPtAF5zDkDAgaT8o3lP6tDyKb0m%2FkKu%2FoYvTCa4LUL69ByiM6JY%2FcUuQGMYPlbh06hj%2B1dmL2fQwDLK0CxzrdBBo2AmXCre6RdTcjhcMs%2BjL37u8ibjma%2BVwbXwDZS18nxxoczYsGc5DqhkaxwnhzzLlIsApqxwXYTaiSA0Ui9%2Bnoky2cygCvHIkcoCHjfj3MYTmIyCfxkMktWYglS1ifuquJ%2Fp2EoLABpdBs0IucrZzlFcEku3nF1%2FAM2gYaXTyg8ejqmcOHuvO7pwyvqGvd0kferfu6rZRIGpQ9v2ofMFDNz26Xwi8OAZbkN6Hc0T1TcYlJh%2F9OMJltXhCeN%2BAFkZAKYreGoBJ4z6vMOaf2ssGOqUBDztnqwEtU83bRt8nDzWItKBWrBnZyc3Uo4pwDn%2Bv1qpIQThBhdjy%2FkZsKdrHWZ%2B2Hu2KykbO2bic1SegVf5Vba4l%2FVZOxUz%2BKQgrX3%2F6FpbBfz6CIlZzXu4McH%2F8IOVAhLeC1mmly%2FGemTdKY4YQFlSL6AxyvikW3CZ9ZKMvzlgSChUF%2FcyVYTgJGgb%2FkwK%2BgdWzEUBx5QPigPBfn6ziq1EeU7Tv&X-Amz-Signature=0fa44b5f7230e250742f3e263a446fac6c6e35cc9d613a1916c6eb8c3a1d58c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAH5E762%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCGYEP95paEKLv5vQEJ%2BctLNM2kdJcdDea0%2B5wgqhdfIwIgaPgjN2FU2kDGND0sM%2FjZTDCuqUev1OOCdguMzz8oEusq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDL1AEsE0sVPXQ4xK%2FSrcA4iYzbMPDS%2F1751Eg3wx3HMhxBdPHM%2Bsy%2FIkgePrsPPxhnyowJU1OOIyTdEnpQ7dnOInfNP1%2Bl16DPMfb4TuZ6haYjxI1RkUmds4U7vj2m42iwOHdFZ%2BQ4nestZ0C94k5kiSn5fGrpdaRMTcSOQSPtZrtRPuvnxCNYYUNdxfcjrC4w%2BQ%2FJFr8XCBmDDyK%2F47BfY6mwX4NX%2BTu7yDQccyXoDD0FW84ewDWxEsYPXzCANidxGpLlv9jUNsDR4xWENSpvnWxj2FnG6QnX0ytC%2BMjfbEyPtAF5zDkDAgaT8o3lP6tDyKb0m%2FkKu%2FoYvTCa4LUL69ByiM6JY%2FcUuQGMYPlbh06hj%2B1dmL2fQwDLK0CxzrdBBo2AmXCre6RdTcjhcMs%2BjL37u8ibjma%2BVwbXwDZS18nxxoczYsGc5DqhkaxwnhzzLlIsApqxwXYTaiSA0Ui9%2Bnoky2cygCvHIkcoCHjfj3MYTmIyCfxkMktWYglS1ifuquJ%2Fp2EoLABpdBs0IucrZzlFcEku3nF1%2FAM2gYaXTyg8ejqmcOHuvO7pwyvqGvd0kferfu6rZRIGpQ9v2ofMFDNz26Xwi8OAZbkN6Hc0T1TcYlJh%2F9OMJltXhCeN%2BAFkZAKYreGoBJ4z6vMOaf2ssGOqUBDztnqwEtU83bRt8nDzWItKBWrBnZyc3Uo4pwDn%2Bv1qpIQThBhdjy%2FkZsKdrHWZ%2B2Hu2KykbO2bic1SegVf5Vba4l%2FVZOxUz%2BKQgrX3%2F6FpbBfz6CIlZzXu4McH%2F8IOVAhLeC1mmly%2FGemTdKY4YQFlSL6AxyvikW3CZ9ZKMvzlgSChUF%2FcyVYTgJGgb%2FkwK%2BgdWzEUBx5QPigPBfn6ziq1EeU7Tv&X-Amz-Signature=0fa44b5f7230e250742f3e263a446fac6c6e35cc9d613a1916c6eb8c3a1d58c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZL2PYWYY%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T005042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIGaE0xIY1fzHQMlnfIcRN1zHdHuT3qOSuc1DFEgK6f5jAiEAgkYaLb%2FrgspjRrCDBKCoJSS%2BN8a4X0gxqQUFrJ1SUfYq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDD2Q5S0wa%2BabZHEJUSrcAzUVJ2Yp6kQkJYXN1BSehsnHOzOyfCD%2FTJKmzLwTQ5rS6eXZczYThfXxxsEsuLpLbZQM3Bmk9SMA0VAH9QdfohcmHN0KpX3%2BPrAEwTPu%2F96cgbwL96wsuBQchdV%2FA%2Bg2gpy2%2Bz6SG%2BF5E%2BTVqpU0mTqwZNK%2FoTPilbSCF%2FuFUaeniPzAB1uobvY3HAM%2FgJsJPEJcYuZ01Y6Yda7EWFOzct7FyJSFczYEYEHWLg5TpjkNaSFlBsbj4BXIXwUZ3z9L%2Fx7gBBjuuRSq%2FRD02%2BlZ3DuXg8nh2lOlHP22MFj10rG%2FimdKPvy3vkN11%2Brx6p6ZBKlEStKeLW4YG8vcs4sY54IIe09k466miOpWhUVI1Q6PkwpNKIfs263avW40em7OvsXAR5yQ1gxl4jVIF0clsCr2RaY931v2XCj7A30tXhqfelCq90aSsm%2BJVdkhFcmwWyY96Q0qC6f%2F2KtR16Fs0lPumc3mGZ5gjStIuIxZ1hp9g1Sl7173PLD6l9Y899UaEgCtGzqN8ZANOWYbiLDrq%2FRfYQJGTsNjqolF7DAEBT2zF34kCjzjzpIBwwMICXAbgnGiJIhA23Og3m8AFgILhosgLJBbvZ2756Azoj0RDkAVUx0%2F9RXJOR4BstKXMMCg2ssGOqUBui8xUCcuW94pIiVOEpmljG%2BQ8iSV8sBmWdiJeB%2BBS6uVynN7lL8DFK%2Ft%2FERe4fexoHoifeIiyi53w2ieEoP3umuCWLhERksxJ84kGjxUqDH9PkjfvkVrvSPI73UZ6a1UueoKiZnoUOXEuR3FIPwzxPrubEmQa8e%2Br4Duwmnfpty5aZNpIbVenMrZtaETozMN08OHj%2FlKwo86KhI9F8CJB2OXyqPf&X-Amz-Signature=646351a1ce58edd0d8a0f74c39fd8c2be9c5a72b9a6a771518a5422efd2183ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

