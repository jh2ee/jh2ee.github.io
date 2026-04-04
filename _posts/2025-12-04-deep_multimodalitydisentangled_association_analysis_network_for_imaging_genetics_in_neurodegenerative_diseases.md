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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667D5AC5EI%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG0NpPnnIl56jNMZm3EEBr4VCG0LUri%2FmFVs4Gvcl5cnAiBAwylm8%2BhHpUkTv%2FKiBQ09RMxsxrbxW7Um4bQ5afbKlSqIBAig%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrGSO5gDkpb8j9aTKKtwD7TCucrQIdQ63lmv4WpasM6IFGsW6Pu1hMgDB%2Bdg4VBKoW7TeoBHmjFXfEH28ekmDCYsoBbEKsLk7o%2BkNHUjqSnkzeu7Irlsasn3pvB58FVM1UKenLdt%2FEgeZNl3NT5Y4ZoGGOj6WH2%2BSmAM72CIFnrKk3d3DpH32VyrlWtx%2BIK%2BX31l%2Bh%2BZxtGnQWhGJk5UUInuLPPHwEFaThgoxfqiNbeBmj4sToQwsY0dWECWM6mATkLDkEqPx2Gka1vUiFh3v9BWxW6n5nP3%2BaWgUabXdcuX4UisofkaOvxYtdgOlVNOYzt%2BuF9BcJ46ob4PyDCGtz9cAi0FGcsenJV7MFDp8D0z%2BGRnM6IZANHTWXM8CCTMqCyvWBn5LP7%2FPxF%2BEpjwy2kt7d9VjM1003ggsP%2FMnQ6On8VT4BLIXRyXYIyBTDATKUaKUdZcS7J3HUzh%2FNL%2FDBI4DElSrMEsuiAaKPbG7MazNd7IhqPxoaHQ8HzurjejNrbeIp%2FyK%2B2Y6dEMEiyqDGN%2FjHkiTvpz9WT9SC%2FYtfa2EsNJic7CeqaCrTMdFQyob6iFUlQpU4I58C%2BRRdKsB6JphY6Q8wGBYtYmgR8XxM9ZHGy2lrFMiEyZ9fLd6kK6CwgIXkU%2F7DP02Szswi9PEzgY6pgGuvugn2H7%2B9vaCulEzl7EUXUmyAYApS4%2Buo5ppPJPV6ZDrgSmUCwkw9HVNsyFjUh8BsMPcZ3laVdppUrL34X8G19Tu8XtudrB%2FkgZq%2BTWVk1xOxo9LqeshCBcoxW%2BKEhJ%2FQg7mdDDvbRhjhrsEKFd6ByYCNmv2cXSHlePvwVSgqAQn2myQ%2BBuxDjQwhPZOUXzC0CYIu7T97SPeY5NWyC1BEXSOCiua&X-Amz-Signature=59a51e431b66728870efa96afaec23a02e65264657ebd2d19eabe618006f57b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667D5AC5EI%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG0NpPnnIl56jNMZm3EEBr4VCG0LUri%2FmFVs4Gvcl5cnAiBAwylm8%2BhHpUkTv%2FKiBQ09RMxsxrbxW7Um4bQ5afbKlSqIBAig%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrGSO5gDkpb8j9aTKKtwD7TCucrQIdQ63lmv4WpasM6IFGsW6Pu1hMgDB%2Bdg4VBKoW7TeoBHmjFXfEH28ekmDCYsoBbEKsLk7o%2BkNHUjqSnkzeu7Irlsasn3pvB58FVM1UKenLdt%2FEgeZNl3NT5Y4ZoGGOj6WH2%2BSmAM72CIFnrKk3d3DpH32VyrlWtx%2BIK%2BX31l%2Bh%2BZxtGnQWhGJk5UUInuLPPHwEFaThgoxfqiNbeBmj4sToQwsY0dWECWM6mATkLDkEqPx2Gka1vUiFh3v9BWxW6n5nP3%2BaWgUabXdcuX4UisofkaOvxYtdgOlVNOYzt%2BuF9BcJ46ob4PyDCGtz9cAi0FGcsenJV7MFDp8D0z%2BGRnM6IZANHTWXM8CCTMqCyvWBn5LP7%2FPxF%2BEpjwy2kt7d9VjM1003ggsP%2FMnQ6On8VT4BLIXRyXYIyBTDATKUaKUdZcS7J3HUzh%2FNL%2FDBI4DElSrMEsuiAaKPbG7MazNd7IhqPxoaHQ8HzurjejNrbeIp%2FyK%2B2Y6dEMEiyqDGN%2FjHkiTvpz9WT9SC%2FYtfa2EsNJic7CeqaCrTMdFQyob6iFUlQpU4I58C%2BRRdKsB6JphY6Q8wGBYtYmgR8XxM9ZHGy2lrFMiEyZ9fLd6kK6CwgIXkU%2F7DP02Szswi9PEzgY6pgGuvugn2H7%2B9vaCulEzl7EUXUmyAYApS4%2Buo5ppPJPV6ZDrgSmUCwkw9HVNsyFjUh8BsMPcZ3laVdppUrL34X8G19Tu8XtudrB%2FkgZq%2BTWVk1xOxo9LqeshCBcoxW%2BKEhJ%2FQg7mdDDvbRhjhrsEKFd6ByYCNmv2cXSHlePvwVSgqAQn2myQ%2BBuxDjQwhPZOUXzC0CYIu7T97SPeY5NWyC1BEXSOCiua&X-Amz-Signature=59a51e431b66728870efa96afaec23a02e65264657ebd2d19eabe618006f57b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F7BVH6B%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBPU4Jb5%2BE1Mf7WbnHQ6clKNtSucG49LivcsVKhE49WBAiB8hwnnwkt%2Fl2F3g9k5KTr3KHPKogbyd4rcowU7ftUQGSqIBAig%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMK2PtajCzVAlc77k8KtwDdDAkHwTx086sMTjXR3t8PqEOfuILHTYWf0CQTON2WWYPFLHM8T2ayf4dmC3H9gaEdI902w%2Fl9rqHepgoXfN5Wu4%2FxBSgAGdTFgf4GqzBXOxTGdKRSQKeRZX9IZjN%2F0WGMXPs7G5uxTPCBc8U5vxFzX1R4m9oJQRTf48xVdKtJMWt7G7uAUy4CqaQiSBvN%2FO3SU%2FugnGphUyWSwIjg7Siw%2FtsBTLvPGB9fqRCkSEfJ48ArYr%2FgmWPULY89tPo46%2Fs194XAtj7ymoqNq1OpHHfwkR0gOB8RbzKA%2BSJcTO6w9Am%2FvU5L5c%2BefQkQJh7Dz8Nh%2FIxsl0xQg7PMOlUIg9BuSj6VE7NHN5XqxfmuIblijZSqNps3s0Pt9WiTY1FiblHboPDGSqlUNOp0OsHctSW3xq2rVqSqLl%2FX%2BE4xXgVpzhdBeJLbsA6iEsx8N5fzmDQ17drPsOoxIbhW%2FirkmCnH1MJ35vJR9FjtA9Rd39XBtPw1mYIjFp6yK5lf0NzQgS4XfggSfBiEFZLM7bpRZsBIeWHb%2Fx5vNpfwgTN5FgpLw3KTcClZho0GFoq1vdzcqfbY1Ep%2FCavwzl%2FQX7U1w8cXB5VLCJs8VjRURUnuZ0I8QfLX94csFUepDtLpJQwuNXEzgY6pgEqEdhZMn4mSZyoR8mF1Dshl2CzGqgZ1pOeXExd9YeS7jI%2B1SvVhdPd4qehlMKcWa5bme8NS3IBRtlpn6kavgLsQPh6ASrNGK87vR5VJmC3NX0NJ6%2FsV%2BjZBClHZGzZwpw%2BsthS1R18K0uk7U35lsBCsBw%2FDtVVAZ3vqJdZzWXh%2BhjSU2pPzfZ%2BxMeqE%2F617XR607ob0dU0Ai14nL%2BwfNJ1Ec9%2BqswR&X-Amz-Signature=adc76740781f1d6d3d265c7588fdadeb725b7fa0c2986650a15a4c0c63bce938&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P6IQ3NQ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICm7VmO%2FI9%2FAHS3sM%2BHPThgDXHG1gwFqHPmToacXuNCzAiBcAfNkY%2BzHz4pFTWL57a18%2F51HORwuAeij9mP8s7x7ZSqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQwhm%2B3gPmWieJkcSKtwDYKpVC%2Boni%2Fsk4f907Zii6ISp5pgdqLDr2jPzrd%2FANfaCAsPvb1SqG6Zol17ZXZpjnowI%2FWh07SozGV8dvU%2FF7KxbaWT49WTLfgJI3eXHAU9hdtAWJIRevQglRnLlUQAoGoNp6%2BVBrxwf6rFQIFJlR%2BIoo5Wp7o7z%2BNH3VyXmnud0dOldVdHqeO%2FQTVLQGeZsrPKEZ%2FCvToibbUmnhiylRYercykZlx72JtCnffEagRsyfnfGa%2BynAD9UsCGW%2FFyrA90G0UdppebIBbyYf652X0u4sTA4lozFYGjZv1cGb6hbtF5p2ybaVSGKMNAdhM4UGVzKZF1NYhAnmj1zmiVPYHNqBBMuUUsvaC0tg6zTFO66pyiRwbRffy8nATkbwghMvY3QM%2BFFbO5Fzfef0zjMyEIJDUhwfCb9FBJDyYYGoLgAWwBA9hmxd7PNaZEubh3aKhcanhP4XLKOEN3OafUFsXdJz9xb%2BStdM%2F2OhqZE3jc3GShIYWWAOYwDJtRtg6AcfGnyRsHrCySvPBYQ7Mrab98TsmfIX7cq6vLx9JVF66eQjpHmlwbBlMJaUTt4FmpaOac23DkMoqO%2Fxard1bPqYwjWvkSszJJoA%2BLcCFRlAHnYXYGZq4yNGRu4MrEw54zFzgY6pgHAEOJWCqQRcZEmUvsOtAGXwv3s37zCYTe%2BDylfkiR0jVcdGeqNbvgy9%2FJESICdcsUbVWkTMsQjw29yvPa3hQ%2BZoLj8dxelqqY%2FXCBseY5lUae2Ii9S%2BObt2dSCX0XYLXqL8Lwx88IXnFC3O4GMRy%2BF9rsqy9ef%2FD%2FlpC2s4ws4mMDPRgtUR1ZjVxEjT1OHIVpWL%2FEwS%2B3IjMJs%2BmgmiF6%2BcxHdpysf&X-Amz-Signature=3db0ce5f422e961992937c2ee18dddf149dde2b2cd63bdeb70b9ebb72f2f897d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P6IQ3NQ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICm7VmO%2FI9%2FAHS3sM%2BHPThgDXHG1gwFqHPmToacXuNCzAiBcAfNkY%2BzHz4pFTWL57a18%2F51HORwuAeij9mP8s7x7ZSqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQwhm%2B3gPmWieJkcSKtwDYKpVC%2Boni%2Fsk4f907Zii6ISp5pgdqLDr2jPzrd%2FANfaCAsPvb1SqG6Zol17ZXZpjnowI%2FWh07SozGV8dvU%2FF7KxbaWT49WTLfgJI3eXHAU9hdtAWJIRevQglRnLlUQAoGoNp6%2BVBrxwf6rFQIFJlR%2BIoo5Wp7o7z%2BNH3VyXmnud0dOldVdHqeO%2FQTVLQGeZsrPKEZ%2FCvToibbUmnhiylRYercykZlx72JtCnffEagRsyfnfGa%2BynAD9UsCGW%2FFyrA90G0UdppebIBbyYf652X0u4sTA4lozFYGjZv1cGb6hbtF5p2ybaVSGKMNAdhM4UGVzKZF1NYhAnmj1zmiVPYHNqBBMuUUsvaC0tg6zTFO66pyiRwbRffy8nATkbwghMvY3QM%2BFFbO5Fzfef0zjMyEIJDUhwfCb9FBJDyYYGoLgAWwBA9hmxd7PNaZEubh3aKhcanhP4XLKOEN3OafUFsXdJz9xb%2BStdM%2F2OhqZE3jc3GShIYWWAOYwDJtRtg6AcfGnyRsHrCySvPBYQ7Mrab98TsmfIX7cq6vLx9JVF66eQjpHmlwbBlMJaUTt4FmpaOac23DkMoqO%2Fxard1bPqYwjWvkSszJJoA%2BLcCFRlAHnYXYGZq4yNGRu4MrEw54zFzgY6pgHAEOJWCqQRcZEmUvsOtAGXwv3s37zCYTe%2BDylfkiR0jVcdGeqNbvgy9%2FJESICdcsUbVWkTMsQjw29yvPa3hQ%2BZoLj8dxelqqY%2FXCBseY5lUae2Ii9S%2BObt2dSCX0XYLXqL8Lwx88IXnFC3O4GMRy%2BF9rsqy9ef%2FD%2FlpC2s4ws4mMDPRgtUR1ZjVxEjT1OHIVpWL%2FEwS%2B3IjMJs%2BmgmiF6%2BcxHdpysf&X-Amz-Signature=d5c43530c60c4b70448f8cd541b2c269640c44a3258ce30885aba65b84695ef5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLUWGSYC%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCi8wf1S4Dd%2Bv96tvqbemZwsgjBsDNB%2BnFOXkdojYlFzgIgHHee8aHnZzXeoCrwLWKepZb3PNF%2BGIcdUGGqL5jrDLAqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM8vWC3GURvLBwUAWCrcA3uuzRDUsXl7qYI1BjzlZf64KbjdXfE0Xom8PtAjsp%2FA%2FYmDahpm%2BmAYxRiyKDH0a9TH889O0qXI8AZEjH07GxpZtOmm2AqecMoV1%2FT1KVsyah3TJ9l4vM60aOkvdSIhggoUasdTXMDZ%2F6y7mVzIeDqojD5X1zh2%2BUfKh96A7AU0tXDX7ll2lNd7dZbYn%2BMMKyYU11QmWDwKnQrVrHASOjTJVGJ2Y6aUQ%2Fu4OixcDy081Bg16Suen%2Fe8fDieOFWL7TkvAqi%2FV%2BYX%2BAlGJM8Ct0hFo%2FlniEOJkFRtWOLlLbseXjVgo7YOqeaBLvZMLE2Y9QnB%2BIJpdwjznVOGo4jmAkrjRUqAdIY9EWZQqc8K5Y5JTJWzEWSGAVijSL6p15vSOs2YvOZWEpfiPbah9PTklC9qDeKF5SxBWHSFGrEaC7mYOYFwRbUbgeE4GR5Q9J%2F%2Bc7AjGYsZIqHn0Ev7PnWo5Zyw6fRQvf14Vum67QmBfM7rgqJx7ARdECU7fgO6reURQ4y2mIlwauiuIJw5x2wsQSvN51bNu%2BTbIeIDrl3BErCm6TQH7yJEpiA25w%2BQkEwAd%2F5TE%2B7qxP1GEMDNhjGnVkKfLJGDRwZNIWimVk2OTsLuqZLcIYhSdQN4RISlMM7TxM4GOqUBIEdy%2FOX%2F7E%2Fc8kr%2Bxg74vrWgsYbEr7XAcK%2FZSBg%2B0peeClr%2FCKIDhN0GV45M4lBIFPyY0D64d0HsN1%2FtDX5O5I%2BF6c69Wppvj8eSOxqcdEkhRz%2FjSF%2F723uh1YI5d5h6i7NnGtAILe658P7CreqqW%2FmupgkOtoq7ZUEbR5Zs7q8tC%2BLPyIWWYKSyDgW1hd5fkkd6x8nSyBF3yWgY026Iyzs3yRn2&X-Amz-Signature=434ab8ac8906631d84a22fc1544b8666eb794a29785887b55aa385cae6b6f7de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CKW4QXU%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD2O3AJ5%2FfqWyGGjmAb2C2NTnigAvvntRgl%2F5Oad5ltvAIgDfA3fVGkT3%2B3niroXKSS4vFNVumsa%2B5qdGgqomeSSSwqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHYE6y0XXqpw3OJ0fyrcAyE%2BCM%2F%2F5VDO9JKWoHodSi6htlx0CqkKbwPQojh8Gj7YHYS%2Fcq97nAwJ1DQ4RVAUi5Mo1HPM6bmPd%2B4z0e%2BJVdKBxldXovCqsvbvTYS4vZuqj1WzqmLFqjBKZ5hm7llyU3%2BSuCrZK5lmImM3RekRkiqQjFFAhdAudUco8X9%2BcskBXyZHdVHKdjuRTQBD0RiQN0LCv1cspI4TVUuPibsaZO77%2B7y%2Byf4CY%2Bb5Uu4qGiT%2BSly91IyWmpCtRvZU5xvPLx3cS8vhGgQk9CGxXJ2pdBhqf43PhZTI5gTW0x1T236uMxubW%2FBDh2f9XW7%2BZ7U5da14Sths%2BMsf4GwXLkrB3gSVEvyNuIfoB09G%2BARxgEFz4CxCb7kb4xyP7VzP32EUjZOeiJCDIRQ3xVyWVlc%2BKTi%2BuvRz2bYy8scjYpxLTgblo%2B2Yqng6wJ9%2B2UvoiEODQfLBgDqDaZGu3TrHyQFzXCYNT5oQ2HqXYXj0AFg3NeFlHfi9dG2hjdbPndT%2FIJaaTEpPrPMnQ4YIR6bnEv1jlvnEqgVN%2FjsU1etgJ%2FDleYymnEgTOenEzH0NwqOiDbmYUnK3jbkBG6XUg6Rndr34uT%2B%2FCExgtsw%2FufY8Ub5%2B5oJ%2FjS5EdXmOO1AT7D3UMMmMxc4GOqUBHGHO7pwnqsirvy3tcRKuKL9ppeSG7B6r4WNUhCeyOnPmbntjgc%2F1sXfBtwHAR%2FKSOkzhIRErrcS%2F3m7w5pxcltgi0GzNGPFmwrMjKwgPN%2BLm8F8DXNo8OO4p3WunZMvFwL%2BNQq8008%2FHJbsuRCv72mV6733QNvvCkDOwc4AMqPriCf53MEQ3ZLrWORRVyPSbD00%2BilhYiVhD7nsVU3UWlC0GfZPS&X-Amz-Signature=d4cf42e4a47c4a13741820fb8c38959e13a4f62f610c2402dfa08e710161f2af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTKQ464F%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDq8wpTbt2XutiCUs44D9NfToPdgUxhWLwlU7sLYvnLZAiEA5SJsUSFCUZuyBDJK4lYKedZl6RtgBVFT7jYRlIq%2BeQUqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCWKoR%2B3orOct8P6dSrcA8q2lEtcnPf%2BbHu1bFuqycVX3jPRMtKDk22OCVDgu5YKCWoLpehuAfuDjWiWJ8cuU3Tln%2FJwsjzDw56X0JePo2BQQba3Af5tyvM%2BizRjSuRH5y5kX9JU3qJMaijYZTyvkgBBJUYmEq%2F1jcni98l1S%2FxiCnvcostkTYMQKSGmb5BKDUXHlVbFWzhOpQPbLBOSqyVHfM6o98C1A%2FSwca7NLj%2FAScDHiIdNoanZtUhkwq1leiTDa2vYCLbWZyjtXiFpCoOFXee55r045f29FjSud9bHrOBkzfAJy5ub%2F3TCNFpZYeSazKAXC6rONZVorfTdcUzWU20u0jwlJheSvzksgXmmiylg7QJO55halP3FGge0PVJjysJdvmFJv0rxJCropde953jUeKZCxU%2BtvICbFL3bdhmCZMuR3ZXzCmCTP2IRnVw48BKVGsLblCIkHhsJdtU8bYhU73UrcdcJsQwxJbNP8WT%2B%2FsG31ENNySGwGcHGrn995%2B1Os0%2BJnMUc7wNMSKuQMahZMsdY1eNFrykaNCVENjWwyULBpd9L2TPAKgnXZuJfEBl01PnVHQNZfITIJrdCnBS5sVN1rETMbLPUFOraALQF6GdumudeVO18fS6GzLskd4nVC8nfmfp2MNOOxc4GOqUBjoW6O3AJP6wv%2BojsYO8nvVxWFm3ILcQJk5FjV3kEBc2Tk57aK1xQb81wNywYn24sqnD%2BNcBelH1W9TwKW9D%2FImM1n03q52F9AGj0Q7wR%2BSgF%2FkRO1sRxlO7C%2FzCQ%2B1JD0QtCIVBr%2B3rNhDaoDl35ur8vJwi2aqDoydyymBLZAe9LYGFQMzra95f6YOWHamc8IqaI6H5IJ3EsiD8jC11XdPq4Y4ay&X-Amz-Signature=e05b0708f37b42da3452880e719cd6afc32d61bd9cb2b38f4a38ed7a19b96154&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US5A5X7Y%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCPYsknXwy4kOg%2FHrB5ToZucDdyJvE0ly165kQKH0yGPgIhAJpQBv5oXZ01KdXweG4%2FCcW%2FiZb%2FEQx4Tqi6ouG0fiiRKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxDBgsH44Zx008bvSEq3ANg81n4sPXCZ1NVOmaOnP%2FnXILQWPTlO8XsvbJDUDSox4sYa4DFXway90o5pN80%2FOyrY1c9%2Bh98fI5iCcJpyC6YXbNOypy6HUPKnjp1KV33RzipZ%2Buv6y8KtMrXyuIVT56qEfFlXnRMfsameoI7fDX8HbED661RoQn%2F27sVEyJd63gO%2FBdc9KKQiGwhH%2Fq5%2FLBEp0Cu3NpRDF6ns4BGyShW%2B9h9DUjcuVYlXl8fSvfRde5An3rsQqXDeEszKFLMKmGjehVz013iHVZo2nuNQIX0FuMVHm5vt6zFVTKIdUFrIEc%2BuetOjtA5z%2FE9C3WDbadtCGIqd34ePorG5gUz7LS%2FrQxAmanhcNW0fP6LgYVk0czU5nfPg9U%2FrW%2BcfMGWRr2LgGvRIVnCBOmAqQ7yL8uBgEm2M%2Fw%2FEnaSOHqGLuMDxnGgBjMbKK%2FtXEJnOneUGSRnOjZihIIlii0%2FM5wWoxXSx5CF20MwX8KQb5nl83j9xf76mgYKMT%2F2raCVvIJzVnzn9L2fMKIybf9lm%2BVYVssqXFFyLJx2W0XjY3g8yOLHm%2BILWZo1uRRd9DaKzp9uvUVju%2ByPayNjLCoa2O%2BuKTTHKNqYtd18ku%2BRpLfrdFw6syw37Pg%2Ba9ox51%2BHcjC%2BjMXOBjqkAV5qIahuT%2Bosvk33tsNGGjIbQIDyjKX6KWrnUjeAEdGYuCN1xuV%2F3ZVGUclO204wi0weB5dw%2F6FbDbWv6LARYaZ%2FZvIj%2Byakecd2BMMIuQy2bbgd89tRcOl40hmQeM4pntFpDkyo0FfdewXLVUdiSBOf1FNGKqoiX6dVEr9zW7x1cavaRtHyb%2BIYb0164yX81PFsp%2FMOC%2B5hetDInfTku6OvAqJw&X-Amz-Signature=1eec78c67671d996df48eca434ed952ca09e207c47b1cb686f1e88897b71b9e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466US5A5X7Y%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCPYsknXwy4kOg%2FHrB5ToZucDdyJvE0ly165kQKH0yGPgIhAJpQBv5oXZ01KdXweG4%2FCcW%2FiZb%2FEQx4Tqi6ouG0fiiRKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxDBgsH44Zx008bvSEq3ANg81n4sPXCZ1NVOmaOnP%2FnXILQWPTlO8XsvbJDUDSox4sYa4DFXway90o5pN80%2FOyrY1c9%2Bh98fI5iCcJpyC6YXbNOypy6HUPKnjp1KV33RzipZ%2Buv6y8KtMrXyuIVT56qEfFlXnRMfsameoI7fDX8HbED661RoQn%2F27sVEyJd63gO%2FBdc9KKQiGwhH%2Fq5%2FLBEp0Cu3NpRDF6ns4BGyShW%2B9h9DUjcuVYlXl8fSvfRde5An3rsQqXDeEszKFLMKmGjehVz013iHVZo2nuNQIX0FuMVHm5vt6zFVTKIdUFrIEc%2BuetOjtA5z%2FE9C3WDbadtCGIqd34ePorG5gUz7LS%2FrQxAmanhcNW0fP6LgYVk0czU5nfPg9U%2FrW%2BcfMGWRr2LgGvRIVnCBOmAqQ7yL8uBgEm2M%2Fw%2FEnaSOHqGLuMDxnGgBjMbKK%2FtXEJnOneUGSRnOjZihIIlii0%2FM5wWoxXSx5CF20MwX8KQb5nl83j9xf76mgYKMT%2F2raCVvIJzVnzn9L2fMKIybf9lm%2BVYVssqXFFyLJx2W0XjY3g8yOLHm%2BILWZo1uRRd9DaKzp9uvUVju%2ByPayNjLCoa2O%2BuKTTHKNqYtd18ku%2BRpLfrdFw6syw37Pg%2Ba9ox51%2BHcjC%2BjMXOBjqkAV5qIahuT%2Bosvk33tsNGGjIbQIDyjKX6KWrnUjeAEdGYuCN1xuV%2F3ZVGUclO204wi0weB5dw%2F6FbDbWv6LARYaZ%2FZvIj%2Byakecd2BMMIuQy2bbgd89tRcOl40hmQeM4pntFpDkyo0FfdewXLVUdiSBOf1FNGKqoiX6dVEr9zW7x1cavaRtHyb%2BIYb0164yX81PFsp%2FMOC%2B5hetDInfTku6OvAqJw&X-Amz-Signature=5e041661e19f710b1baa04b68d2276ce75929dcb9b0218fc199e7c475bbe1b3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLA6EO2C%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA%2FCb22x2Rc0aaLwWEbC1MMIiowA%2FRg1R5x3y043k3Z1AiEA9IUusMWN52UV%2BL%2F2Vo2ENkQtXsrYNzMAQ3zEjnRiyhgqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIzfPwhE4%2FvYGyLmTSrcAyO63HJFYXYmuCCCuXP%2BPA%2BhA0DCzsyfcvfVXF01RWRYDzF8DIsl%2B4bWwtLCSZBL6qpUwu9ZI5hzIBiyTypSsg8aSihhKPg4Lf6AzHyDz3sL43OXBGC6SrT0bug6RBWy60zRtu4UcUDVNF8lZWcO95p5Wcq%2Fk%2FMucgZHjLEhQ8V7e5pso59b1oSRdX7fgkvrWaOdgMdSo2yn4jZL%2FC4GWbEoeyCAMiULcvum4RuDxErxGLuLHwItvDgx%2BCI3hZYM8uRqkycDlit4UxxiFbh0pTor6AQDBQMgoDP2b8qQaGcYlkELmhFcjxCFML4zdtUiQQfgarrOCtuRiAMCC4uIAUCv7Mwc%2Fo46Vb%2Fh1hxFLwMpp39h02WoZLeroHlql3td7rgRWvsOaS3ucOYa7DS9Vh%2FFA9TQ14ExFrKjqPkfPD5TZ%2BT9HvCtTQtGlH6S7d7z4IqN5YsELOnuypto1zbr7YVXYi2XyMwhDgjqBLHGI0aY%2Fo69fcxHd5LE5tp4cBbGz%2Bg7OdlbcpUpezLafFRkrw5yKaFGtglNFxr5ewWaG5gEeMjOsR6BZ9WfqHU6xiTLX%2BZcOBX9NyL6LA3gT3IZIqir8oz9m6QZwzmmzOFIc2LEBdOukmRnTI05745WMOSMxc4GOqUBT8nlPYZFEaYA%2BSgrTmWQHkrlse%2FTJa%2BNy6%2FQoembEmF64zNDV9wo77KhC3zl9OoelbTN2T4H3oLVYeZ%2FyR%2BeTA7Z8XNv89CMH0KNmsmEvlNkIRTkH815mfMtk7fEc4egg5rbvxfqElUKezmuj9AgijkNhZ%2BNvTOhTVlb6oW1Fhj2xOmPnIMuudUaJSkyA%2BZYrmKwvKgP5lu4XUmHUSPj31Jal%2BrP&X-Amz-Signature=e739083632f6167beb8911f10ee688fff862345bfd0ae9ecc46529db733fe5ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNGA73LG%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCau7AMjshM5VnlFnd3dg5Ept%2B2IIPGOKnJpUO5xzMApAIhAJt86bylbOob%2FJuARv9%2BafMdq5c2Jhody0gWMpnLEr1QKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyY35U%2BokELISu4bC4q3AOSIu9I%2B0HEq4ps9%2ByiNiAJ3d5jgD2flZi5U38KSdiKJOTfl7Il8oNoBF2eKBk8XZdx28fG4G63JCYlveTuvBWmYdqkHgqLEy9NQWVHDO7g%2BnnYf0ypIlrhGSQzQWxapKYnehcfJG8D6yx%2FpNzzH77xU9vstlGZy0rm7%2FCrSoK69C92t6JXnFlZp2ZB8FEInjgy3gAaYELXtJcqYxdPsrHPoUYJkUrngR8Ks03lETrlp%2FCqvzUT6jeMC0L5XyZxVHHuZN7sVeKFhwq9uH%2BAfXbCb2i0kLuCDaO9xxu6KqwXPVgEaeLDsRncR6eswNPxTf7p7W08dW2pXxY1qRbY%2FOHZlW1xFJpSOtT8g6YDrb5WVFYr8is6BUxs6V2ILd%2BBEZj%2BE2gIqBfldTqAND4EZhZyrV7ntk0a6WYEtUYWu6LxBua2ZM4DFm5FJOejAgplyFWzCf8GkLEIFNh7t9U1TTtR%2FP81w%2BZBKms%2F3ZEewHYsncvdCHkG9EcZi1OFPWO%2F41h%2F0eO1I0LaX1F%2FXibZPUPs0UG3SBjnWmZmkqK8Not3Qd9aWiEIb%2F7q1uEX6UTpFVDSJE6OYCbB5pHV38vmYGjC4M%2FL2KLJDlcpjOfntq8woxq%2FO1Ja1vXX6TaRrDC6jsXOBjqkAZ3i8pOU9cTBkXy0AmK8Jp2js%2FgckcqZXE5E2wza%2FbFOnRnSSN6ZbYKaYQ88cxVgoQIfSf7tlxLuuDm3Y8ioe54rWD9CRujpsQSxR2DaUfoFC%2FutayaZgXRf3BEC52uklvx%2BtxCbqpy8TQFTr8xfT2dp70w60UOjCJwdk0vrViavdSoWcXctquTIlf0%2BtkIeeHYbzil1olWS96Gcap7E3feXyJBm&X-Amz-Signature=24faba0f1aa4a291b57228dcdb424e522d426d97d51839c7d498a5f53800e26e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNGA73LG%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCau7AMjshM5VnlFnd3dg5Ept%2B2IIPGOKnJpUO5xzMApAIhAJt86bylbOob%2FJuARv9%2BafMdq5c2Jhody0gWMpnLEr1QKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyY35U%2BokELISu4bC4q3AOSIu9I%2B0HEq4ps9%2ByiNiAJ3d5jgD2flZi5U38KSdiKJOTfl7Il8oNoBF2eKBk8XZdx28fG4G63JCYlveTuvBWmYdqkHgqLEy9NQWVHDO7g%2BnnYf0ypIlrhGSQzQWxapKYnehcfJG8D6yx%2FpNzzH77xU9vstlGZy0rm7%2FCrSoK69C92t6JXnFlZp2ZB8FEInjgy3gAaYELXtJcqYxdPsrHPoUYJkUrngR8Ks03lETrlp%2FCqvzUT6jeMC0L5XyZxVHHuZN7sVeKFhwq9uH%2BAfXbCb2i0kLuCDaO9xxu6KqwXPVgEaeLDsRncR6eswNPxTf7p7W08dW2pXxY1qRbY%2FOHZlW1xFJpSOtT8g6YDrb5WVFYr8is6BUxs6V2ILd%2BBEZj%2BE2gIqBfldTqAND4EZhZyrV7ntk0a6WYEtUYWu6LxBua2ZM4DFm5FJOejAgplyFWzCf8GkLEIFNh7t9U1TTtR%2FP81w%2BZBKms%2F3ZEewHYsncvdCHkG9EcZi1OFPWO%2F41h%2F0eO1I0LaX1F%2FXibZPUPs0UG3SBjnWmZmkqK8Not3Qd9aWiEIb%2F7q1uEX6UTpFVDSJE6OYCbB5pHV38vmYGjC4M%2FL2KLJDlcpjOfntq8woxq%2FO1Ja1vXX6TaRrDC6jsXOBjqkAZ3i8pOU9cTBkXy0AmK8Jp2js%2FgckcqZXE5E2wza%2FbFOnRnSSN6ZbYKaYQ88cxVgoQIfSf7tlxLuuDm3Y8ioe54rWD9CRujpsQSxR2DaUfoFC%2FutayaZgXRf3BEC52uklvx%2BtxCbqpy8TQFTr8xfT2dp70w60UOjCJwdk0vrViavdSoWcXctquTIlf0%2BtkIeeHYbzil1olWS96Gcap7E3feXyJBm&X-Amz-Signature=24faba0f1aa4a291b57228dcdb424e522d426d97d51839c7d498a5f53800e26e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CQPSSOE%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T171916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCElPLUewaxQkktpMkjOdSi4kc2Z8%2FHQg7nwYcAsDcuegIhAJOQGnWure%2BWBE16u8fsSWB2L59ToHkKwMSwwKiNF0RSKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzeqXSC8kvmru6Hs1sq3APQn007ngOSlMgACw0wBjN9lJQ2B77FPeBQJZlmlMO8pm8yQ7cCBoskPzEHA8NMO99gtkQ13IcW8rTjOD7VHjBVaRlGDXMTmm2PUwwbg9d1vS2RI4C2%2FJDWYB2uVXYmDtydb1ggf7T%2FvthcYBCXpjMehLy1%2B8O6ICuhe%2B%2FrtnaFItCmky3aGrdwGQIUECXCMWvc0CqoD2ek6Csz6TXrk5tnHt%2BjTqMj%2Btsu65rZVODC5%2BwVeljzeuRqtIGZLu0xJ%2Fm3YRkxGfVnrDtqvUMtxV9fymp%2FtFRK6KCeDobOjW0ZSHune9cNHPK9I87fhTRuIAb7WDSjLc9rMVqxth8oq33iXJnrFnDBpKdQa15x5RgrAOtnruFkySG8u0idfuDOm5HQw7x3nG4g8DLhuPEx%2B3g63KYVvbVVFQ%2Bt%2BP1o%2BeJ%2BAsSkVSifRS8RyRcRXI8chr4QD1agZ55R40PPLCp0qalzMmJriwGceYFHhbWwgs092STfEVelQbRTY3Y1tR0a8yN9sI%2F8VP2%2BcT5ZhK6bzqjs9Ahmx627Xp6QJnTV3td1ZPM%2B27b9zUbSXRsFzutiG3o8ehLckFidFQS7W8TVVt3ukoPh9F4%2BQQeWb3OIiRwKY5QRskVsD2n%2Fe6TzoDCcjMXOBjqkAR04mMaGG0Bw0011a0Offq5UmnmI3rJWMBYwyzG4nJYHfroOcaTOvaMU4VwCpokY4WkV%2B2plXWRaaRnuCgI6VHzaIjClSZDN0av34jqRF2zDoy6pFY%2FJtYrmHhikgMmgmuEbA4bO%2BfcoPT6WaBH1rgTTj28qJ4FXcG048RyTJqdPsCpUOySWM1V5ec6DhqconlzyCkYSzwCGtIbgqWRlwH7%2BkuTB&X-Amz-Signature=9aabcc07bc212ff895e07bf776870452d6b4d660ccb20c82d55d3ab42d751509&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

