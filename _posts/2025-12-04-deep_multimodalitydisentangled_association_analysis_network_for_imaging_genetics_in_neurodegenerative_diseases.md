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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QFGIVPF%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCkuw4eHDz078XMT02rWx96Sv%2BrHbTKOAC8ufvk0ROv6AIgbWt3Au2WQIiwC0xesKL4DOIduU8LJfTTF0%2BYitowu%2Fwq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDEsLO5oMNbxak%2BSF0CrcA9WdKVhVLWmwk2MTDHFmVnizbz%2FwDV22J6ylVOca7CrI3VOrQjk4v69Ir6wi72mJIu8IzV2D8KXJ%2F%2FSfdtAhkbnZZuPiVZlZMekE%2B7%2FEDXE45GYCL410mYvgl4MCB0HxUTiC6CGGQ%2Bh1D2pBoR6BP3EXinyOMocMizfSbGdnVwW%2F%2FAOIX%2FGiS8Rtw%2BEEWvIc7Gk%2Bno0GkiBt%2F3sD2sDkgd4mYh0T5%2FnPTvN5U6nrcr17WFg2TWCC8DoAKb9SN%2F5hBqw7SgFiy630V5o%2B9iNQXdoOq6MJzOjBXzowHu1fpbinL6kFXo%2BLKYAV55IYLk6vg5PA3UnClA6KiMPUGxLAQrMSIXGTqeA7DE%2BH5AmtPds1z5Dv7GHqVYfTVYBDVVvNyc9pChpKwq9ogTvb45fX2dwtJZPuL4xeGXtIrLSuk7pjFX5vEp9MdVOBMmnJMm7GGmVGxud4XCNXL%2FChWTmfkLJXtpDUVQnQjLbw9DzJjEmiaegwmNuVo3wvMtyAkV8pRpfwfCSNV53R%2BY%2F9S1aWp%2FDo%2F4OffvezcqgNY565jPOPxC5AJ9T6LG0izCQWHaCFaDV7rM6CTS9IbLzWcCqklAwJhesvubCA3UhpF%2BSWqDY5Qdid7VNwNg7DWhVwMLLe9ckGOqUBCtAkYtlqQrdIBWTe5SpD4cjTipfieA%2FgQXXCDpVvp7nQ6%2FFYTys7aU%2BHzG4oCp0Eqb0XAccsgCgXkn1hYKvEZjfBhkvAZ1z4S%2BtCnc%2BL%2BaJB3j3HqODg07SmtdcLxdf1hRFKl7o20TmDfUtv%2B6QH6UxhhJVWT7fDE8PLVNh2HriaTQ%2B5zIQO2lqlxDbXTVOd7p81wGW7%2B6EbpjJn92DRqP6inmnp&X-Amz-Signature=a3af815558b0083762f2701a698fb4262f807db4832615e076c76c8ebc9ee855&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QFGIVPF%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCkuw4eHDz078XMT02rWx96Sv%2BrHbTKOAC8ufvk0ROv6AIgbWt3Au2WQIiwC0xesKL4DOIduU8LJfTTF0%2BYitowu%2Fwq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDEsLO5oMNbxak%2BSF0CrcA9WdKVhVLWmwk2MTDHFmVnizbz%2FwDV22J6ylVOca7CrI3VOrQjk4v69Ir6wi72mJIu8IzV2D8KXJ%2F%2FSfdtAhkbnZZuPiVZlZMekE%2B7%2FEDXE45GYCL410mYvgl4MCB0HxUTiC6CGGQ%2Bh1D2pBoR6BP3EXinyOMocMizfSbGdnVwW%2F%2FAOIX%2FGiS8Rtw%2BEEWvIc7Gk%2Bno0GkiBt%2F3sD2sDkgd4mYh0T5%2FnPTvN5U6nrcr17WFg2TWCC8DoAKb9SN%2F5hBqw7SgFiy630V5o%2B9iNQXdoOq6MJzOjBXzowHu1fpbinL6kFXo%2BLKYAV55IYLk6vg5PA3UnClA6KiMPUGxLAQrMSIXGTqeA7DE%2BH5AmtPds1z5Dv7GHqVYfTVYBDVVvNyc9pChpKwq9ogTvb45fX2dwtJZPuL4xeGXtIrLSuk7pjFX5vEp9MdVOBMmnJMm7GGmVGxud4XCNXL%2FChWTmfkLJXtpDUVQnQjLbw9DzJjEmiaegwmNuVo3wvMtyAkV8pRpfwfCSNV53R%2BY%2F9S1aWp%2FDo%2F4OffvezcqgNY565jPOPxC5AJ9T6LG0izCQWHaCFaDV7rM6CTS9IbLzWcCqklAwJhesvubCA3UhpF%2BSWqDY5Qdid7VNwNg7DWhVwMLLe9ckGOqUBCtAkYtlqQrdIBWTe5SpD4cjTipfieA%2FgQXXCDpVvp7nQ6%2FFYTys7aU%2BHzG4oCp0Eqb0XAccsgCgXkn1hYKvEZjfBhkvAZ1z4S%2BtCnc%2BL%2BaJB3j3HqODg07SmtdcLxdf1hRFKl7o20TmDfUtv%2B6QH6UxhhJVWT7fDE8PLVNh2HriaTQ%2B5zIQO2lqlxDbXTVOd7p81wGW7%2B6EbpjJn92DRqP6inmnp&X-Amz-Signature=a3af815558b0083762f2701a698fb4262f807db4832615e076c76c8ebc9ee855&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DATTGZX%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDJpsVdFaIXf5g25pUE70d6aQzBML7RyaF82U%2FcQbbWeQIgNG08tJpPaG36CRSIRTX6DXGeAVs5sDdmFNcfMblGSdAq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDN8BDTZDi2zruaJN7ircA88SLY6Hzxznv2hEB9Kx6vM3OrHAVfgTF8cAM0a0%2F4g6VmFgqyoE9t7J6%2FABFUiwgTpTp1zjku00DkZKIldpOcDsbM0wzs3ZLN5hem9bLZRbAkdtCjiX6IxBLa1z68LFqV%2B%2B0HDSWSeEKTM2ak%2FDpITc%2BEsUp6aGZIGxuTTFHyDt3dsK0Vu1JpSkKcLZuVpn%2Fa6nyq3yRNUPh3WFGhZzYrYI54W0to5uKfu7QF%2FyU86i4vEAf4cN00FXzwuamM9%2FKxUDBBYpsOKbX%2F3bc%2BG2lkKjWkfHACIScZTieGan3H86I4nLfMNkCMr3UiylT0VvJMzHm1XTD7CfTMHfVbM6yKY4RlFRj0QzQYTQSOZVOxLmDPOxBwHMLYMr7jHC3GvsKFSW5gyAzXzlcK7n151A3nwbvpoYAxz3YA9aKkdKwf8jGjWRlOJGGaTW%2BiyDM0XJmB6EAn%2BPVdk0XskVUUPshn%2FMYtJpqCt4Ud0zmGmZYAjJRZ0TaYXZyvmyluaBbTs%2Bu0EH0YbAUQtrJUyavXpGcH8cLPa0XGTcVHeeF8nEVLERtr012JqI8WeUBfhDCMJN%2BPaM8duaR%2FLFWPGPQEXVKsqXXJSrzFEAwhO2K2jccIgnsAJ%2FWOc8oS0cNYDKMPHe9ckGOqUBNiSjQrklF0l9rklaiIkN606Xn5YDZGCQ6YwA%2BN4HgGBL%2BB3mO7ZtIUFBVbZXg6g6K34%2Fc5xdGjSi4CEr5vNuq8hLtPzv4050fbAATAcoc0Xp15hQ7rXop0CNwdrPHiEqcYnvYsP1BEz%2B7Bx0XPtJU9udX4tFLeMVecsm5G6%2BX7kkO7zoDdeNoNNcthjT%2BoGNC24lu9g6YhtoZ058dQsgYMwshXkb&X-Amz-Signature=460b2f7480cce8ae59094a8ccc8f0a1c0ffbf90340738a20a301a114c5dc367c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466635WR6I2%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCk28w9QR6gWYu5rEgxk3Sff4YW7yMQO1PfKPosS2fNkgIgFVaW%2FJAhdgoyZ%2BhakcECBGOeTKnf0aSmWP1e%2F8hAvaoq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDM4hqPMrUsySaE%2BMbCrcA%2F9qA5yynHf%2FCZ6mxajSVFZQVOr4kylv0NFvfIrgbIT1iqBxp2j8uWtgyg%2FBdEsKSwJVqtKnG37%2F2DO%2BpgKUtbQXKX3HmZj5UJq1jSkYunIHIV2XLICBEil2u9%2Bfv%2F2zUPWwxJE0Nka6rq9%2Foy0kf8TygyZH8xL9%2FaHe%2BQKhIhg6Ti1AJ1Nxy%2FNRd%2Fi5ivwiKenAoX7kdRttPg%2FMe223BGpKTix55YGIpuRQda%2FaVLdznr9TB%2Fq%2FKbQ0xSBTQgbQEI5TwVSTHYAvep6i3hgG0Clj2fWazMTc8nOp2ZANTiEZysVeFY5eL%2FztBOJfCYdbgNWNxqquaLMgBlxRE6W0r1%2BmGtN3vBG0zAyaNhKbuUvHKHvWIdEhqnPCDz3puxbaGImnFduTcHr%2BQ%2F6GZTnSH1KhkCCzFYwM33tOAU4wMvDJrlGl%2FW3SS826VncJGOg%2FI%2FUyZxMvOPw4EyVLpc%2BKqKlI9C0yGL4djU2gDAtczUqXJ7lo02VpAcRInFGpMhgwvtn3q63cK%2FwjFU%2Fi75sgp8FUfsY%2BqblTxzXJ%2FXyFRHSdJl4dG%2FUAl5OuMmofhzCptD9g7AD3ngLuP2qRK8WMLVfpc1hCmw6h9rGvp1cKaYprKWbcyyNuAnlvNpj4MKXe9ckGOqUBYm4%2BvM4qolqDfFjd6F%2B7GjdCraD5DWLbi9CnFpBud3LbQkaFHFefPB6nT5vrr7ImZRlTHq%2F1qofpd%2FF168rmIo3QscymEcJIJ71%2B1xnpdOheYLqY3SBUW%2BFpbVal1iDDmbSWegowOZynYhg%2BYfSBYyPUvQUTnv4e069iKvuUdSAuGRMU5TsuCeuLb1hnijbJH8FU7VBecY5aMjitjmrsp%2FcpNqz1&X-Amz-Signature=93fef14495344f0d231042600b2b80d7e3a7ba7d38e80aeffc20deeec8e6a65a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466635WR6I2%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCk28w9QR6gWYu5rEgxk3Sff4YW7yMQO1PfKPosS2fNkgIgFVaW%2FJAhdgoyZ%2BhakcECBGOeTKnf0aSmWP1e%2F8hAvaoq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDM4hqPMrUsySaE%2BMbCrcA%2F9qA5yynHf%2FCZ6mxajSVFZQVOr4kylv0NFvfIrgbIT1iqBxp2j8uWtgyg%2FBdEsKSwJVqtKnG37%2F2DO%2BpgKUtbQXKX3HmZj5UJq1jSkYunIHIV2XLICBEil2u9%2Bfv%2F2zUPWwxJE0Nka6rq9%2Foy0kf8TygyZH8xL9%2FaHe%2BQKhIhg6Ti1AJ1Nxy%2FNRd%2Fi5ivwiKenAoX7kdRttPg%2FMe223BGpKTix55YGIpuRQda%2FaVLdznr9TB%2Fq%2FKbQ0xSBTQgbQEI5TwVSTHYAvep6i3hgG0Clj2fWazMTc8nOp2ZANTiEZysVeFY5eL%2FztBOJfCYdbgNWNxqquaLMgBlxRE6W0r1%2BmGtN3vBG0zAyaNhKbuUvHKHvWIdEhqnPCDz3puxbaGImnFduTcHr%2BQ%2F6GZTnSH1KhkCCzFYwM33tOAU4wMvDJrlGl%2FW3SS826VncJGOg%2FI%2FUyZxMvOPw4EyVLpc%2BKqKlI9C0yGL4djU2gDAtczUqXJ7lo02VpAcRInFGpMhgwvtn3q63cK%2FwjFU%2Fi75sgp8FUfsY%2BqblTxzXJ%2FXyFRHSdJl4dG%2FUAl5OuMmofhzCptD9g7AD3ngLuP2qRK8WMLVfpc1hCmw6h9rGvp1cKaYprKWbcyyNuAnlvNpj4MKXe9ckGOqUBYm4%2BvM4qolqDfFjd6F%2B7GjdCraD5DWLbi9CnFpBud3LbQkaFHFefPB6nT5vrr7ImZRlTHq%2F1qofpd%2FF168rmIo3QscymEcJIJ71%2B1xnpdOheYLqY3SBUW%2BFpbVal1iDDmbSWegowOZynYhg%2BYfSBYyPUvQUTnv4e069iKvuUdSAuGRMU5TsuCeuLb1hnijbJH8FU7VBecY5aMjitjmrsp%2FcpNqz1&X-Amz-Signature=9640cdbf9d39d7f3473e5016fb077eb5cb43cf5cb8fa8cb98590c95e1bae49ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BQYINM5%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDhe1%2FipdWGwkUXFYXSTSMTlfEGGbbBldEL81y%2BrehyzwIhALKft1p%2BnVZNVggBH8oMYL2Mf39sjFcZvqIy5iBzVOerKv8DCB8QABoMNjM3NDIzMTgzODA1IgxRTGmE7lPq6B5v%2BcEq3ANslHKFTcqZDFkZGnHE6Eh9vM3WgapoQucSnxZ4A7hrLFg8uHlKyQvs0olCvlnLch1mH4mNAo%2FZ50OpjO15IWHkzKs4GLV0QsDlnXHHIrGqFJlXEzcUftTfmxSotTgyW5w9u%2FLHYzpnjgpjQZr5qCdWtlI%2Bp6HyJABnyTupoytgSFSTb7b6hHgmTRPBEBpC2wY2bszHlxQVKzZ2ShrIcxgmlc4OT3%2B5xnCIBFwGux2Ea%2BMW7D9HpRveXoMnLjcTNL8WzqdXMbu%2BirbBOjeYu66jyjfSIVhRtd89Bp8IBXKV7J1gjB7bn7iY%2FDwgy4nhNEksXBz%2BYkYF6IMyie99oLmy5JakDX%2Bo%2FbbXoAHy%2BMEWDeOhzlDVJo%2BXD09BaCDr9A7tg877rEWvSRZ2QX%2BPf%2FJAW2UF7bLvrywfsWvGMrMcniTuZGybXfLSBziddWyK8e4WkfCoBZLV3Nl125RSeSedgLghSZupiivYO2D3ZOPoShldRv567T%2FnrrtdUFQjC7x%2FjQWy7b6FZUp42h%2B%2B63ctxWtL5yDKt3IupQcjVNrjNjaOjk2wN%2F0xDRVZEihcJg%2B%2FxHeBHPab6acUa5rWmHks4ilk%2Br7Tw3zC0qomFeYs1Syo%2FsooYxROHNMO7jD%2B3vXJBjqkAbloiAbWlpckx0f7Crr3nEsbqMSibsuTibXNcL56DcBxIEVMyX9qWV6sWxxuhfjDC9mRfGxMvs%2Bv1Uz5xCfo5MarQal3%2Fwdaf9XJC%2B09ivC5lri1GUb9hiselKHa3TdgcYzHFa%2BMjysuBoHat7GVIj5cxk%2BUrxXxVHKSqjJfnTGBw1TgkL0xfpiATu7xqt54srCi6DfAnZVYnd%2FwxOsD09Mbowep&X-Amz-Signature=d8570adade31e0113b03b905e983d10c307b6cee1695307f9377a58c74601bfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2II4HIK%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCpYaS4HmhV6oocjvwzz1rMjGk5aKvUAkwiqenzVneUPwIhANmCIQpBPXHBMqrQ5Sp9LDg7O0MZFUHvrfuIABrndgKxKv8DCB8QABoMNjM3NDIzMTgzODA1IgzdJTh7PBE6aeXdwF4q3AMie6kwYGYQ%2Bs56D0BDo%2BOIZ%2BB%2B6SPpptX5Fw3r95xBIiNpWQipmznxKuax%2Fw5Cejeq4nbe%2FFwXK9rhD2FtOJ9HazAIm9Ir2wAEOysxeNEaf%2B0jUYzApq9Uipnh1UM6nYwBbA03Q1tmigHkl6UnPFOF1ImLhtsV2%2FMyYS5TtqcObVUKs1B4oZXbqk196Wg3J0kpP1FmTuwnooYv1QZ2k%2FXnQVpVBvX6vTB6YAFTf2pJ3YPmAjMZhDfAAumWZoahZedIx%2BftaWdKGjMmI0GMiwV8PyBtIZcIJRGibPz95%2FMal2W3v3HktC3CF7puDObBRJiHK31cH6OkK7i1xVbNe1bL9wa7rMaquALihpQsZYRPQOOFvRH7SOS68Bk4GacOlo%2BVkd3HYTAervQxp30jxnG1Vb6Def0UAwBlRMAxFeHHNmHXm1sgJMPX4vZzt9lKaH8QaUhiYQwMcYbd8%2FtRXPAMvG78x25hjBWyDYKiBogD2r928sJDRRCIepABI1imK%2FjrN6kWbo46GNcZNbCiBvQZvoJBPuPdnXerJxSvSIa4EP7Xm1kd7LDFJc9cLOlusMzd15CqpSJB%2FBpIyaJNG3Tgjgn75SH%2BIGBRdBf%2ByiPoQJfXDHcAQ4lOdcqNnDDE3vXJBjqkAT1pJHuAlm%2F2aHpTqRPDI5l114296U%2Bgt9tEIaDdPBjcmTHegCOSqvDDwC8i3oDNvKmxeMqKlbYVqNmmoUhL6a1gVoySJwM1PKiQfE2TiDyDd45%2Bl3A6vkuf4DA8Nb41wS0uzgLX0tyZahvQqHaQvqKiWQxC6bdAGVilQ8IYHQtR6g3%2FStyjy%2FZKQfBnybMCSsF2nCRjAbbC4e9t9Q4Uhvl854FC&X-Amz-Signature=392e2e71f56cf5cef643f78baabc7ede6a11ad9e1cc1be87ae03eb8f3b9e4b5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663B3P52GC%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCREHj9uWA3taCphRjI5LjTG673ZFr5a2vv3fHmUIDjnAIhAMv%2BGuO2L4ymrPPArv%2FnoQWicQY%2Fw5jLYhzQJroUchdHKv8DCB8QABoMNjM3NDIzMTgzODA1IgzPXLvaflcQ9OZMsOsq3AOV7a65hlXCvJM4AodyUPZZFr0XSalaW0QdrAfd0xdxH%2BL6GJqa0e3Ug8fBWVBjOG5SVSwOJetTRJUbYswnKqL3LQaBkjE%2FAqkcJc%2BN1E65M0Zd0Vd9U5Fpapg0mPKI82RYCwZtJQ%2FlD8stDT%2B63YOhHgtugbIUx4Xvx9LVrZsvRSCb9QpKjSsXgMnC8TGt7AC3j3Uvwo1O2y1aWLc69LOZxPu%2FFzhIbf%2FyNYwhJH4lVsbTT96uX7twOI35OgB8rgz5If%2BOGOsub5PnacjzEx3IKrzi4VkPFuP7zClBWC3Ad8Uexq%2FIPltqKWejpG2soFXAddgnelITqCsxyeSSREaHkTdZd62qn7cDI%2FJ0pB0Pdyl6LCJfX%2FbqW%2FXnCekmmQmfPDmVeOL5RliLHoDNxw35S331KVlZ66XUSlhI3Qez%2FwyHSSbsVa7gwGgimBYsK%2FyFebAes6ROQ0ORl%2BszWh6nnasUKXTlYaiMLriUm1Gv8nnFD1YxTWkGKMh%2F2H3yIkd2lCQE%2BEB%2B43oJmPwokq%2B%2FZ43xhbGGKcUFWjbAhPpCMrBmFaYf19opUOz%2BXUSnl6nFhQIqVNTbQ91n5NM08HYlsIOkYxWx3HvigodLN9%2F8jfFE%2FEYPZTpbdA%2B7rjCm3vXJBjqkARWMZ%2BSeb63NXgI9tb4%2F81zNhKO6ZRs00MKdM30voTbthGcKDmCpQmmvHvbuc%2FLsiA6jKZCXWUXj6ngDijPt8WqYaKkvtvKcLgZUGUW2pACTQnqXRbO7Wkl6SILVaFOzbuHBK4vQ2vgBznE9h5%2FY12TsUcuO70EU8zHFW7o1yjzUIDFq0Wr3oHdYtThjtpRr2R5qgdRgRfDvejJM%2FXGRyTefpOvX&X-Amz-Signature=e8230508d28953aca28dcb1b42bca212ab389167194cb63982a9ff6b7312a020&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGKRFUJD%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDXylcTCjUTbdMdWOwD2T9qMVy06lKdHUtD4Vr49I1vQQIgSQC8cfuDhemqlAlYn2owFOQpakIbtds14UjnCjI9ir0q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDEPVShJcbNskd6jSWSrcA5CpnSSFWBXn5s2BRKCpXshdnHwTdK0maVUYaozb1QWXsbAjsly38D22qinCP%2F9IRVntSa1tCcKB3JhecV2bJ%2BVbfr2GHp3LHHQsh39Yi5Q3r%2FgGK9tRQXkW6sTlhLROuumaAVWzrKMyyq9hF0%2BDwowLXl6BTEbFZX7ZU9r2Yf2E0t1yQ8dlyxtrM7e8TqezNavg5f33oxuM2wiEk%2BpOpTgZ8IIkQHvpmzR5AHjic25MXOgHf7%2Fi0r35GI5lOpnzxrtkedVz31gVk9BoP3uRCMMVwQ%2F49KEhVQLeVLMyQ%2FJREALZ95REMR%2FlOjWQ7c7t0xgHCOnh8VhmJHjIoROmwOMNHFuu7ajTRR20hYQldS4RCnLAPLoEI8EiMsvobf6X8Vc5aH6gkA1%2FLSjnd4U4bQSun6kbHX7Wm2T80QAbqCXoeR1nzqULzCRXDwYudQ4Gm2ri4KGDx0zfan3sUwXY4fcgKqds4jpYcnjce3KCM1sXVYJ9aARC2WL%2FN9qstQe4Vi8MJb0H6hOMQ9vWnpT0VHx%2FIEkwAHlLTH3QhuC%2BOt%2Bq8QJOU9gMUyW6P29lkZxcsJw8NkwxQ6Qdxb2bkW739K2q1DcgZd6Ua19IKlnMo320ren5tg1mthqtcp3XMInf9ckGOqUB9vBGNq9qkUvOrFw%2FZUCyOUOOj0fiYDYpzYrYfEWWdsNVchjAWYYZpEkwIGsKYPoF7DfWwBNQw1GLe3cZ1JPcJEYENqSqw2I1BFqgsdVvbu%2Bur3Cbz02ws9V2EF6NZn9gMQia6bt%2FoM2QAKsHFHWweamOX7kDQJ%2BUu1aHwywH9NRC9r7rw%2FlM6ldds%2FxuAssYxZs4VjoPQJl3Kaa5e2Nmei8TkWNK&X-Amz-Signature=995ed210ada2ec6a73ec57be90f794cf770424068b3437ab148dd89a5d4bc905&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGKRFUJD%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDXylcTCjUTbdMdWOwD2T9qMVy06lKdHUtD4Vr49I1vQQIgSQC8cfuDhemqlAlYn2owFOQpakIbtds14UjnCjI9ir0q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDEPVShJcbNskd6jSWSrcA5CpnSSFWBXn5s2BRKCpXshdnHwTdK0maVUYaozb1QWXsbAjsly38D22qinCP%2F9IRVntSa1tCcKB3JhecV2bJ%2BVbfr2GHp3LHHQsh39Yi5Q3r%2FgGK9tRQXkW6sTlhLROuumaAVWzrKMyyq9hF0%2BDwowLXl6BTEbFZX7ZU9r2Yf2E0t1yQ8dlyxtrM7e8TqezNavg5f33oxuM2wiEk%2BpOpTgZ8IIkQHvpmzR5AHjic25MXOgHf7%2Fi0r35GI5lOpnzxrtkedVz31gVk9BoP3uRCMMVwQ%2F49KEhVQLeVLMyQ%2FJREALZ95REMR%2FlOjWQ7c7t0xgHCOnh8VhmJHjIoROmwOMNHFuu7ajTRR20hYQldS4RCnLAPLoEI8EiMsvobf6X8Vc5aH6gkA1%2FLSjnd4U4bQSun6kbHX7Wm2T80QAbqCXoeR1nzqULzCRXDwYudQ4Gm2ri4KGDx0zfan3sUwXY4fcgKqds4jpYcnjce3KCM1sXVYJ9aARC2WL%2FN9qstQe4Vi8MJb0H6hOMQ9vWnpT0VHx%2FIEkwAHlLTH3QhuC%2BOt%2Bq8QJOU9gMUyW6P29lkZxcsJw8NkwxQ6Qdxb2bkW739K2q1DcgZd6Ua19IKlnMo320ren5tg1mthqtcp3XMInf9ckGOqUB9vBGNq9qkUvOrFw%2FZUCyOUOOj0fiYDYpzYrYfEWWdsNVchjAWYYZpEkwIGsKYPoF7DfWwBNQw1GLe3cZ1JPcJEYENqSqw2I1BFqgsdVvbu%2Bur3Cbz02ws9V2EF6NZn9gMQia6bt%2FoM2QAKsHFHWweamOX7kDQJ%2BUu1aHwywH9NRC9r7rw%2FlM6ldds%2FxuAssYxZs4VjoPQJl3Kaa5e2Nmei8TkWNK&X-Amz-Signature=8f0461dab1c24ff9160decfee05197b5b8368bd5fbabd747a0258672736566ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHK2KKHQ%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDNuo4kYKYgVC6AwF7bfCWbcg5b8zMGW%2FPXLSuP%2B2IqWQIhALc4iejB6zstpyIJVYKgnNV8csB1XdGFCZGgbS1BETUXKv8DCB8QABoMNjM3NDIzMTgzODA1IgzIcYWIWADAU3t3lDwq3ANbXfjFsfeZmCP%2F1gn5a8BEjPI9Yy3j3iNLZl3QzArtUA3A%2BrjZJYpF%2BlLGGQD4nnbceVnjtOMm9KstqtsXtMKUk%2FjmrcfcqGNMkyEzTpzdO4wf8QS4XQQzqqiAre5gZDKR10OsVx%2Fhz4LG8P3c%2FFKj3b4EQ3aAF%2BJhJse1w30T7guatIP3t2OA6Zlxah3KxkDA0z3S7K0%2B%2BqRaAJBqE1qtux6%2BaWm7rzFYFgAiM3KPE1BktQfDM8A9HPqHrNWHDDAlUJDVQBOidPK9BRaBvShZw5Xycvub%2FkoWgFhDE%2BvFVvblBgimxzK92dQmQQTnNpfAN22GTj%2BZhkP39Y74jmm9mrSdFxfvBMTVeYF%2Bnrt736LGt5E8cxiO%2FdYKE4ZTNVWBuLR0sAcZDp%2FxQ%2BsEwuCUcnIW74qUgrQgOBY3scEqMwXRN6l79EXNqXKYJ1EfzY4qVTtU8ID3dmZv4PbwsLKdD4ciVPsuvp5Y%2BfLRTuwYHaG9n7pgxbB9%2FY3Ye2jEXjilNoGVMxOxQRSTYAt4bCW367n2THLMc7olDEVMUMO%2By7yv3f4FlVY0TCze%2BfgqwpM8TqQfPIZ3DXKSg8mrSl1aiFusvQARXxxHBYmKRP0%2BtQhi6iqXefju3LYJ9jCw3vXJBjqkAd7OQ%2FGBWEKco1jizgmOxsCKIJZPBqJqUdoPZdUJ7lmdpnjW39uagNsErXGWqt1mZXpZ7CobqBpNQD6mN41VMzlX8BQC8hocALbbeDsI22tQ0iUF7NUWeG%2Bh5%2Fwp5AsZvMBsBdo1iYAaYJpwjyXN3eRsTKD7VR1XuEsICDh3IPBAxYYnyuVcVfhcJLH4IFUp%2FBKU7f43XoIPCRCvzs3aaVsR0shZ&X-Amz-Signature=fc39e31bd64afcf7b30a5e87e684bedc0f7d3845eed991647a35ac3ff9908175&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCX34OCA%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCOZVggJmzN98LJBj%2FOLPUMZyKLtVI5tMQO0HoiU30p9gIgKGqMWrusfUOt2TKmb66T6tVQeJjyI9b95%2FsZoHaG0L8q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDHe8FWdnF3lzRo9FHCrcA8zY3TdcS6Gr8WKwJyPt0nH4W2s90jx%2FkktKitGo545kDx%2BV0Cq0SGt%2BebOk5ynE%2F%2Fr5wMlCyla5yyxx%2FKKezBtfL%2BihOy58HcBZl4MYCJwTWfeTx9Ym4FQfFlPQErujMvzlhfe22WMKugpuHpaXItUK7%2FdWHczvcU%2B45%2FbOK6iXmy7h85rrCN4Zyj0UchIKojjWxhw%2FA%2BN%2BM%2FaGKSrjNdEHBnk1Q8YbwAokNdPwlDHxi%2Bkb9bGN9wQOZN9bycF5774rukZcSYm7%2BjphwN43IW1F99MuYPrGUvo4VMRHHCjhl90Qg7cHKBknm3g5zTAq9b2%2BYSLBFkvGMswjLynBG8uGjkZ39PWSG2hFBYd%2BNtbfhiXXyIdYzS5L84tOStqDcizHx%2FGQ%2B%2FBf1%2Bm90ckyYiIhnLT%2FOfagRCtC9WYAvSacmKd0FTQhydAYS1cE%2Bnxdq6OVhR9bJoJvT7p%2B%2FbiIWcGvY6FXtoBmAi%2BGYNE4kOsu4QRe9Zk1syAO3niNEFUetJny0Uf1KVxIKYmBqh9HV19BvEHfIZ2j526iufUDajCgGlM95fUPEkz4cPljFKiB7Xe5MqCelNGF56TXWgB50urmVIPBd19le3EzbBF6tlnJjqzxbvivltSWUHnQMPvg9ckGOqUBuhG155Xh0QuWRaS3Y53IgRnfZfXrYsVoYTQ9J4V8FHkZQrXzAFN0kKokXLUbgS4qoo9clJU2%2F36U0cwuYv3BC%2BI4tG2exR3QjBLAo7Pdb8b0VdXH048RWmcfEglGDb8Q2%2FnwuVvzkRjPZlNOlp4mcKbrwhMfvlS%2BxppcytvjCo8ZkQ1TXzE1IBGWgBLolCu9V%2F52jHRumcODZk%2FqLYQNwhFIVkQZ&X-Amz-Signature=878a9f22ca3145abc1b5d8b619fb43199287acc15885470d88fc3375a1b4520f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCX34OCA%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCOZVggJmzN98LJBj%2FOLPUMZyKLtVI5tMQO0HoiU30p9gIgKGqMWrusfUOt2TKmb66T6tVQeJjyI9b95%2FsZoHaG0L8q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDHe8FWdnF3lzRo9FHCrcA8zY3TdcS6Gr8WKwJyPt0nH4W2s90jx%2FkktKitGo545kDx%2BV0Cq0SGt%2BebOk5ynE%2F%2Fr5wMlCyla5yyxx%2FKKezBtfL%2BihOy58HcBZl4MYCJwTWfeTx9Ym4FQfFlPQErujMvzlhfe22WMKugpuHpaXItUK7%2FdWHczvcU%2B45%2FbOK6iXmy7h85rrCN4Zyj0UchIKojjWxhw%2FA%2BN%2BM%2FaGKSrjNdEHBnk1Q8YbwAokNdPwlDHxi%2Bkb9bGN9wQOZN9bycF5774rukZcSYm7%2BjphwN43IW1F99MuYPrGUvo4VMRHHCjhl90Qg7cHKBknm3g5zTAq9b2%2BYSLBFkvGMswjLynBG8uGjkZ39PWSG2hFBYd%2BNtbfhiXXyIdYzS5L84tOStqDcizHx%2FGQ%2B%2FBf1%2Bm90ckyYiIhnLT%2FOfagRCtC9WYAvSacmKd0FTQhydAYS1cE%2Bnxdq6OVhR9bJoJvT7p%2B%2FbiIWcGvY6FXtoBmAi%2BGYNE4kOsu4QRe9Zk1syAO3niNEFUetJny0Uf1KVxIKYmBqh9HV19BvEHfIZ2j526iufUDajCgGlM95fUPEkz4cPljFKiB7Xe5MqCelNGF56TXWgB50urmVIPBd19le3EzbBF6tlnJjqzxbvivltSWUHnQMPvg9ckGOqUBuhG155Xh0QuWRaS3Y53IgRnfZfXrYsVoYTQ9J4V8FHkZQrXzAFN0kKokXLUbgS4qoo9clJU2%2F36U0cwuYv3BC%2BI4tG2exR3QjBLAo7Pdb8b0VdXH048RWmcfEglGDb8Q2%2FnwuVvzkRjPZlNOlp4mcKbrwhMfvlS%2BxppcytvjCo8ZkQ1TXzE1IBGWgBLolCu9V%2F52jHRumcODZk%2FqLYQNwhFIVkQZ&X-Amz-Signature=878a9f22ca3145abc1b5d8b619fb43199287acc15885470d88fc3375a1b4520f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2SK6FIK%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T150112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQC8ZSqGG4ckNe%2FRqqdkCK0PQRQ2Q2rOmdJglUwm41uBdAIhALUx46EIDYsLomH5n56ZGWlGxw0O%2FV25LhsKindGmFRHKv8DCB8QABoMNjM3NDIzMTgzODA1IgxMmngFHb9B8bYyJDEq3AOO03hT%2BlgZqbSgI4aJqf%2Bx1bQs3TfB456tKoWIGCDvfPNKGhm3HDZoBHeT8q9CKh9Br7ME6FczylCSGJddgTtu5GPjGxoCiRhbHmqk5Tu2djYBi7GkLduvgAAQQPuHTNj2o0jTFfoQ2TFy7l3SokPTYh%2F8sro4rlcr1DldncADd3FgZ%2FTRi88DMgmBEzIKN19UddDn7KOdwIeDDMmDjtJUXtF9Bc6xAd%2FMQXXy1W8RhPYj8L1atj0JlTjBN8DVPw5tL9c6LPQFFPb8%2BZLAQ2N3HQ8%2FeSdi2KpdDzpw5O0AnGSmJdLAB3yz%2BTS0oRjuDpA8F98L37UYz6epOuQs34QR84moXojJl9cFHpGorYYvV0nh%2FqXnG09aKGkVyxmyVVRezfaYVJsNOG1PQxYo0Brmtl6kZaEryO5L9%2BP%2BI7sHjlzOdta26IS0y0QDq71Lf2jwPk%2Bt0leOEX%2FhboEG1P5ApTb2qwX8OAPH3kTPR%2FPg7Xj54wCSvkh8T%2Bah59XB%2BYCU9KuqbtnrUnu8Iak5Mk7f%2B4GJusV7K3jV3rANMWvsARPEmg%2ByJLV7YiihhIWuLdf68X3VLMhVbSR%2FagpqlVAJug5mvzxHqDXWQUUNBsJG%2BMV7ChaQ9jAATwBeFzDw3vXJBjqkAe84iwPUaGIDCPf4wwATAUmDTEBsugjQs9Eg%2FW%2B0QDe6B2nIX6Z3RQWAzcBKLdKKcLshL1ly3e5i9%2BhA5OU9Er5zCcDzG24L0DymFODTlmjmq7NIl%2B%2B3yBsrMCsbvaQ%2FMMWBjNVsLoG92Q7X1hTtrRX%2BcORMy4N7gYo41sESKHVUYj5YWoSaYSCmnPHc0w9AwmU%2FQ75ChGjBcRiL5k5QRwdgK9ik&X-Amz-Signature=ba48e09749ef76df92293c7fe9a30ea823a910451ff6c92f66923717952b6a93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

