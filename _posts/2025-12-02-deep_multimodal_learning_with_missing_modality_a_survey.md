---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H2PPH2S%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T060053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCs67kxId%2BALrusKa4XHRyC2it5UN%2BonjVuZAscyFKyegIhAKyB40MGDiNW2YoT%2FAx2eBLBtOu2Ee53n6DmCrcd%2FAwAKv8DCD8QABoMNjM3NDIzMTgzODA1IgzFfX96yIB6Sdl4YC4q3AOWoBnTp1qqZB1rpztuqbzwQX163ZQuSXt6selbGbd6pz6flWy9jzJPkvLSf1XvMofW9puQQdoiR2frny3b1Dz8mJOp2ry73Xfun%2BU%2FxN32hA%2FRFgS7IzMIeMn5ejR2zimL78Lgp%2Bg0oWYhjB5ZBwXPsCrzpt782NP27dDHF4%2B%2B7xxrOfK8eB%2FKLqNoxq1xg1qegkFMTDlbCblU3R16JfcokzKjXN2sjG2TUzjHmMtiFEeuBfSRB%2FJbZIGuKrAeRv9%2Bnh0%2F2c%2BQQWdRZenlV9H3Vxi09T0iy%2BTz9J1xqBY7lKoXEarbb%2FIIWN7BzcP6ueF00gk1ah47eH9IfuE7CAubKviKBvou3%2Fr1hRFIXqLcbu4%2BSOScBxkup8x8pL2yQ5J6aZ851UcVwOacknSgDk6ZlbLrE4D9Uu93J%2B85UOrHXeNp1xtxBF%2FSgMbo5xD9ExQWGO7x6vstEEF7I83V6chssedXq4UrupnVpM2PH7TL49NnAKGrK8NvyrAOo7pUFZgJvZdB0sO4o4G4kEwdhyTPlUev1h%2FHYcAeXHoa1y7nz2s6dY7jsKeehmpTd8EyskwPvobOMX%2FZjHeiOC1rofK608tWgLV%2BLe00ftxy33AJlNLMHj49otWxdFiaBzCSucTJBjqkAYDrnYwbEh9ON1Uq%2FP3ZotjxZpMdJK25PbGmEQm18Hi6pgWsUhCyAq%2Fo3nZP8VidNjZActpgIZNuT3o2IFIS0i9FMFSDMdFaXPNTF8pOTz8MhsuwfoEGQTWuD69R4rPinGXwemrhvAdjB0NZSytPHHUS%2FW4z%2F1YuGLOwlZHaJsGOkqZiKfJP%2Bj9%2FoADUimbI8PzOeuY3wzytLAcH2LPYTMb5%2BULc&X-Amz-Signature=3776c6e1165ae5e06cd19cfa312aa4895c8fa89de0f8804fa07bf918d4c6fcc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H2PPH2S%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T060053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCs67kxId%2BALrusKa4XHRyC2it5UN%2BonjVuZAscyFKyegIhAKyB40MGDiNW2YoT%2FAx2eBLBtOu2Ee53n6DmCrcd%2FAwAKv8DCD8QABoMNjM3NDIzMTgzODA1IgzFfX96yIB6Sdl4YC4q3AOWoBnTp1qqZB1rpztuqbzwQX163ZQuSXt6selbGbd6pz6flWy9jzJPkvLSf1XvMofW9puQQdoiR2frny3b1Dz8mJOp2ry73Xfun%2BU%2FxN32hA%2FRFgS7IzMIeMn5ejR2zimL78Lgp%2Bg0oWYhjB5ZBwXPsCrzpt782NP27dDHF4%2B%2B7xxrOfK8eB%2FKLqNoxq1xg1qegkFMTDlbCblU3R16JfcokzKjXN2sjG2TUzjHmMtiFEeuBfSRB%2FJbZIGuKrAeRv9%2Bnh0%2F2c%2BQQWdRZenlV9H3Vxi09T0iy%2BTz9J1xqBY7lKoXEarbb%2FIIWN7BzcP6ueF00gk1ah47eH9IfuE7CAubKviKBvou3%2Fr1hRFIXqLcbu4%2BSOScBxkup8x8pL2yQ5J6aZ851UcVwOacknSgDk6ZlbLrE4D9Uu93J%2B85UOrHXeNp1xtxBF%2FSgMbo5xD9ExQWGO7x6vstEEF7I83V6chssedXq4UrupnVpM2PH7TL49NnAKGrK8NvyrAOo7pUFZgJvZdB0sO4o4G4kEwdhyTPlUev1h%2FHYcAeXHoa1y7nz2s6dY7jsKeehmpTd8EyskwPvobOMX%2FZjHeiOC1rofK608tWgLV%2BLe00ftxy33AJlNLMHj49otWxdFiaBzCSucTJBjqkAYDrnYwbEh9ON1Uq%2FP3ZotjxZpMdJK25PbGmEQm18Hi6pgWsUhCyAq%2Fo3nZP8VidNjZActpgIZNuT3o2IFIS0i9FMFSDMdFaXPNTF8pOTz8MhsuwfoEGQTWuD69R4rPinGXwemrhvAdjB0NZSytPHHUS%2FW4z%2F1YuGLOwlZHaJsGOkqZiKfJP%2Bj9%2FoADUimbI8PzOeuY3wzytLAcH2LPYTMb5%2BULc&X-Amz-Signature=3776c6e1165ae5e06cd19cfa312aa4895c8fa89de0f8804fa07bf918d4c6fcc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI3NTSY3%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T060054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQD%2F%2FZH3o7D0UiuYFZTxzMtXmkvScdY4we3opQBLteQCNQIgSSJbij7I%2F4jqiI7sRMm%2FNYy%2FA6vUm%2BASgfp8lmy0SVsq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDHpYL2rDSWZGZ8IP0CrcAxxXXJYYs7Wq7lBHiVpsOtYgOgjw6SklkCw7%2B45aER0TX%2Bxm%2BVUnVKUMRLXBHHWT7L6tPyy08kQ5N4gun%2FdDZP2KTQAIzTL4OKb%2FPyMlVgoyFNEHq%2FkkUqs%2FSw3uOL%2Bj3vHQO9zfPNus0fLosKmLgzeNAfRV1EFA5FHtqcBeMAG5A0P1RPqfYX7BqB%2FxmyrnpR%2BcuSRR0INdGku%2Bn1akaxlZiJ%2FE6Ps8enGh0DCebAYcq9J%2Bh%2BOnVogysfckG6ABGpLF2Pj4CrKq8aSJ4CjuFm5cjTyDFbwOWOu5eg%2BsFbavjAdyH0wiCoxQ8xcJFCLjqrf9Tjfdldj1QQ6ucZMH3jorqVdAIwZlZjI%2FZcxxw%2FG0RByhj7cz5Fn8O8s%2Fccw6elE9Kk2x16C7sOZcIDe0pTBKhKyLRrEYFYoKmZx5%2FRC0WxocOB9YuJrZmIJ3L8rpqbwoLA8gx35f1fCjLbNwP%2FN8n11xcdUObz0xZREQz7dnzV8rSe%2FcrbnTyFlQTkj9qlELmm9Kjh5EBJA7x7%2F89fkaONNtzf3YsA%2FhMbsHq%2BbpUiLJgx07yO70ZXZ%2B%2BowIGHhA5KwRBMxFfOsdLQp%2FuN7Qe7f9q5w39b%2FALpv9d18nsdpvevkEZ83xX970MI%2B5xMkGOqUBWTaVxTrkcOoRYgKBeRL128kCT80DxsFcdnnMXdYfJY5nEDslWy%2BCS%2Fv6PHZHqgMYlsZtwT%2Bu2KlZB9yCxUChPU53FLC4PpeqN%2FNPeAPONuI6HUPlSzpX1c00FNSvmnNycyjxIa4orIpftvqAwAFwRcE91fhrnR5UShd15gnB8l%2BbZj45V0kJdd%2BR%2FV5NCOFLupaSLjxVh8%2B40X4ZwHP156ZzsPV5&X-Amz-Signature=7f8f4c44a964c4d58f3f95a975391d3f1ba7882afa1c777bf076473239eb9271&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI3NTSY3%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T060054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQD%2F%2FZH3o7D0UiuYFZTxzMtXmkvScdY4we3opQBLteQCNQIgSSJbij7I%2F4jqiI7sRMm%2FNYy%2FA6vUm%2BASgfp8lmy0SVsq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDHpYL2rDSWZGZ8IP0CrcAxxXXJYYs7Wq7lBHiVpsOtYgOgjw6SklkCw7%2B45aER0TX%2Bxm%2BVUnVKUMRLXBHHWT7L6tPyy08kQ5N4gun%2FdDZP2KTQAIzTL4OKb%2FPyMlVgoyFNEHq%2FkkUqs%2FSw3uOL%2Bj3vHQO9zfPNus0fLosKmLgzeNAfRV1EFA5FHtqcBeMAG5A0P1RPqfYX7BqB%2FxmyrnpR%2BcuSRR0INdGku%2Bn1akaxlZiJ%2FE6Ps8enGh0DCebAYcq9J%2Bh%2BOnVogysfckG6ABGpLF2Pj4CrKq8aSJ4CjuFm5cjTyDFbwOWOu5eg%2BsFbavjAdyH0wiCoxQ8xcJFCLjqrf9Tjfdldj1QQ6ucZMH3jorqVdAIwZlZjI%2FZcxxw%2FG0RByhj7cz5Fn8O8s%2Fccw6elE9Kk2x16C7sOZcIDe0pTBKhKyLRrEYFYoKmZx5%2FRC0WxocOB9YuJrZmIJ3L8rpqbwoLA8gx35f1fCjLbNwP%2FN8n11xcdUObz0xZREQz7dnzV8rSe%2FcrbnTyFlQTkj9qlELmm9Kjh5EBJA7x7%2F89fkaONNtzf3YsA%2FhMbsHq%2BbpUiLJgx07yO70ZXZ%2B%2BowIGHhA5KwRBMxFfOsdLQp%2FuN7Qe7f9q5w39b%2FALpv9d18nsdpvevkEZ83xX970MI%2B5xMkGOqUBWTaVxTrkcOoRYgKBeRL128kCT80DxsFcdnnMXdYfJY5nEDslWy%2BCS%2Fv6PHZHqgMYlsZtwT%2Bu2KlZB9yCxUChPU53FLC4PpeqN%2FNPeAPONuI6HUPlSzpX1c00FNSvmnNycyjxIa4orIpftvqAwAFwRcE91fhrnR5UShd15gnB8l%2BbZj45V0kJdd%2BR%2FV5NCOFLupaSLjxVh8%2B40X4ZwHP156ZzsPV5&X-Amz-Signature=7f8f4c44a964c4d58f3f95a975391d3f1ba7882afa1c777bf076473239eb9271&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJN5S46K%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T060052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCBuJl%2FJkLxx%2B7DGgZF9T362X7%2B4GrnqmhB2TM5kBsGVwIgOtUKBGalMsAXuqUEcVzl9iUjjTvhPslkZsn9cJmVON8q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDAtFmQmk6HKNwOCeGSrcA2Z%2FU6nL9OGykETMKFGlRmxjq2ziJLkCLtqEKp3FsTmcBJMA5%2FzAEPV9%2B31rrqDy7ylLV2YV9keMJI4eXGgMBFn%2Bjo5L72M0uSDjKqqfxj%2B0NlEpbRcOV%2BEk6SnqAm%2BWNaHnP8ICMhHiAGLDPHH9RH2v%2FRJWfejZwGQV9I1Ns%2BtU719UCk8S%2BB%2FLQ%2BqeRovGdN2uZVjQpoe2i%2B7jY3LCYLyHg935sw60LNuDXVIrPgjSsHaHZTiPmADc3VnWtp6%2Fdy1yf6X3HMz0j%2FMMDwrNw73SGWvwkwfIBEgHBNuGE9hWnvVPgYN%2B2Bj8I%2B8DpMu%2FKhps5PSVoTPdcIc6vQrQLrphySpwBeKZPrYjDEG8sx3G9n1GKY0iwk1p5hP9dHb6%2FDn3nRxPrIv%2FiysmPN6hU1y8cJIsxv3MzhKKB3YXyQ%2FSMv5AKLO%2FEeCz3nX2Gu2Y6FD1ZtiRlKxm5KuUxDM7jxPtLC%2BkeNRAY7mszTv3JUJLep4g%2FGar%2B%2BQdvXESEecBBFA%2BcE6%2B7JqgYQQ6yNHdiHTqX0L0KgyYEMnDF3JHmOgmEJj245SP4qPlQdw7HxUaGptrhVrRmqsT1V%2FQEgm13f2Z9eeoIfm%2FkwjUdiL1OG3tLS3oJc1Mti20LhPTMI65xMkGOqUBcuLeLIsLJLJu%2B2UR%2B1Esqe5PEKYznGzet2eZ2yUkfuQ2dSJK5fsXc2JO3%2FG9l6BovMv2fdBfQ3TKaSu0x9voKr6ghnmB69Zr2r%2Be1p697cf9XfRK2JYTspnFD0tb8emR5VHhVV7CbAFk8XUHIWCafCwvbdGYFpRUeW6jBr796ZBk1qhW0AMFiFYAufefqxPJACKF5%2BZvACCu%2FL0KfnJpUArsImnb&X-Amz-Signature=d3f0921b46a990c9aec46e0690335cf7b64512fff6e8c3348bafcb5d16423342&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DS5J63V%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T060056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCTK28719wcUflcipN%2B1qUsoUo4qWCRlGHYUxaUkVUCyQIgN9yoIvXb6O4WKAbWS9Q2Idvs0czU1KekC1J%2F9%2FGyAPAq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDCT72QbKO7qcbRKibSrcA9J%2BTrCAWK4B7sXkgMCjhvo1R4SR7bI0cayxtmV8K992HunkQiWv92%2B6gYd%2FyT5m6Ikhkm0Y6AsZFiW6zRPGihh%2Bz2EeSPk%2BjkQsU%2FoWWl72QVCgwFtNH57TW0voS3SJcNEgnMFGvceaihPdyHWEWSPUhUaFvfwB1Q74HuKu6wUeSvu9svSzItOm1I2R92O7DKht4Ey3VLo9kFa%2F4ZVc7qUnkgPEK3ZIj6e5Z4sizcemHyad0%2BhuwFHwz6hTw5tYaFY8LvpNjTv0wtO3BZoWU7acb25jNAKc4UXTYQcwXm25s3R1EOI4MJ2aYkhU5kBfk2WF9zWKI9%2BdBB8Ahre9lSMagiRh2ZUgQZ1Xsj%2BOp4WHnCDZ9MNN3CSc86mfugTDlt1mm4YSUcw6%2BrGRorTdJATirq7muLKCRTWq49QpNZbl4nLoifJ5uvfkYF7KtApMgh%2BYQ1waNP%2F1u99yZ9HF9kHggBjdTLQ2MUL%2BsqdOlB5eth2wE9x9tVnJ3KYPNif3cMN7CDHP5gDNbZh6QfAt7rmoVfdRUZ17hyLoNsRwoECL8E25vqwvtqHID18NJMgo3E1ANLsCgJVA0wG0UgMpJbhdoozBw3Fohu2IfSA8DrPCtx6ifYYyDW%2B8Dem8ML%2B5xMkGOqUBl08Qt50vsGbmKVDyVV4rmi%2FvM6ZfUEZQ0B59cTBuqp49WlRG8fRkUHYbBS%2F1QuGb0KSNSi%2BWlOS2%2FsimqR8Up7CvuDuprdRVdHRSUU5Lxx3IXZGfX2P54j9JLiXxeAHaFRs6pakitzy2%2FfRaixXNgIIRj6asYgjcmiuzH81uXVooJP8LLsEYyoGkWZbLDtBgbs044%2BqVZWB2agJKa%2FIAlK3ngAxI&X-Amz-Signature=07d5264acef56bb75f98af47f583c94112a025a883c572523c53f6a26c4540d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DS5J63V%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T060056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCTK28719wcUflcipN%2B1qUsoUo4qWCRlGHYUxaUkVUCyQIgN9yoIvXb6O4WKAbWS9Q2Idvs0czU1KekC1J%2F9%2FGyAPAq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDCT72QbKO7qcbRKibSrcA9J%2BTrCAWK4B7sXkgMCjhvo1R4SR7bI0cayxtmV8K992HunkQiWv92%2B6gYd%2FyT5m6Ikhkm0Y6AsZFiW6zRPGihh%2Bz2EeSPk%2BjkQsU%2FoWWl72QVCgwFtNH57TW0voS3SJcNEgnMFGvceaihPdyHWEWSPUhUaFvfwB1Q74HuKu6wUeSvu9svSzItOm1I2R92O7DKht4Ey3VLo9kFa%2F4ZVc7qUnkgPEK3ZIj6e5Z4sizcemHyad0%2BhuwFHwz6hTw5tYaFY8LvpNjTv0wtO3BZoWU7acb25jNAKc4UXTYQcwXm25s3R1EOI4MJ2aYkhU5kBfk2WF9zWKI9%2BdBB8Ahre9lSMagiRh2ZUgQZ1Xsj%2BOp4WHnCDZ9MNN3CSc86mfugTDlt1mm4YSUcw6%2BrGRorTdJATirq7muLKCRTWq49QpNZbl4nLoifJ5uvfkYF7KtApMgh%2BYQ1waNP%2F1u99yZ9HF9kHggBjdTLQ2MUL%2BsqdOlB5eth2wE9x9tVnJ3KYPNif3cMN7CDHP5gDNbZh6QfAt7rmoVfdRUZ17hyLoNsRwoECL8E25vqwvtqHID18NJMgo3E1ANLsCgJVA0wG0UgMpJbhdoozBw3Fohu2IfSA8DrPCtx6ifYYyDW%2B8Dem8ML%2B5xMkGOqUBl08Qt50vsGbmKVDyVV4rmi%2FvM6ZfUEZQ0B59cTBuqp49WlRG8fRkUHYbBS%2F1QuGb0KSNSi%2BWlOS2%2FsimqR8Up7CvuDuprdRVdHRSUU5Lxx3IXZGfX2P54j9JLiXxeAHaFRs6pakitzy2%2FfRaixXNgIIRj6asYgjcmiuzH81uXVooJP8LLsEYyoGkWZbLDtBgbs044%2BqVZWB2agJKa%2FIAlK3ngAxI&X-Amz-Signature=07d5264acef56bb75f98af47f583c94112a025a883c572523c53f6a26c4540d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

