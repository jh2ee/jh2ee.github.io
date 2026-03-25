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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DQOFUCM%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE5LLfZCj0P3PezwSjFfSQD9PFO%2FPJTS%2B%2BHezYPI8tBIAiEArDfmn4e0GdFLzaJAwgZvWHX6L6zfZFbvWqw90C8%2F3A0qiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDvjSV7uN%2FdJutWU8yrcA2r%2Fz7bl%2Fwpzcej76%2FM0RcRSk8i3D%2FXUtheahgA7HfV97PM0BHU2E9VN0%2BlQcsFvFBeBgHIHtsOJ9aiG%2FXFoTw6%2BSgqF00wxiFWmjD1J2BHubiGMjVlU7j4BdUoGwJXPjGGcpI1t87XIkdsA9pPMUQqOVXSV9ZcVV1p7pugAMs7VeIFjdyAI5vMzG%2FdUuYGKw4zwbmBSKaYbG2mDL%2BX%2FKtoE0x6PIpX3p70oCpQIAEiNUTCPHO8fxSYlFFn2g7chvmsvC%2BF4XIbtSgb%2B7Z9Vbm2Lzvn8rNcIWYDQpNpf9iy%2B7BOge7MWgII7AIVq%2Fs%2FTHrFPRKqTffdRSUgBVmkA1EjH3v1gHyDZ2l3D8QEyuuo7dnyY7qDcYuyPsg1YVebR5fvMRmasRHlRD2kSbdh3Gm%2FJfX4VEuqSg7kHltJaemdI7XggjKCa58szSxuuPBg9rOCe43U1TzAou%2BS3Cbn%2FMuyHOW8%2FONNys7zane3Jmf0EScVRBC4Je%2F5noYt7eCDhuaL1Sush%2ByLHuEMCrE2Gv9OUCGSVbRbDlWiCoMtmS13IXTcZ4MB2SObOfC6D10x5vbfUUvmJhaonJJ%2BukXTv%2BIB7e%2FFdBUFVdyvR6D3yzR%2FSkb1OqO9VjLULXr42MMrOkc4GOqUBuQMx%2B1nwO%2BlDm%2F9BEp0LAC1yQf7%2BipUtnUihU%2BORTp%2BYNWKaJSqNsTdxMDxv0tViHboqauvEbtpcfapW3rosMH5OhIs7dz48oQ8%2B6aGFNiX40ZyCzk0IM%2BdzG4YjJCUG%2BPH%2Fb2sq%2B%2F99cncQTEfK0l6zKLKChDr1nS6XAen03PeLCl6n1rwlo4YOJ%2FZeDewmBoEPI%2FI6gUknOpPen695%2Fib%2Bqenk&X-Amz-Signature=e5de329455288060cf99010a0aed94bccc806b573310391a76d26fcf394c6439&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DQOFUCM%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE5LLfZCj0P3PezwSjFfSQD9PFO%2FPJTS%2B%2BHezYPI8tBIAiEArDfmn4e0GdFLzaJAwgZvWHX6L6zfZFbvWqw90C8%2F3A0qiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDvjSV7uN%2FdJutWU8yrcA2r%2Fz7bl%2Fwpzcej76%2FM0RcRSk8i3D%2FXUtheahgA7HfV97PM0BHU2E9VN0%2BlQcsFvFBeBgHIHtsOJ9aiG%2FXFoTw6%2BSgqF00wxiFWmjD1J2BHubiGMjVlU7j4BdUoGwJXPjGGcpI1t87XIkdsA9pPMUQqOVXSV9ZcVV1p7pugAMs7VeIFjdyAI5vMzG%2FdUuYGKw4zwbmBSKaYbG2mDL%2BX%2FKtoE0x6PIpX3p70oCpQIAEiNUTCPHO8fxSYlFFn2g7chvmsvC%2BF4XIbtSgb%2B7Z9Vbm2Lzvn8rNcIWYDQpNpf9iy%2B7BOge7MWgII7AIVq%2Fs%2FTHrFPRKqTffdRSUgBVmkA1EjH3v1gHyDZ2l3D8QEyuuo7dnyY7qDcYuyPsg1YVebR5fvMRmasRHlRD2kSbdh3Gm%2FJfX4VEuqSg7kHltJaemdI7XggjKCa58szSxuuPBg9rOCe43U1TzAou%2BS3Cbn%2FMuyHOW8%2FONNys7zane3Jmf0EScVRBC4Je%2F5noYt7eCDhuaL1Sush%2ByLHuEMCrE2Gv9OUCGSVbRbDlWiCoMtmS13IXTcZ4MB2SObOfC6D10x5vbfUUvmJhaonJJ%2BukXTv%2BIB7e%2FFdBUFVdyvR6D3yzR%2FSkb1OqO9VjLULXr42MMrOkc4GOqUBuQMx%2B1nwO%2BlDm%2F9BEp0LAC1yQf7%2BipUtnUihU%2BORTp%2BYNWKaJSqNsTdxMDxv0tViHboqauvEbtpcfapW3rosMH5OhIs7dz48oQ8%2B6aGFNiX40ZyCzk0IM%2BdzG4YjJCUG%2BPH%2Fb2sq%2B%2F99cncQTEfK0l6zKLKChDr1nS6XAen03PeLCl6n1rwlo4YOJ%2FZeDewmBoEPI%2FI6gUknOpPen695%2Fib%2Bqenk&X-Amz-Signature=e5de329455288060cf99010a0aed94bccc806b573310391a76d26fcf394c6439&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZQ25DYV%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAff%2FrYnQSrOcOxx%2F4Ks3tzXQgevg43n7MTUWuH5HV7tAiEAosS%2FlLHEMS5lQSI6jBS%2Bn3hTw8Goz7YvRXdy%2B%2Bz22FEqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBTCOB3It7hXc9FYWircA7PlQwABZRfhNanGSId9NBbr6wS5N2d2EtxZGQpmzoxYtAE1AJJb1gJYaFzU1p0O2f4iiUOO7LUQfm8pBTj2je5FZHnXvnqrjQLyMXzk2TO%2BUoRY7jA8hZvgaearJmTOMaX6cgdNDvROlTXAvZM4ak%2B9GEDjNLw30qm975wFwuy8yydaDWTy8NjfxthoDcarDeqQDOxsggAwdvv%2BmWFdTGNEXKZ7PiS%2FUKhv3un2O1y2STtPefqtul7VMK8q8lRAI%2FMRVERINUjUygjsqZNNTYJVXq7BtrIunoU7p0UJR0Ni5h3ysmCf5dZzDgyY5nAaSLRzD0mIUB5Ka3F9v0jtoeZDhdHqwKpH7I0%2BfASiWaeOdBWXYGK%2FO%2FoeScBnRi9Ge21p78%2FkWjmda1VZzViGHLW2gj3RzsXzen8F7l5QDHi9EPAK2yTngx%2FY%2F6tcOgnMNB46KhD25rkU0doWbGHeFnRfu7S41akVvWvUZ%2FXeSb2mV1JCAjOVNamMPPPKh9GIjv%2Fltd28fLV78WwVVr1NeZBG1wiKBzkP7zicNPfRAJYDs5GDuC%2FUuuILGH%2B0dwZNy7Ojyd6uLGRg48BUUJO1Lo2tuhK5%2FKpAKTTyYXAkXdQqrSpvupKtK63rFSF4MN7Nkc4GOqUBdDrygMj%2FUW%2BQFVGg35pqVJz7Fa9xr%2BftJu7U49dwHNvcZb5%2BEaDl1ZRkcvTIRDCL87TcUnJdBi1hTvioZeUspNL4anwf2CaQaDJmHahVZHo8YBsVaRxZALn3%2BEu8g3H6YGI5TuEaZuFkbxsq9b7RKEzeYa0MobYrJ08QOsP9dEaspDNQQo%2BmNUzTNCowPDkmk5OlYo20%2BYR5yu4AyZLdyMuyGgTt&X-Amz-Signature=21d72ba057e474fdd73078378d1e6d9f901786a8d00716516e823174bdec7a5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KKJMOHP%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC66uV%2FvLORDrpH38r5ZAetTBqIOCTaVt3qEBZV6lMwkAIgSjichejsCLLXM17ixrH6OsRz%2BMwj34KIN9nR6ZMtEKEqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC%2BTLgAa4Jyk2YzyNyrcA4Cyx7zmmkuKBW0u60C9cRpOncSO1NmD3PvNZ2KHGBwEENYZfO3ow9oHIktBEEryTN%2FdjPI2rZAnK7hS2Z6nCmCGvncJODznDtghxCmSS1Ay1axi9pBvr%2BVXRKnumkAsgCZeWDb%2FSvECLRHSyNI1LOcgDliW%2BggBghJN1h%2FGimJ2uBAuz5OGzrJ7X8Pk6Ab6bNNPyMkSewven4xlt22%2F3tGgBynAxmUygFomh5JxTP0OiiSGoIMUPlmuSBp4%2Bv%2BicWcJQrcVpYib2r8XbB%2BO%2BURUtkyI3lir66RNfAMihZf1PtAlOO16k7%2Bwk09VJS2PhxR4VIipdqPesxHz80Rb3cF7wi3L9XcoMryAzoJ9rfSyjgd%2BdRYVhNO5keHCxwV1FoMXQLlRUVdQncWLLqYGIm2NFQzaMkGyGT4fKmFEqTRUH%2FESygl%2FxCLuryTLP%2BHh0VfqypVUGfH4%2FJMv3NWlOTs25WskrqlrpY7zPASPTTuSuVD9Fu8CGGVf4hqf002mOJGmoWr1EK9qHbIBp8iHFU7rSlJOo9JMD6ml%2BUVW5BGM8gm84eZoxusOrtJj4aiXR7e3fTtMCjUc2e4882FLBs8dsSM41%2BHsG8z1JH5Sioh8aCm5dlx8AI95Y6ngMIjOkc4GOqUByFhFW%2FcjvyZEe5SGij5IalsrXVSg9X5PNBQTOKqA7N%2B%2FiY5Oll0d3Tq6RshkPfrchRfDfeSIsujBrsVAk7T57xZL%2BPcD6x0sviY5oF%2FZFXH1caS1cSjiFn25bxea4bSFwGCaIbUKUrHu2HqXHfnLXeEX0evVYKUC69MuB%2B70Q91FgT2I%2BOV4v7Wnd3xgTrpw94gKLiAqkuV83ferJsfFxAgu%2F6PT&X-Amz-Signature=435531ee2fdb1be331dc108c563c6c5fc68c8294d6bab3e2367d3e3f5810b31a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KKJMOHP%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC66uV%2FvLORDrpH38r5ZAetTBqIOCTaVt3qEBZV6lMwkAIgSjichejsCLLXM17ixrH6OsRz%2BMwj34KIN9nR6ZMtEKEqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC%2BTLgAa4Jyk2YzyNyrcA4Cyx7zmmkuKBW0u60C9cRpOncSO1NmD3PvNZ2KHGBwEENYZfO3ow9oHIktBEEryTN%2FdjPI2rZAnK7hS2Z6nCmCGvncJODznDtghxCmSS1Ay1axi9pBvr%2BVXRKnumkAsgCZeWDb%2FSvECLRHSyNI1LOcgDliW%2BggBghJN1h%2FGimJ2uBAuz5OGzrJ7X8Pk6Ab6bNNPyMkSewven4xlt22%2F3tGgBynAxmUygFomh5JxTP0OiiSGoIMUPlmuSBp4%2Bv%2BicWcJQrcVpYib2r8XbB%2BO%2BURUtkyI3lir66RNfAMihZf1PtAlOO16k7%2Bwk09VJS2PhxR4VIipdqPesxHz80Rb3cF7wi3L9XcoMryAzoJ9rfSyjgd%2BdRYVhNO5keHCxwV1FoMXQLlRUVdQncWLLqYGIm2NFQzaMkGyGT4fKmFEqTRUH%2FESygl%2FxCLuryTLP%2BHh0VfqypVUGfH4%2FJMv3NWlOTs25WskrqlrpY7zPASPTTuSuVD9Fu8CGGVf4hqf002mOJGmoWr1EK9qHbIBp8iHFU7rSlJOo9JMD6ml%2BUVW5BGM8gm84eZoxusOrtJj4aiXR7e3fTtMCjUc2e4882FLBs8dsSM41%2BHsG8z1JH5Sioh8aCm5dlx8AI95Y6ngMIjOkc4GOqUByFhFW%2FcjvyZEe5SGij5IalsrXVSg9X5PNBQTOKqA7N%2B%2FiY5Oll0d3Tq6RshkPfrchRfDfeSIsujBrsVAk7T57xZL%2BPcD6x0sviY5oF%2FZFXH1caS1cSjiFn25bxea4bSFwGCaIbUKUrHu2HqXHfnLXeEX0evVYKUC69MuB%2B70Q91FgT2I%2BOV4v7Wnd3xgTrpw94gKLiAqkuV83ferJsfFxAgu%2F6PT&X-Amz-Signature=dae8609fd85e315caa605c2aa3b271ca0c88aa322c84ddb4e33ed719ebde4b17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ISGT4L6%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDK2N0sUMudLXj0kbvcNh6HkBhQJfqhWg%2BPFarf7IJPcAIgWuipf494ydhPJOh5SOAgWkZjVAsvw5biinw69yZmO8QqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOaeac3kd%2FAvyFF8JircA4Fs7nF3SG%2B1ICSDuR6RYes%2Fciqc0C0foE8JQwloKfm67MZv5aPl95sRsJ3huZucfejbOsO0%2F9UYtAVeiQDmVIdvBcvex6PpHAxOw7nGgUqJlfpeba2bxG2KWGanV8DtgMViGni1hGnK1%2FCOTdDA14C94tFzMHzMl4Aemwol%2F%2BpAE%2Bz8pTfGNacz8zraqyksQKOduwQySogtVlcDlZrfDFBsLwjZOEL5NbdYIVQqDhjKnzzegvpXOUcDJ6Tr%2B%2ForVx92MnzhQga9NqfS2rJhbEfq%2FxMC1ID63JGZ0XzJq06B25JfnaRK606675CwF9lSXIeK5dlRYe6n0KpJFGCx%2Fx%2B6hNr%2Fs3y75AuEW428AU1QgGmvbZSHIRI7dc87mLoeQuGAluCbA778cG3eTsJr9ZbKdlb6%2Bn6d3lPc3c9KiXbRCY%2FsDtEpMYdxrC9VQIt%2BGSQjKhgEGigb7w4Prd7SYebpMyk7PU9Q5GVK%2BKnk6MTFoaL1SnVSjVp6R8e98JDWEy9fj8xw0Un6e4Qqi7J0tUiXhgkdqAIoEJux7Y1fny4j%2BbenK6uc4wzXvApf2uVESPL1ZJqiVs6ri40atw%2FFG4EqywVek2aETs6PFPNYQVc0XQLz1%2FEV%2FUQyoLCaMPPNkc4GOqUBHQ%2BgWNLznzSOZWtYuI16ldqx0mNnIznQSPHe5d6OfK2p4qmc%2BOJXUi1iaZGMYoTZTWyM26gixikLKj9NhDx1PHT5k8CVH5ATqZD88%2FfgMbFodAuPBkgmQ%2B%2FwFNFBTM%2B9KchgBvzDmJ%2F23cMeFhFBUqPxi4FtR0ihTgAoddrpSEASNO4iHKBXzli%2F9KDOi8F5Jd%2FyZW%2Fy9Iv%2FHEd%2F%2BjB2HZ0sFSTI&X-Amz-Signature=31e9bbf47bfdb5968c63805db02da5d685165a7f4d03aef7bb44b80077c19176&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GWPPWY7%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEnDuoJUdygCe42M7UsJ2uf16S9kDhMXdCV54C%2BWfOHFAiAzWstvjfewaOYu2l03%2F%2F23Eypczo6xIr1OIQpjFFjt7SqIBAi4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9Zlp3deko3geRA45KtwDwf79EizKmmpuUw7gJNmg91cYJNWnctfsMroC%2FaHq622zbtxlnwDioE9X9cM6wEBCmLXMRcHnbuVZJ4YMarBL0njiED76VneZrS5uXS4t85twiKfrgg5Pjk6%2FUG%2FQa6umxEGDpBPw59zHWwYwNTF2Rt2S8T%2Fz1ap7kkb1LJD6%2B73HxjOQm5tPXxR%2FIGAlphD6QUbfx8ARYCAUe1Fyxsl15esdqVTRtnXBRtkrYkvrFLmmpmplUUZTBnVQ%2Bsr354vbr%2BIJbsrlAiVH8OXNsFXqyXbqmDLU%2BXEjMSPxMt4T4E%2Btw65GYfXm063UQcqnOHktSeyCt0Yg4DuCowCAJ9synJWmjSmPdKI%2Bh5g7PyAf5LzSdMKrtVQKLK4rjjzPa8eA9T5z%2FfrX4jUGW8lklX4XXoEHvOai2mv6S0NROIO%2BqNdFmsft%2Fqjzihk5oEtDSU3aYZrieHopa%2FCgPjR97Oc1WCa0dV48ao1djHvviemv8qNeltazm7QRiFpTJ31cuJsSwyNmsLKnszAFKLKyboar%2Fpl9%2FuGtvZzQRengme4umdSOtzODa%2B%2F4lw8fEzgKGAqRKsWxNjMF%2Fpn3SXIXVndgSYAj5b4YC2HD7KotR4LeNC2jDuKXDjgUdf6ruI0wsMuRzgY6pgHWGeI8GDVInHlD%2Ft85vwKqOVqlm%2BjhDrbpvSXsFtT8s4e7PQGEaXomrbgclH9N6AM79u93JKUyaNRTh7OlG9%2BvDe1BSSHBSJRWgBCh3pJ%2BL4SLDaojXtPs61hjRN7JEoUcL12qrXgzvP5XQ2xOgTfdZtgK5l7Dl5hOUqNIBTF%2FS8CeQTJCHDjCIzJkTDJ%2BPKE8YK3BwBuw4AsaavssAnckvuVlTI%2BD&X-Amz-Signature=313d3309ea43aa5ed7a355eff8588e66de2ee51b1a50c28752f84cff635edb4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CFHFHOB%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDDIpwJR2ibbkgsAy8MRrhqG76yBQJCL2jxp73PAGWytQIgft3V3VUuH54OX0s%2FfNkDV0ZmjdpDOvoEnzcH70%2BeDVAqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD7VfS61%2BtKLRJLFzSrcAyI5xT8mlgNgwoKWc4k1V5Olmu0gIRtl0akDBc9vpRSPCtLm5Gbc8ooMTdGivOJPRjXuGByABvKkndQ0iSILvGdiZOONdS7rvrHCt5Dnh0%2Fga1m1LZPbU4PqzeAz%2BaFNWkNncSnOKo9uapMAGfNB%2BTBpvl08VKxd%2F4f%2BLEaNKasTQrREGOqBCOYCMORRNaQf88hqPDJOc7k4eIuc3OS2%2F1%2BfRf%2FLv2KIpOaW%2BI50zXuOe41T6gGJHVp18vEB%2BdnvXOb4eX3V1AKj37B4kAm6A6GdGP2EYfln4RgIcPGp6gb0RG0clHI%2B6Zk%2Fa7pjlBR69yfWneLIAmdNNgeHgZR3A3qWMctBRJMLI%2F9Hz18Fb2WnyCq%2FCuUDZbY6esmEYDBYZjKJHfeOXh%2Be%2FvrneLwqOZCDXGOV%2B5ntUwMcbDHQhYP3SAzpuO%2BPwroxDUHcDvR9%2BvyICo766MjlSUXsJbcA9IC6Prmz4dQOFCI6wvYqbt1l6ph9wcIQ15IJaVFOeAcQoJs9K9dFWr6wqPFsvIPXZF%2B0zctJAe%2FKesqYj8ON86KkuEabjc%2BLr4jyfifOCv2HkT%2FbYkqJBdJYecKTfOTjfblAKP2a9Fn%2B4uA2eewGQnmAxVdclJ%2B6aEidFhn4MI%2FOkc4GOqUB8p%2FFc6kmoRYbuVABq88y0TTvvWbN1Oppr2KEK7IwAXPYMzbYytj0lnbWcLvXor%2FfXRmSPey%2BSdsiY83JP6fcwb%2FWv9Ubmh1JusQOHreruP4yNPk9kmTaIzfhng3CqP27nkXFaIKAVfOdG4YwJWDfuw0XYMUuNaqgrWfzUcJ8U4WfFIL81q72Ux0nnxeQcdiRVkRTAlHjAGPRk4sW9UuTNpXt4QIQ&X-Amz-Signature=ecc7a730a9486b2c6f8e9c982940d315b268f3d7d5a0dd8601b731627ad5a2db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WN2DXVSF%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnE0%2FceHoa0jpJL8AS4zoWropWcOXTmw5nxx%2F1V%2F%2FYsQIgWWaC43utOnDzctnpk%2B5zzGpQ6cT3hUdVOWzcNkQxdE8qiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG39EZyg5D%2B7926RFircA5k5WxdwE05i6mFEAWSNHuNogCKG1vK7wgxFcQAPWp%2F%2FytWl1CpLV%2BiVZ66oE5XMp%2Bay9lnhkm%2FF0RgJ%2BuMnsdLganua5TDiv75nFMFajst5OTduf93t7XIy4FvWUYa5DRXQ3b8L%2F6kGeIAr5akaO33LA%2FYmde9SRO2nhVHYJ2L3LJXXjPhlY0g1RiAHd%2Bt90pVfyv2XzawE2EIBKx%2FHqc80lKA2FI51xVYm173v2hBL9%2FF3lvze9FCyhwMhwcU%2FiYn56%2B2SaZU8A9oXqMwN1N80dtHaPTMWf1WmTQKaE7i6Y%2Fa31B6eMd9C8Lu4QFV9Pt90vcfSNBj2i8QS8mpu4Vc%2BYnR07mpaha%2FxgdOJ4Xie%2FaSYSBTioZf9bXRbuSK3wNKJUhGSBVpXx69QJwPz1LUuUjPiGD7ILcyootLVICS75wiaX7TQ2HWn1IcD1GCSIqP15aeCZaLV1yPHJQZVkyYkR9YU8N%2FGTTIVPrCDdMNkDrBZ4BlEg5%2B%2BiacCH9xxwArydWlfyIqIOgdXhTR5rPc3MVYP0iNsHOl6LAU4F2P5D0sfzWiPfg6WesAUTBa8DKimL1JmQq0GpwYh1BoryQiXuztp7uQvNkN5t5pb6uMDrTxzh%2BzbnqzzSOiMMJ7Jkc4GOqUBUOxdfeEkuRg0a9YVRtYkuebCzYFcDqet0D9pGDXBoAXLbyXZnTzyOYfeXEmjlFA3XC1tnpgHuUIW8Q5Jc%2FSDPQoJpAYvgdGhBf4ERs7jUomD13yIEgZDfpWGbJZGyCylbp%2FrPyFmC2wfooLAOrCcJpq34ter%2BRDuJKrntJGK316OUHR9dUVsyKqt6pC0VQsuNerTPHmLPTTyhO1rnTArdlEtwEfI&X-Amz-Signature=d32f1da8bc01fab2db01c0d91b9054b6bf633fac3578907deb027b18a6e883f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WN2DXVSF%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnE0%2FceHoa0jpJL8AS4zoWropWcOXTmw5nxx%2F1V%2F%2FYsQIgWWaC43utOnDzctnpk%2B5zzGpQ6cT3hUdVOWzcNkQxdE8qiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG39EZyg5D%2B7926RFircA5k5WxdwE05i6mFEAWSNHuNogCKG1vK7wgxFcQAPWp%2F%2FytWl1CpLV%2BiVZ66oE5XMp%2Bay9lnhkm%2FF0RgJ%2BuMnsdLganua5TDiv75nFMFajst5OTduf93t7XIy4FvWUYa5DRXQ3b8L%2F6kGeIAr5akaO33LA%2FYmde9SRO2nhVHYJ2L3LJXXjPhlY0g1RiAHd%2Bt90pVfyv2XzawE2EIBKx%2FHqc80lKA2FI51xVYm173v2hBL9%2FF3lvze9FCyhwMhwcU%2FiYn56%2B2SaZU8A9oXqMwN1N80dtHaPTMWf1WmTQKaE7i6Y%2Fa31B6eMd9C8Lu4QFV9Pt90vcfSNBj2i8QS8mpu4Vc%2BYnR07mpaha%2FxgdOJ4Xie%2FaSYSBTioZf9bXRbuSK3wNKJUhGSBVpXx69QJwPz1LUuUjPiGD7ILcyootLVICS75wiaX7TQ2HWn1IcD1GCSIqP15aeCZaLV1yPHJQZVkyYkR9YU8N%2FGTTIVPrCDdMNkDrBZ4BlEg5%2B%2BiacCH9xxwArydWlfyIqIOgdXhTR5rPc3MVYP0iNsHOl6LAU4F2P5D0sfzWiPfg6WesAUTBa8DKimL1JmQq0GpwYh1BoryQiXuztp7uQvNkN5t5pb6uMDrTxzh%2BzbnqzzSOiMMJ7Jkc4GOqUBUOxdfeEkuRg0a9YVRtYkuebCzYFcDqet0D9pGDXBoAXLbyXZnTzyOYfeXEmjlFA3XC1tnpgHuUIW8Q5Jc%2FSDPQoJpAYvgdGhBf4ERs7jUomD13yIEgZDfpWGbJZGyCylbp%2FrPyFmC2wfooLAOrCcJpq34ter%2BRDuJKrntJGK316OUHR9dUVsyKqt6pC0VQsuNerTPHmLPTTyhO1rnTArdlEtwEfI&X-Amz-Signature=76869ca9417e6674ce24750a25a562703a7fdf68aafb9dbbc9dee2a436fc61f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5U7VZGT%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDu0zVyWesdlF1SjIFpTNRSIKoEjUeM%2BMcNUD5e%2Fj7sAQIgbPoaWe0ZZWaoY2SnJupPZm7a1GDAH%2B9H7hvo%2BvjXu4sqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNoX2RYbHS6d0g9AfSrcAwWfgN11mqgYyKPzij7OF6XHnGoWHBNWdVYB7GM5AmjVKkl%2BkBO7RyPgMKfyrduMhLTbFEnZwVwJ8deYUPd%2BS3gNbAxhTiTMfeOLRj%2BnUKJlharmG4uOL1b%2Bl519we9K0gs76S13MZ6aUT5FQcsk%2F8%2BTcMoEXIpgBJMeNkpGQqtFYE%2BE2g3gBCVTxmXHnPjG3auNa7shpy0XZSGoL3osT5BDGp%2Fy6ZeRZuda5JUV88hFSsc138eEyZkgMFMf64YktJeKCyAIlxGxUlKEsp049z6kWVArhT1roQmfqum1mc5txHRW4IpUIsB%2FkRrv%2FcGuZGfcEUDReppz5ETK0VJXkwDMQzVrTj%2Fnr7GIDe76elcVn%2BicM%2F3gGDQwRz0CLIUbZheDhO0VxHrnM4fx20cDVVTspNsRCP6Fmpwv%2FubZj%2Bn3VlW3uyjjZ0ySbYtCXM%2FB3g8tmlAvb1mXkT2Dl66x699K0jFx5Ub3YUURWgGp4XMIKk2MXqt8PaUettGMKAaa%2BgqQiOF%2F3VqcSfU7ucuIrT7M83P%2FEF0Nna2ANu%2B9Ttwv2TtwiNl%2Bhl72YTqbsNkqfeMTIClJoWfKLiQJLRHjPdVnyETQsp05i304aIjueihCcDAbt%2FOnWea%2B0%2FBcMKjOkc4GOqUB%2BQ%2BUu0K%2BVbRH4yFz628vVe82pR4DIXK83qNmea%2BSpZ8vp7XBQDjb%2BSi%2FQO3JqLEyjdL1wPOdO7ZcZscA4Ew826%2B3eIviNKhXdP8FlVNWQgUfrQO0mjJyEocvbDlx6cGVqwlcUjgwZOE8MoGP1BEoWjMefaSdl7uMdTW0OTWXBIGsqFSOhQYhyzplHKtN13pvVeJqGeqrAg1BlgDC4GtQ9OZXP2xu&X-Amz-Signature=738a351bed3fe1b6562f7aa2698ded74be6587b796443442b78319040c231ec4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBAYNDG6%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4AmL4XdC4s8723CANoqAidHY4h5s%2FnicGEfDo2y6hSwIhAKS7BpBGkbKXZeX56J4Ol857e9B29%2BDXCU0b6Y5vtJZRKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx4jJubxD9skvixBSMq3ANeLw7nYNiDeyqLki7PMH1pEqXMQJPkTH53f%2BrYE4Ilkjq47mdBSz9M81l8oaG%2FR5eQ5biIOPtbt0nkusJp0e5FNHM10oA9PizpCz5xXZQTWsE6rlPp29AlKGcrVPJ%2F%2F%2BFncJfnFltKvjlGj4scWTRUNF6tPSlOlYyF3dgkdPRha%2B%2Fep%2F%2FpZlwEcaq9mfRqUG972J6X7JOJmNiTdH6YRnk5OixGSy3uz3uBzXOheshTd6sbvNDrBUtFm%2B5e%2B5w%2F0dintwJTGMs6lExkd8QuHaNKyZVNC%2FHGGHWZD0BzrtXW%2FPpRq4xzIW6sDqZcHpRSladChvfRQmgy9bwwAHl8D%2FX3SZS0EmvEwRmfV0YtzLYDDr09M1f5O%2BCNY1kc5W7LOtF9pELCtLX9dajv9LWMnAnZk7z2p9s%2B90IHXGvWnFPTghCJ69U%2Bow%2BXw5y4wRv1t8y3id%2FoGNC9rXUKCZfbxiMBEuwH1Je7%2BkpEI5vLiBJpu75sxfS7WiWsq4nM%2FfyUbwfdAFGm2G%2F1%2B89BHTEjfEmN0auq17A6%2FIXQRW%2BFvDM9ORdq0xuAWVZfaYLPoYQMCn8JshdhOYtsxxa%2F2nVWIfsBqHMYllumOm8NYG8HOSFTZyH0mPNqdY1KGuUElzCPzpHOBjqkATCwW1KobagCvpeyTYwbasv%2F2j2RftyQXuPKnQD8ATl7vP%2BK13lujAClmGGg5qW0tHbjIvjTXn%2FVghMivZefzoMe1LBiAUOx11M0iqwUmySpscJPdRelTgdAthkRihOThUSD7rivA2ar%2BTS1f9s8qTotiwfJ%2F7oFuNfgw03ejTnKOhegqRHYIZYzWoTd0HuLsaYcoIRMEwnpR8xj8nsKXloiy8Pn&X-Amz-Signature=dc3d352b764bfe63fd3c0322f9788ba540fa28a74db82a858c1010b37cbdb87a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBAYNDG6%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4AmL4XdC4s8723CANoqAidHY4h5s%2FnicGEfDo2y6hSwIhAKS7BpBGkbKXZeX56J4Ol857e9B29%2BDXCU0b6Y5vtJZRKogECLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx4jJubxD9skvixBSMq3ANeLw7nYNiDeyqLki7PMH1pEqXMQJPkTH53f%2BrYE4Ilkjq47mdBSz9M81l8oaG%2FR5eQ5biIOPtbt0nkusJp0e5FNHM10oA9PizpCz5xXZQTWsE6rlPp29AlKGcrVPJ%2F%2F%2BFncJfnFltKvjlGj4scWTRUNF6tPSlOlYyF3dgkdPRha%2B%2Fep%2F%2FpZlwEcaq9mfRqUG972J6X7JOJmNiTdH6YRnk5OixGSy3uz3uBzXOheshTd6sbvNDrBUtFm%2B5e%2B5w%2F0dintwJTGMs6lExkd8QuHaNKyZVNC%2FHGGHWZD0BzrtXW%2FPpRq4xzIW6sDqZcHpRSladChvfRQmgy9bwwAHl8D%2FX3SZS0EmvEwRmfV0YtzLYDDr09M1f5O%2BCNY1kc5W7LOtF9pELCtLX9dajv9LWMnAnZk7z2p9s%2B90IHXGvWnFPTghCJ69U%2Bow%2BXw5y4wRv1t8y3id%2FoGNC9rXUKCZfbxiMBEuwH1Je7%2BkpEI5vLiBJpu75sxfS7WiWsq4nM%2FfyUbwfdAFGm2G%2F1%2B89BHTEjfEmN0auq17A6%2FIXQRW%2BFvDM9ORdq0xuAWVZfaYLPoYQMCn8JshdhOYtsxxa%2F2nVWIfsBqHMYllumOm8NYG8HOSFTZyH0mPNqdY1KGuUElzCPzpHOBjqkATCwW1KobagCvpeyTYwbasv%2F2j2RftyQXuPKnQD8ATl7vP%2BK13lujAClmGGg5qW0tHbjIvjTXn%2FVghMivZefzoMe1LBiAUOx11M0iqwUmySpscJPdRelTgdAthkRihOThUSD7rivA2ar%2BTS1f9s8qTotiwfJ%2F7oFuNfgw03ejTnKOhegqRHYIZYzWoTd0HuLsaYcoIRMEwnpR8xj8nsKXloiy8Pn&X-Amz-Signature=dc3d352b764bfe63fd3c0322f9788ba540fa28a74db82a858c1010b37cbdb87a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZO3ILN2I%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T232157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5cUU5RfA9Wyw%2FsoTkkF8Qx4rmePaxc%2FIVrWn8NBL%2FiAIgVsXdp1XOF9cjqDLoDPiVHxAzYYoIaDJQwyWs6OxNv6oqiAQIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMtoxWcaDOW%2B9eAl%2BircA%2F7cvp4JqnqGTEunPybwdg4n9OFj6uc2Nb2YU82c7RdKGBuVa9flSaip%2FGzSbQUZKN0T5EBQUQwn6IZsAPvoclR%2Bc5QVKo4sNeA%2FcbKqlPS1SKcyb4UwX6l%2B7Slj8pfZh8JnX0KyRePK52q922zEnNdC41Ozk0jzDssoB0F%2Fhl0%2BqaP9XL2fBEZ1FdFZCgjpjsZ6xZxTyQE6MXD1NrqrYbn%2F0levFjtjFLHCtE78BMk01MKfO1RNf833Du0h%2F41OmFLzNLTwaeY3Hd2PrNK4mNpTtZ5jZtlYI2QLJShcd35J%2FQlEGk%2B1cUN0yGly6efKbQYWdffI0i5s46fTLsR8%2BQBz9Wm9zRrhyZmnltElUHHbWJB%2FPyiUXtvADHss7MSDzmBpP8aD2Dkgdc7YtwM%2B2mZnkEqiXiTerVOGBawydBgRg4BBmy0gyXDDyzicrkKW%2Fa6DBruIgt0BPV9%2BltccCq6gZ%2BlCinT9bmpQDLJQct89FeS1H5D9XFrZCJmwCPB3fu%2Fi8ISXlBsYPrQUwUPUdUhCYs%2B5aq64VAoWPKHqTfTaG8flIQb6fo5mIGNRZaSgUCHuHejSIR9ptTyj8PPGWm44Ea6xlZh2HxA2bXKA5eDWlXmUDVGssq2y4icWMLbOkc4GOqUBIhnLjksnYyyYlD9OuKY2mJvl6ECqO2XMdkw1Uejgu61WmrZChU4DBrKAYw1gxa95MzaQBRK25G6btdR08UuzOnzk%2BcD0AoHs6xBg2LJEtJU8bbD6uELVkEiIf37ybn1ARO9lifZBBQb5A5LmwlRseSRjCDkQw4QEOGOFpxADCDcgnMUW7bgsQENfYLMFCD4JpTSKgwxu6VkJTWBK%2FWMz6bArvbk8&X-Amz-Signature=fcde66bc8cd5b1e5a043b8613f6321dc022929b5a01ac68d1b24fd77e7217238&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

